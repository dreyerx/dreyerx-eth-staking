'use client'
import { Button } from '@chakra-ui/react'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import React from 'react'

interface IStakeButtonProps {
    depositFunction: () => void
}

export default function StakeButtonWrapper(props: IStakeButtonProps) {
    const { isConnected } = useWeb3ModalAccount()

    return (
        <Button w={"full"} bgColor={"primary"} onClick={() => props.depositFunction()} _hover={{
            bgColor: "hover.primary"
        }}>
            Deposit
        </Button>
    )
}
