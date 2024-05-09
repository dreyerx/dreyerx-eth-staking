'use client';

import {
	Box,
	ChakraProvider,
	StyleFunctionProps,
	extendTheme
} from '@chakra-ui/react';
import React, { Suspense } from 'react';
import Loading from './Loading';

interface ITheme {
	children: React.ReactNode;
}

const theme = extendTheme({
	colors: {
		bg: '#07010c',
		card: '#120b17',
		text: '#d6d6d8',
		primary: '#7a22c9',
		error: '#ff5252',
		success: '#80ff52',

		hover: {
			primary: '#5f199e'
		}
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				bg: 'bg',
				color: 'text',
				fontWeight: 500
			}
		})
	}
});

export default function Theme(props: ITheme) {
	return <ChakraProvider theme={theme}>
		<Box
			position={'absolute'}
			bgColor={'red'}
			w={200}
			filter={'blur(20px)'}
			zIndex={-99999}
		/>
		<Box w={'100%'} h={'100vh'} mt={3}>
			<Suspense fallback={<Loading />}>
				{ props.children }
			</Suspense>
		</Box>	
	</ChakraProvider>;
}
