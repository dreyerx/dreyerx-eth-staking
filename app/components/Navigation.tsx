'use client';
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { faBoltLightning, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navigation() {
	const pathname = usePathname();

	return (
		<Flex
			mt={10}
			justify={'center'}
			align={'center'}
			flexDirection={'row'}
			gap={[2, 2, 3]}
		>
			<Link
				href={'/'}
				opacity={0.8}
				_hover={{
					opacity: 1
				}}
			>
				<Box p={2} borderRadius={10}>
					<HStack gap={3}>
						<FontAwesomeIcon
							icon={faBoltLightning}
							color={pathname == '/' ? '#aa55f7' : ''}
						/>
						<Text fontWeight={900} fontSize={['14px', '14px']} color={pathname == '/' ? 'primary' : ''}>
							DEPOSIT
						</Text>
					</HStack>
				</Box>
			</Link>
			<Link
				href={'/withdraw'}
				opacity={0.8}
				_hover={{
					opacity: 1
				}}
			>
				<Box p={2} borderRadius={10}>
					<HStack gap={3}>
						<FontAwesomeIcon
							icon={faBoxes}
							color={pathname == '/withdraw' ? '#aa55f7' : ''}
						/>
						<Text
							fontWeight={900}
							fontSize={['14px', '14px']}
							color={pathname == '/withdraw' ? 'primary' : ''}
						>
							WITHDRAW
						</Text>
					</HStack>
				</Box>
			</Link>

			<w3m-button />
		</Flex>
	);
}
