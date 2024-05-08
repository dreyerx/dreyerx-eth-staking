'use client';
import { Input } from '@chakra-ui/react';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import React from 'react';

interface IStakeInputProps {
	value: string;
	setValue: (amount: string) => void;
}

export default function StakeInputWrapper(props: IStakeInputProps) {
	return (
		<Input
			placeholder="Stake Amount"
			size={'lg'}
			value={props.value}
			onChange={(e) => props.setValue(e.target.value)}
			_focusVisible={{
				borderColor: 'primary'
			}}
		/>
	);
}
