'use client';
import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import StakeForm from './components/StakeForm';
import StakeInfo from './components/StakeInfo';

export default function Home() {
	return (
		<>
			<Flex
				justify={'center'}
				align={'center'}
				gap={5}
				flexDirection={'column'}
				mt={-30}
			>
				<Navigation />
				<Flex mt={10} justifyContent={'center'} flexDirection={'column'}>
					<Heading textAlign={'center'}>Stake DreyerX</Heading>
					<Text opacity={0.7}>
						Stake DreyerX and receive DreyerX while staking.
					</Text>
				</Flex>

				<StakeForm />
				<StakeInfo />

				<Box w={500}>
					<HStack justify={'space-between'}>
						<Text opacity={0.4}>Copyright &copy; 2024 DreyerX</Text>
						<Text opacity={0.5} color={'primary'}>
							Version: 1.3
						</Text>
					</HStack>
				</Box>
			</Flex>
		</>
	);
}
