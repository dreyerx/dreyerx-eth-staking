import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Theme from './theme';
import { Web3Modal } from './components/Web3Modal';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	preload: false
});

export const metadata: Metadata = {
	title: 'DreyerX Staking',
	description: 'DreyerX Staking'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<Theme>
					<Web3Modal>{children}</Web3Modal>
				</Theme>
			</body>
		</html>
	);
}
