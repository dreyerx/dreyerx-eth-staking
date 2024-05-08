import { BigNumber, BigNumberish, ethers } from 'ethers';
import { address, abi } from '../../artifacts/staking.json';
import {
	address as TokenAddress,
	abi as TokenAbi
} from '../../artifacts/token.json';

const Deposit = async (amount: BigNumber) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	console.log(signer);

	const contract = new ethers.Contract(address, abi, signer);
	const tokenContract = new ethers.Contract(TokenAddress, TokenAbi, signer);
	const allowance = await tokenContract.allowance(
		await signer.getAddress(),
		address
	);

	if (allowance < amount) {
		const approve = await tokenContract.approve(address, amount);
		console.log(approve);
	}
	const deposit = await contract.deposit(amount, { gasLimit: 200000 });
	await deposit.wait();
	return deposit;
};

export default Deposit;
