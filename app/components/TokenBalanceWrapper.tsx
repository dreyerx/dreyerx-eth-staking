import { Flex, Text } from '@chakra-ui/react';
import { TokenContractAbi, TokenContractAddress } from '@/artifacts/token';
import { StakingContractAddress } from '@/artifacts/staking';
import { ethers } from 'ethers';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider
} from '@web3modal/ethers5/react';
import React, { useEffect, useState } from 'react';

interface ITokenBalanceProps {
	setAllowance: (allowance: string) => void;
}

export default function TokenBalanceWrapper(props: ITokenBalanceProps) {
	const [balance, setBalance] = useState(0);
	const [allowance, setAllowance] = useState('0');

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
				TokenContractAddress,
				TokenContractAbi,
				signer
			);
			const tokenBalance = await contract.balanceOf(await signer.getAddress());
			const tokenAllowance = await contract.allowance(
				await signer.getAddress(),
				StakingContractAddress
			);

			setBalance(tokenBalance);
			setAllowance(ethers.utils.formatUnits(tokenAllowance, 'ether'));

			props.setAllowance(tokenAllowance);
		})();
	}, [isConnected, props, walletProvider]);

	return (
		<Flex justify={'space-between'}>
			<Text opacity={0.5} fontSize={12} fontWeight={400}>
				Balance: {ethers.utils.formatUnits(balance, 'ether')} DRX
			</Text>
			{allowance.length > 10 ? (
				<Text opacity={0.5} fontSize={12} fontWeight={400}>
					Allowance: {allowance.substring(0, 5)}...
					{allowance.substring(allowance.length - 5, allowance.length)}
				</Text>
			) : (
				<Text opacity={0.5} fontSize={12} fontWeight={400}>
					Allowance: {allowance}
				</Text>
			)}
		</Flex>
	);
}
