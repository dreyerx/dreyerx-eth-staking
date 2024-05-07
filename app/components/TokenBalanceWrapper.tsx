import { Flex, Text } from '@chakra-ui/react'
import { abi as TokenAbi, address as TokenContractAddress } from "../../artifacts/token.json"
import { address as StakingContractAddress } from "../../artifacts/staking.json"
import { BigNumberish, ethers, Contract } from 'ethers'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import React, { Component, useEffect, useState } from 'react'

interface ITokenBalanceProps {
    setAllowance: (allowance: string) => void
}

export default function TokenBalanceWrapper(props: ITokenBalanceProps) {
    const [balance, setBalance] = useState(0)
    const [allowance, setAllowance] = useState("0")

    const { address } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    useEffect(() => {
        (async () => {
            const etherProvider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = etherProvider.getSigner()

            const contract = new ethers.Contract(TokenContractAddress, TokenAbi, signer)
            const tokenBalance = await contract.balanceOf(address)
            const tokenAllowance = await contract.allowance(address, StakingContractAddress)

            setBalance(tokenBalance)
            setAllowance(ethers.utils.formatUnits(tokenAllowance, "ether"))

            props.setAllowance(tokenAllowance)
        })()
    }, [])

    return (
        <Flex justify={"space-between"}>
            <Text opacity={.5} fontSize={12} fontWeight={400}>
                Balance: {ethers.utils.formatUnits(balance, "ether")} DRX
            </Text>
            {
                allowance.length > 10 ? (
                    <Text opacity={.5} fontSize={12} fontWeight={400}>
                        Allowance: {allowance.substring(0, 5)}...{allowance.substring(allowance.length - 5, allowance.length)}
                    </Text>
                ) : (
                    <Text opacity={.5} fontSize={12} fontWeight={400}>
                        Allowance: {allowance}
                    </Text>
                )
            }
        </Flex>
    )
}
