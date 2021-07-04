import { useCallback, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

// Enter a valid infura key here to avoid being rate limited. You can get a key for free at https://infura.io/register
const INFURA_ID = 'INVALID_INFURA_KEY';
const NETWORK_NAME = 'mainnet';

interface useWeb3ModalProps {
    autoLoad?: boolean;
    infuraId?: string;
    NETWORK?: string;
}

interface web3ModalResult {
    provider: Web3Provider;
    loadWeb3Modal: () => Promise<void>;
    logoutOfWeb3Modal: () => Promise<void>;
}

function useWeb3Modal(props: useWeb3ModalProps = {}): web3ModalResult {
    const [provider, setProvider] = useState(undefined as unknown as Web3Provider);
    const [autoLoaded, setAutoLoaded] = useState(false);
    const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = props;

    // Web3Modal also supports many other wallets. You can see other options at https://github.com/Web3Modal/web3modal
    const web3Modal = new Web3Modal({
        network: NETWORK,
        cacheProvider: true,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId,
                },
            },
        },
    });

    // Open wallet selection modal.
    const loadWeb3Modal = useCallback(async () => {
        const newProvider = await web3Modal.connect();
        setProvider(new Web3Provider(newProvider));
    }, [web3Modal]);

    const logoutOfWeb3Modal = useCallback(
        async function () {
            await web3Modal.clearCachedProvider();
            window.location.reload();
        },
        [web3Modal],
    );

    // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
    useEffect(() => {
        if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
            loadWeb3Modal();
            setAutoLoaded(true);
        }
    }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

    return { provider, loadWeb3Modal, logoutOfWeb3Modal };
}

export { useWeb3Modal };
