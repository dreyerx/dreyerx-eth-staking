import { ethers } from 'ethers';
import { address, abi } from '../../artifacts/staking.json';

const Harvest = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(address, abi, signer);
	const deposit = await contract.deposit('0', { gasLimit: 200000 });
	await deposit.wait();
	console.log(deposit);
	return deposit;
};

export default Harvest;
