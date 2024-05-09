import { ethers } from 'ethers';
import {
	StakingContractAbi,
	StakingContractAddress
} from '@/artifacts/staking';

const Withdraw = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as any);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(
		StakingContractAddress,
		StakingContractAbi,
		signer
	);
	const withdraw = await contract.withdraw({ gasLimit: 200000 });
	await withdraw.wait();
	return withdraw;
};

export default Withdraw;
