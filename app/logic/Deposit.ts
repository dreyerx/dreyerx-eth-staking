import { BigNumber, BigNumberish, ethers } from "ethers"
import { address, abi } from "../../artifacts/staking.json"

const Deposit = async (amount: BigNumber) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log(signer)

    const contract = new ethers.Contract(
        address,
        abi,
        signer
    )
    const deposit = await contract.deposit(amount, { gasLimit: 200000 })
    console.log(deposit)
    await deposit.wait()
    return deposit
}

export default Deposit