'use client';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { ReactNode } from 'react';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'f26e3552aad7cf14a9529818133c81cd';

// 2. Set chains
// const mainnet = {
// 	chainId: 1,
// 	name: 'Ethereum',
// 	currency: 'ETH',
// 	explorerUrl: 'https://etherscan.io',
// 	rpcUrl: 'https://cloudflare-eth.com'
// };

const devnet = {
	chainId: 31337,
	name: 'Anvil',
	currency: 'ETH',
	rpcUrl: 'http://localhost:8545',
	explorerUrl: 'https://localhost:8000'
};
// 3. Create a metadata object
const metadata = {
	name: 'DreyerX Staking',
	description: 'Earn rewards',
	url: 'http://localhost:3000', // origin must match your domain & subdomain
	icons: ['https://avatars.mywebsite.com/']
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
	/* Required*/
	metadata,

	/* Optional*/
	enableEIP6963: true, // true by default
	enableInjected: true, // true by default
	enableCoinbase: true, // true by default
	rpcUrl: '...', // used for the Coinbase SDK
	defaultChainId: 1 // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
	ethersConfig,
	chains: [devnet],
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false as default,
	themeMode: 'dark',
	themeVariables: {
		'--w3m-accent': '#7a22c9'
	}
});

interface IWeb3Modal {
	children: ReactNode;
}

export function Web3Modal(props: IWeb3Modal) {
	return props.children;
}
