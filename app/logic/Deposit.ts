import { BigNumber, ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';
import { TokenContractAbi, TokenContractAddress } from '@/artifacts/token';

const Deposit = async (amount: BigNumber) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as any);
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
		const approve = await tokenContract.approve(StakingContractAddress, amount);
		await approve.wait();
	}
	const deposit = await contract.deposit(amount, { gasLimit: 200000 });
	await deposit.wait();
	return deposit;
};

export default Deposit;
