'use client';
import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers5/react';
import { BigNumber, ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';
import moment from 'moment';

interface IWithdrawInfo {
	setHolderUnlockTime: (holderUnlockTime: BigNumber) => void;
}

export default function WithdrawInfo(props: IWithdrawInfo) {
	const [loading, setLoading] = useState(true);
	const [totalStaked, setTotalStaked] = useState(0);
	const [totalStakers, setTotalStakers] = useState('0');
	const [holderUnlockTime, setHolderUnlockTime] = useState(0);
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
			const stakingHolderUnlockTime = await contract.holderUnlockTime(
				await signer.getAddress()
			);
			const stakingTotalStaked = await contract.totalStaked();
			const stakingTotalStakers = await contract.totalStakers();

			setTotalStaked(stakingTotalStaked);
			setTotalStakers(stakingTotalStakers);
			setHolderUnlockTime(stakingHolderUnlockTime);
			props.setHolderUnlockTime(stakingHolderUnlockTime);

			setLoading(false);
		})();
	}, [isConnected, props, walletProvider]);

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
