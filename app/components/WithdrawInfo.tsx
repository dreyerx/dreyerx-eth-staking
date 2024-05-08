'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import {
	address as StakingContractAddress,
	abi as StakingAbi
} from '../../artifacts/staking.json';
import moment from 'moment';

export default function WithdrawInfo() {
	const [loading, setLoading] = useState(true);
	const [totalStaked, setTotalStaked] = useState(0);
	const [totalStakers, setTotalStakers] = useState('0');
	const [holderUnlockTime, setHolderUnlockTime] = useState(0);
	// const { address } = useWeb3ModalAccount()
	const { walletProvider } = useWeb3ModalProvider();

	useEffect(() => {
		(async () => {
			const etherProvider = new ethers.providers.Web3Provider(walletProvider);
			const signer = etherProvider.getSigner();

			const contract = new ethers.Contract(
				StakingContractAddress,
				StakingAbi,
				signer
			);
			const stakingHolderUnlockTime = await contract.holderUnlockTime(
				await signer.getAddress()
			);
			const stakingTotalStaked = await contract.totalStaked();
			const stakingTotalStakers = await contract.totalStakers();

			setTotalStaked(stakingTotalStaked);
			setTotalStakers(stakingTotalStakers);
			setHolderUnlockTime(stakingHolderUnlockTime);
			setLoading(false);
		})();
	}, []);

	return (
		<Box bg={'card'} w={500} borderRadius={5} p={5}>
			<Flex gap={3} flexDirection={'column'}>
				<HStack justify={'space-between'}>
					<Text>Unlock Time</Text>
					<Text>
						{loading == true
							? '-'
							: moment(new Date(holderUnlockTime * 1000)).format('LL')}
					</Text>
				</HStack>
				<HStack justify={'space-between'}>
					<Text>Total Staked</Text>
					<Text>
						{loading
							? '-'
							: ethers.utils.formatUnits(totalStaked, 'ether') + 'DRX'}
					</Text>
				</HStack>
				<HStack justify={'space-between'}>
					<Text>Total Stakers</Text>
					<Text>{loading ? '-' : parseInt(totalStakers) + ' Stakers'}</Text>
				</HStack>
			</Flex>
		</Box>
	);
}
