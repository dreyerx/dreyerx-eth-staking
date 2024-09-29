'use client';
import { Input } from '@chakra-ui/react';
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
			borderWidth={1}
			color={'rgba(255, 255, 255, .6)'}
			borderColor={'rgba(255, 255, 255, .1)'}
			onChange={(e) => props.setValue(e.target.value)}
			_hover={{
				borderColor: 'rgba(255, 255, 255, .2)'
			}}
			_focusVisible={{
				borderColor: 'rgba(255, 255, 255, .3)'
			}}
		/>
	);
}
