'use client';
import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	VStack,
	keyframes
} from '@chakra-ui/react';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './components/Navigation';
import StakeForm from './components/StakeForm';
import StakeInfo from './components/StakeInfo';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Loading from './Loading';

export default function Home() {
	const { isConnected } = useWeb3ModalAccount();
	// const isConnected = false

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
				<Box mt={10}>
					<Heading textAlign={'center'}>Stake DreyerX</Heading>
					<Text opacity={0.7}>
						Stake DreyerX and receive DreyerX while staking.
					</Text>
				</Box>

				<StakeForm />
				<StakeInfo />

				<Box w={500}>
					<HStack justify={'space-between'}>
						<Text opacity={0.4}>Copyright &copy; 2024 DreyerX</Text>
						<Text opacity={0.5} color={'primary'}>
							Version: 1.0
						</Text>
					</HStack>
				</Box>
			</Flex>
		</>
	);
}
