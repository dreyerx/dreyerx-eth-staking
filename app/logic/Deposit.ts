import { BigNumber, ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';
import { TokenContractAbi, TokenContractAddress } from '@/artifacts/token';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';

const Deposit = async (amount: BigNumber) => {
	const { walletProvider } = useWeb3ModalProvider();

	const provider = new ethers.providers.Web3Provider(walletProvider as any);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(
		StakingContractAddress,
		StakingContractAbi,
		signer
	);
	const tokenContract = new ethers.Contract(
		TokenContractAddress,
		TokenContractAbi,
		signer
	);
	const allowance = await tokenContract.allowance(
		await signer.getAddress(),
		StakingContractAddress
	);

	if (allowance < amount) {
		const approve = await tokenContract.approve(
			await signer.getAddress(),
			amount
		);
		console.log(approve);
	}
	const deposit = await contract.deposit(amount, { gasLimit: 200000 });
	await deposit.wait();
	return deposit;
};

export default Deposit;
