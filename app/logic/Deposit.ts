import { BigNumber, ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';

const Deposit = async (amount: BigNumber) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as any);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(
		StakingContractAddress,
		StakingContractAbi,
		signer
	);
	const deposit = await contract.deposit(amount, { gasLimit: 200000 });
	await deposit.wait();
	return deposit;
};

export default Deposit;
