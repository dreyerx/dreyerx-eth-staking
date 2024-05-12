import { StakingContractAddress } from '@/artifacts/staking';
import { TokenContractAbi, TokenContractAddress } from '@/artifacts/token';
import { BigNumber, ethers } from 'ethers';

const Approve = async (amount: BigNumber) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as any);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(
		TokenContractAddress,
		TokenContractAbi,
		signer
	);

	const approve = await contract.approve(StakingContractAddress, amount);
	approve.wait();
	return approve;
};

export default Approve;
