'use client';
import { Box, Text, VStack } from '@chakra-ui/react';
import React, { Component } from 'react';
import StakeInputWrapper from './StakeInputWrapper';
import StakeButtonWrapper from './StakeButtonWrapper';
import TokenBalanceWrapper from './TokenBalanceWrapper';
import { BigNumberish, ContractTransaction, ethers } from 'ethers';
import Deposit from '../logic/Deposit';
import Approve from '../logic/Approve';

interface IStakeFormState {
	loading: boolean;
	stakeAmount: string;
	tokenAllowance: BigNumberish;
	message: {
		type: string;
		text: string;
	};
}

export default class StakeForm extends Component<{}, IStakeFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			loading: false,
			stakeAmount: '',
			tokenAllowance: 0,
			message: {
				type: '',
				text: ''
			}
		};

		this.deposit = this.deposit.bind(this);
	}

	deposit() {
		(async () => {
			const stakeAmountEther = ethers.utils.parseEther(this.state.stakeAmount);
			try {
				if (this.state.tokenAllowance < stakeAmountEther) {
					await Approve(stakeAmountEther);
					this.setState({
						message: {
							type: 'success',
							text: 'Approved'
						}
					});
				}
				const depositOutput: ContractTransaction =
					await Deposit(stakeAmountEther);
				console.log(depositOutput);
				this.setState({
					message: {
						type: 'success',
						text: 'Staking successfully'
					}
				});
			} catch (error: any) {
				if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
					this.setState({
						message: {
							text: error.reason,
							type: 'error'
						}
					});
				}
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
	render() {
		return (
			<Box
				bg={'card'}
				w={['full', 'full', 500]}
				borderRadius={5}
				p={5}
				mx={3}
				px={['20px', '20px', 5]}
			>
				<VStack gap={3} justify={'normal'}>
					{this.renderAlert()}
					<Box w={'full'}>
						<TokenBalanceWrapper
							setAllowance={(allowance) =>
								this.setState({ tokenAllowance: allowance })
							}
						/>
						<StakeInputWrapper
							setValue={(amount: string) =>
								this.setState({ stakeAmount: amount })
							}
							value={this.state.stakeAmount}
						/>
					</Box>
					<StakeButtonWrapper depositFunction={this.deposit} />
				</VStack>
			</Box>
		);
	}
}
