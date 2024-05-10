'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';

export default function StakeInfo() {
	const [loading, setLoading] = useState(true);
	const [apy, setApy] = useState('0');
	const [totalStaked, setTotalStaked] = useState(0);
	const [totalStakers, setTotalStakers] = useState('0');
	const [exitPenaltyFee, setExitPenaltyFee] = useState('0');
	const [lockDuration, setLockDuration] = useState('0');
	const { isConnected } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	useEffect(() => {
		(async () => {
			if (!isConnected) return false;
			const etherProvider = new ethers.providers.Web3Provider(
				walletProvider as any
			);
			const signer = etherProvider.getSigner();

			const contract = new ethers.Contract(
				StakingContractAddress,
				StakingContractAbi,
				signer
			);
			const stakingApy = await contract.apy();
			const stakingTotalStaked = await contract.totalStaked();
			const stakingTotalStakers = await contract.totalStakers();
			const stakingPenaltyFee = await contract.exitPenaltyPerc();
			const stakingLockDuration = await contract.lockDuration();

			setApy(stakingApy);
			setTotalStaked(stakingTotalStaked);
			setTotalStakers(stakingTotalStakers);
			setExitPenaltyFee(stakingPenaltyFee);
			setLockDuration(stakingLockDuration);
			setLoading(false);
		})();
	}, [isConnected, walletProvider]);

	const renderLockDuration = () => {
		const d = Math.floor(parseInt(lockDuration) / (3600 * 24));
		const h = Math.floor((parseInt(lockDuration) % (3600 * 24)) / 3600);
		const m = Math.floor((parseInt(lockDuration) % 3600) / 60);
		const s = Math.floor(parseInt(lockDuration) % 60);

		if (d == 0) {
			if (h == 0) {
				if (m == 0) {
					return `${s} seconds`;
				} else {
					return `${m} minutes`;
				}
			} else {
				return `${h} hours`;
			}
		} else {
			return `${d} days`;
		}
	};

	return (
		<Box bg={'card'} w={500} borderRadius={5} p={5}>
			<Flex gap={3} flexDirection={'column'}>
				<HStack justify={'space-between'}>
					<Text>Annual Percentage Rate</Text>
					<Text>{loading ? '-' : parseInt(apy) + '%'}</Text>
				</HStack>
				<HStack justify={'space-between'}>
					<Text>Total Staked</Text>
					<Text>
						{loading
							? '-'
							: ethers.utils.formatUnits(totalStaked, 'ether') + ' DRX'}
					</Text>
				</HStack>
				<HStack justify={'space-between'}>
					<Text>Total Stakers</Text>
					<Text>{loading ? '-' : parseInt(totalStakers) + ' Stakers'}</Text>
				</HStack>
				<HStack justify={'space-between'}>
					<Text>Lock Duration</Text>
					<Text>{loading ? '-' : renderLockDuration() + ''}</Text>
				</HStack>
				<HStack justify={'space-between'}>
					<Text>Penalty Fee</Text>
					<Text>{loading ? '-' : parseInt(exitPenaltyFee) + '%'}</Text>
				</HStack>
			</Flex>
		</Box>
	);
}
