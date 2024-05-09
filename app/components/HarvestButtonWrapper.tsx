'use client';

import { Button } from '@chakra-ui/react';
import React from 'react';

interface IHarvestButtonWrapper {
	harvestFunction: () => void;
	loading: boolean;
}

export default function HarvestButtonWrapper(props: IHarvestButtonWrapper) {
	return (
		<Button
			w={'full'}
			bgColor={'primary'}
			onClick={() => props.harvestFunction()}
			_hover={{
				bgColor: 'hover.primary'
			}}
		>
			Harvest Rewards
		</Button>
	);
}
