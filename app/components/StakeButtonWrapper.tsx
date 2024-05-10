'use client';
import { Button } from '@chakra-ui/react';
import React from 'react';

interface IStakeButtonProps {
	depositFunction: () => void;
}

export default function StakeButtonWrapper(props: IStakeButtonProps) {
	return (
		<Button
			w={'full'}
			bgColor={'primary'}
			color={'white'}
			onClick={() => props.depositFunction()}
			_hover={{
				bgColor: 'hover.primary'
			}}
		>
			Deposit
		</Button>
	);
}
