import React from 'react';
import { Contract } from '@ethersproject/contracts';
import { getDefaultProvider, Web3Provider } from '@ethersproject/providers';
import { useQuery } from '@apollo/react-hooks';

import { Body, Button, Header, Image, Link } from './components';
import logo from './ethereumLogo.png';
import { useWeb3Modal } from './hooks/useWeb3Modal';
import GET_MONEY_MARKETS from './graphql/subgraph';

async function readOnChainData() {
    // // Should replace with the end-user wallet, e.g. Metamask
    // const defaultProvider = getDefaultProvider();
    // // Create an instance of an ethers.js Contract
    // // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
    // const cDAIContract = new Contract(addresses[MAINNET_ID].tokens.cDAI, abis.tokens.cDAI, defaultProvider);
    // // A pre-defined address that owns some cDAI tokens
    // const cDAIBalance = await cDAIContract.balanceOf('0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C');
    // console.log({ cDAIBalance: cDAIBalance.toString() });
}

function WalletButton({
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
}: {
    provider: Web3Provider;
    loadWeb3Modal: () => Promise<void>;
    logoutOfWeb3Modal: () => Promise<void>;
}) {
    return (
        <Button
            onClick={() => {
                if (!provider) {
                    loadWeb3Modal();
                } else {
                    logoutOfWeb3Modal();
                }
            }}
        >
            {!provider ? 'Connect Wallet' : 'Disconnect Wallet'}
        </Button>
    );
}

function App() {
    const { loading, error, data } = useQuery(GET_MONEY_MARKETS);
    const { provider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();

    React.useEffect(() => {
        if (!loading && !error && data && data.markets) {
            console.log({ markets: data.markets });
        }
    }, [loading, error, data]);

    return (
        <div>
            <Header>
                <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
            </Header>
            <Body>
                <Image src={logo} alt="react-logo" />
                <p>
                    Edit <code>packages/react-app/src/App.js</code> and save to reload.
                </p>
                <Button onClick={() => readOnChainData()}>Read On-Chain Balance</Button>
            </Body>
        </div>
    );
}

export default App;
