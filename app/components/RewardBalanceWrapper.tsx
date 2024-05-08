import { Flex, Text } from '@chakra-ui/react';
import {
	address as StakingContractAddress,
	abi
} from '../../artifacts/staking.json';
import { BigNumberish, ethers, Contract } from 'ethers';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers5/react';
import React, { Component, useEffect, useState } from 'react';

interface IRewardBalanceWrapper {
	setPendingReward: (pendingReward: string) => void;
}

export default function RewardBalanceWrapper(props: IRewardBalanceWrapper) {
	const [pendingReward, setPendingReward] = useState('0');

	const { walletProvider } = useWeb3ModalProvider();

	useEffect(() => {
		(async () => {
			const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = etherProvider.getSigner();

			const contract = new ethers.Contract(StakingContractAddress, abi, signer);
			const pendingReward = await contract.pendingReward(
				await signer.getAddress()
			);

			setPendingReward(ethers.utils.formatUnits(pendingReward, 'ether'));
			props.setPendingReward(pendingReward);
		})();
	}, []);

	return (
		<Flex justify={'space-between'}>
			<Text opacity={0.5} fontSize={12} fontWeight={400}>
				Pending Rewards: {pendingReward} DRX
			</Text>
			{/* {
                allowance.length > 10 ? (
                    <Text opacity={.5} fontSize={12} fontWeight={400}>
                        Allowance: {allowance.substring(0, 5)}...{allowance.substring(allowance.length - 5, allowance.length)}
                    </Text>
                ) : (
                    <Text opacity={.5} fontSize={12} fontWeight={400}>
                        Allowance: {allowance}
                    </Text>
                )
            } */}
		</Flex>
	);
}
