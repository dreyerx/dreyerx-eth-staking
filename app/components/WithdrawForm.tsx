'use client';
import { Box, Button, Input, Link, Text, VStack } from '@chakra-ui/react';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import React, { Component, useState } from 'react';
import TokenBalanceWrapper from './TokenBalanceWrapper';
import { BigNumberish, ContractTransaction, ethers } from 'ethers';
import { Transaction } from 'ethers';
import Deposit from '../logic/Deposit';
import WithdrawButtonWrapper from './WithdrawButtonWrapper';
import RewardBalanceWrapper from './RewardBalanceWrapper';

interface IWithdrawForm {
	loading: boolean;
	stakeAmount: string;
	pendingReward: BigNumberish;
	errorMessage: string;
	tx: string;
}

export default class WithdrawForm extends Component<{}, IWithdrawForm> {
	constructor(props: any) {
		super(props);

		this.state = {
			loading: false,
			stakeAmount: '',
			pendingReward: 0,
			errorMessage: '',
			tx: ''
		};

		this.withdraw = this.withdraw.bind(this);
	}

	withdraw() {
		(async () => {
			const stakeAmountEther = ethers.utils.parseEther(this.state.stakeAmount);
			try {
				const depositOutput: ContractTransaction =
					await Deposit(stakeAmountEther);
				this.setState({
					tx: depositOutput.hash
				});
			} catch (error: any) {
				if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
					console.log(error);
					this.setState({ errorMessage: error.reason });
				}
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
						Deposit successfully:{' '}
						<Link href={'https://etherscan.io/tx/' + this.state.tx}>
							tx hash
						</Link>
					</Text>
				</Box>
			);
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
					<WithdrawButtonWrapper withdrawFunction={this.withdraw} />
				</VStack>
			</Box>
		);
	}
}
