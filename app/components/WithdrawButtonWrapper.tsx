'use client';

import { Button } from '@chakra-ui/react';
import React from 'react';

interface IWithdrawButtonProps {
	withdrawFunction: () => void;
}

export default function WithdrawButtonWrapper(props: IWithdrawButtonProps) {
	return (
		<Button
			w={'full'}
			bgColor={'primary'}
			color={'white'}
			onClick={() => props.withdrawFunction()}
			_hover={{
				bgColor: 'hover.primary'
			}}
		>
			Withdraw
		</Button>
	);
}
