import { ethers } from "ethers"
import { address, abi } from "../../artifacts/staking.json"

const Withdraw = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(address, abi, signer)
    const withdraw = await contract.withdraw({ gasLimit: 200000 });
    await withdraw.wait()
    return withdraw
}

export default Withdraw