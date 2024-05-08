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
import Navigation from '../components/Navigation';
import WithdrawForm from '../components/WithdrawForm';
import WithdrawInfo from '../components/WithdrawInfo';

export default function Page() {
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
						<Heading textAlign={'center'}>Withdraw DreyerX</Heading>
						<Text opacity={0.7} textAlign={'center'}>
							Withdraw staking rewards.
						</Text>
					</Box>

					<WithdrawForm />
					<WithdrawInfo />

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
