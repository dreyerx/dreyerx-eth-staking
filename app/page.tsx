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
	VStack
} from '@chakra-ui/react';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './components/Navigation';
import StakeForm from './components/StakeForm';
import StakeInfo from './components/StakeInfo';

export default function Home() {
	return (
		<>
			<Box
				position={'absolute'}
				bgColor={'red'}
				w={200}
				filter={'blur(20px)'}
				zIndex={-99999}
			/>

			<Box w={'100%'} h={'100vh'} mt={3}>
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
			</Box>
		</>
	);
}
