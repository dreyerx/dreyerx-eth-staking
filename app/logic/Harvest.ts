import { ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';

const Harvest = async () => {
	const { walletProvider } = useWeb3ModalProvider();

	const provider = new ethers.providers.Web3Provider(walletProvider as any);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(
		StakingContractAddress,
		StakingContractAbi,
		signer
	);
	const deposit = await contract.deposit('0', { gasLimit: 200000 });
	await deposit.wait();
	console.log(deposit);
	return deposit;
};

export default Harvest;
