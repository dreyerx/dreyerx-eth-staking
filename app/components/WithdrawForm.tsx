'use client';
import { Box, Button, Input, Link, Text, VStack } from '@chakra-ui/react';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import React, { Component, useState } from 'react';
import TokenBalanceWrapper from './TokenBalanceWrapper';
import { BigNumber, BigNumberish, ContractTransaction, ethers } from 'ethers';
import { Transaction } from 'ethers';
import Deposit from '../logic/Deposit';
import WithdrawButtonWrapper from './WithdrawButtonWrapper';
import RewardBalanceWrapper from './RewardBalanceWrapper';
import HarvestButtonWrapper from './HarvestButtonWrapper';
import Harvest from '../logic/Harvest';
import EmergencyWithdrawWrapper from './EmergencyWithdrawWrapper';
import Withdraw from '../logic/Withdraw';

interface IWithdrawForm {
	loading: boolean;
	stakeAmount: string;
	pendingReward: BigNumberish;
	errorMessage: string;
	tx: string;
	txHarvest: string;
	withdrawLoading: boolean;
	harvestLoading: boolean;
}

interface IWithdrawProps {
	holderUnlockTime: BigNumber;
}

export default class WithdrawForm extends Component<
	IWithdrawProps,
	IWithdrawForm
> {
	constructor(props: any) {
		super(props);

		this.state = {
			loading: false,
			stakeAmount: '',
			pendingReward: 0,
			errorMessage: '',
			tx: '',
			txHarvest: '',
			withdrawLoading: false,
			harvestLoading: false
		};

		this.withdraw = this.withdraw.bind(this);
		this.harvest = this.harvest.bind(this);
	}

	withdraw() {
		(async () => {
			try {
				const withdrawOutput: ContractTransaction = await Withdraw();
				console.log(withdrawOutput);
				this.setState({
					tx: withdrawOutput.hash
				});
			} catch (error: any) {
				if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
					console.log(error);
					this.setState({ errorMessage: error.message });
				}
			}
		})();
	}

	harvest() {
		(async () => {
			try {
				const harvestOutput: ContractTransaction = await Harvest();
				this.setState({
					txHarvest: harvestOutput.hash
				});
			} catch (error: any) {
				this.setState({ errorMessage: error.message });
			}
		})();
	}

	renderAlert() {
		if (this.state.errorMessage != '') {
			return (
				<Box
					borderWidth={1}
					borderColor={'error'}
					p={2}
					w={'full'}
					px={4}
					borderRadius={5}
				>
					<Text color={'error'} opacity={0.7}>
						{this.state.errorMessage}
					</Text>
				</Box>
			);
		} else if (this.state.txHarvest != '') {
			return (
				<Box
					borderWidth={1}
					borderColor={'success'}
					p={2}
					w={'full'}
					px={4}
					borderRadius={5}
				>
					<Text color={'success'} opacity={0.7}>
						Harvesting successfully:{' '}
						<Link href={'https://etherscan.io/tx/' + this.state.txHarvest}>
							tx hash
						</Link>
					</Text>
				</Box>
			);
		} else if (this.state.tx != '') {
			return (
				<Box
					borderWidth={1}
					borderColor={'success'}
					p={2}
					w={'full'}
					px={4}
					borderRadius={5}
				>
					<Text color={'success'} opacity={0.7}>
						Withdraw successfully:{' '}
						<Link href={'https://etherscan.io/tx/' + this.state.tx}>
							tx hash
						</Link>
					</Text>
				</Box>
			);
		}
	}

	renderButton() {
		if (
			Date.parse(
				new Date(
					parseInt(this.props.holderUnlockTime.toString()) * 1000
				).toString()
			) > Date.parse(new Date().toString())
		) {
			return <WithdrawButtonWrapper withdrawFunction={this.withdraw} />;
		} else {
			return <EmergencyWithdrawWrapper withdrawFunction={this.withdraw} />;
		}
	}

	render() {
		return (
			<Box bg={'card'} w={500} borderRadius={5} p={5}>
				<VStack gap={3} justify={'normal'}>
					{this.renderAlert()}
					<Box w={'full'}>
						<RewardBalanceWrapper
							setPendingReward={(pendingReward) =>
								this.setState({ pendingReward: pendingReward })
							}
						/>
					</Box>

					<HarvestButtonWrapper
						harvestFunction={this.harvest}
						loading={this.state.harvestLoading}
					/>
					{this.renderButton()}
				</VStack>
			</Box>
		);
	}
}
