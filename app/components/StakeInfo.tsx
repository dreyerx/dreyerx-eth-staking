'use client'
import React, { useEffect, useState } from 'react'
import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
import { address as StakingContractAddress, abi as StakingAbi } from "../../artifacts/staking.json"

export default function StakeInfo() {
    const [ apy, setApy ] = useState("0")
    const [ totalStaked, setTotalStaked ] = useState(0)
    const [ totalStakers, setTotalStakers ] = useState("0")
    const [ exitPenaltyFee, setExitPenaltyFee ] = useState("0")
    // const { address } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    useEffect(() => {
        (async() => {
            const etherProvider = new ethers.providers.Web3Provider(walletProvider)
            const signer = etherProvider.getSigner()

            const contract = new ethers.Contract(StakingContractAddress, StakingAbi, signer)
            const stakingApy = await contract.apy()
            const stakingTotalStaked = await contract.totalStaked()
            const stakingTotalStakers = await contract.totalStakers()
            const stakingPenaltyFee = await contract.exitPenaltyPerc()

            setApy(stakingApy)
            setTotalStaked(stakingTotalStaked)
            setTotalStakers(stakingTotalStakers)
            setExitPenaltyFee(stakingPenaltyFee)
        })()
    }, [])

    return (
        <Box bg={"card"} w={500} borderRadius={5} p={5}>
            <Flex gap={3} flexDirection={"column"}>
                <HStack justify={"space-between"}>
                    <Text>Annual Percentage Rate</Text>
                    <Text>{ parseInt(apy) }%</Text>
                </HStack>
                <HStack justify={"space-between"}>
                    <Text>Total Staked</Text>
                    <Text>{ ethers.utils.formatUnits(totalStaked, "ether") } DRX</Text>
                </HStack>
                <HStack justify={"space-between"}>
                    <Text>Total Stakers</Text>
                    <Text>{ parseInt(totalStakers) } DRX</Text>
                </HStack>
                <HStack justify={"space-between"}>
                    <Text>Penalty Fee</Text>
                    <Text>{ parseInt(exitPenaltyFee) }%</Text>
                </HStack>
            </Flex>
        </Box>
    )
}
