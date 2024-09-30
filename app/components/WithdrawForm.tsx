'use client';
import { Box, Text, VStack } from '@chakra-ui/react';
import React, { Component } from 'react';
import { BigNumberish, ethers } from 'ethers';
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
	withdrawLoading: boolean;
	harvestLoading: boolean;
	message: {
		type: string;
		text: string;
	};
}

interface IWithdrawProps {
	holderUnlockTime: BigNumberish;
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
			withdrawLoading: false,
			harvestLoading: false,
			message: {
				type: '',
				text: ''
			}
		};

		this.withdraw = this.withdraw.bind(this);
		this.harvest = this.harvest.bind(this);
	}

	withdraw() {
		(async () => {
			try {
				await Withdraw();
				this.setState({
					message: {
						type: 'success',
						text: 'Withdraw successfully'
					}
				});
			} catch (error: any) {
				if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
					this.setState({
						message: {
							type: 'error',
							text: error.reason
						}
					});
				}
			}
		})();
	}

	harvest() {
		(async () => {
			try {
				await Harvest();
				this.setState({
					message: {
						type: 'success',
						text: 'Harvesting Successfully'
					}
				});
			} catch (error: any) {
				this.setState({
					message: {
						type: 'error',
						text: error.reason
					}
				});
			}
		})();
	}

	renderAlert() {
		if (this.state.message.type == 'error') {
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
						{this.state.message.text}
					</Text>
				</Box>
			);
		} else if (this.state.message.type == 'success') {
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
						{this.state.message.text}
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
			<Box bg={'card'} w={['full', 'full', 500]} borderRadius={5} p={5}>
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
