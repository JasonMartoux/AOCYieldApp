import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ZyfaiSDK } from '@zyfai/sdk';
import { useAccount } from '@getpara/react-sdk';
import { useWalletClient } from 'wagmi';
import type { SupportedChainId } from '../types/zyfai';
import { createEIP1193Provider } from '../utils/viemToEip1193';

interface ZyfaiContextType {
  sdk: ZyfaiSDK | null;
  isConnected: boolean;
  smartWalletAddress: string | null;
  isDeployed: boolean;
  connectedAddress: string | null;
  currentChainId: SupportedChainId | null;
  hasSessionKey: boolean;
  error: string | null;
  connectZyfai: () => Promise<void>;
  connectZyfaiManually: () => Promise<void>;
  disconnectZyfai: () => void;
  clearError: () => void;
  refreshWalletInfo: () => Promise<void>;
}

const ZyfaiContext = createContext<ZyfaiContextType | undefined>(undefined);

export function ZyfaiProvider({ children }: { children: ReactNode }) {
  const [sdk, setSdk] = useState<ZyfaiSDK | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(null);
  const [isDeployed, setIsDeployed] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [currentChainId, setCurrentChainId] = useState<SupportedChainId | null>(null);
  const [hasSessionKey, setHasSessionKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const account = useAccount();
  const { data: walletClient } = useWalletClient();

  // Initialize SDK
  useEffect(() => {
    const apiKey = import.meta.env.VITE_ZYFAI_API_KEY;
    const environment = import.meta.env.VITE_ZYFAI_ENVIRONMENT || 'production';

    if (!apiKey) {
      console.warn(
        '⚠️ Zyfai SDK not initialized: API key missing.\n' +
        'Add VITE_ZYFAI_API_KEY to your .env file to enable yield optimization.\n' +
        'The app will work without Zyfai, but yield features will be disabled.'
      );
      return;
    }

    try {
      const zyfaiSdk = new ZyfaiSDK({
        apiKey,
        environment: environment as 'production' | 'staging',
      });

      setSdk(zyfaiSdk);
      console.log(`✅ Zyfai SDK initialized (${environment})`);
    } catch (error) {
      console.error('Failed to initialize Zyfai SDK:', error);
    }
  }, []);

  // Connect Zyfai when Para wallet is connected
  const connectZyfai = async () => {
    if (!sdk || !account.isConnected) {
      console.warn('SDK not initialized or wallet not connected');
      return;
    }

    // Wait for walletClient to be available
    if (!walletClient) {
      console.warn('Wallet client not yet available');
      return;
    }

    try {
      setError(null);

      // Get provider - prefer window.ethereum (external wallets) but fallback to adapter for embedded wallets
      let provider;

      if (typeof window !== 'undefined' && window.ethereum) {
        // External wallet (MetaMask, Coinbase, etc.) - use window.ethereum directly
        provider = window.ethereum;
        console.log('Using external wallet provider (window.ethereum)');
      } else {
        // Embedded wallet (email, social login) - create EIP-1193 provider from walletClient
        try {
          provider = createEIP1193Provider(walletClient);
          console.log('Using embedded wallet provider (via EIP-1193 adapter)');
        } catch (error) {
          const errorMsg = 'Failed to create provider from wallet client. Please ensure you are connected.';
          setError(errorMsg);
          console.error(errorMsg, error);
          return;
        }
      }

      // Get chain ID from wallet client
      const chainId = walletClient.chain?.id || 8453;

      // Map to supported chain IDs (default to Base if not supported)
      const supportedChainId: SupportedChainId =
        chainId === 42161 ? 42161 :
        chainId === 9745 ? 9745 :
        8453; // Default to Base

      // If user is on unsupported chain, warn them
      if (chainId !== supportedChainId) {
        console.warn(`Chain ${chainId} not supported by Zyfai. Defaulting to Base (${supportedChainId}). Please switch to Base, Arbitrum, or Plasma for best experience.`);
      }

      // Connect using provider (automatically authenticates via SIWE)
      const eoaAddress = await sdk.connectAccount(provider, supportedChainId);
      setConnectedAddress(eoaAddress);
      setCurrentChainId(supportedChainId);

      // Get smart wallet address (deterministic address generation)
      const walletInfo = await sdk.getSmartWalletAddress(eoaAddress, supportedChainId);
      setSmartWalletAddress(walletInfo.address);
      setIsDeployed(walletInfo.isDeployed);
      setIsConnected(true);

      console.log('Zyfai connected:', {
        eoa: eoaAddress,
        smartWallet: walletInfo.address,
        deployed: walletInfo.isDeployed,
        chainId: supportedChainId,
      });

      // Check session key status if Safe is deployed
      if (walletInfo.isDeployed) {
        try {
          const positions = await sdk.getPositions(eoaAddress, supportedChainId);
          const hasSessionKey = positions.positions?.[0]?.hasActiveSessionKey || false;
          setHasSessionKey(hasSessionKey);
          console.log('Initial session key status:', hasSessionKey);
        } catch (error) {
          console.warn('Could not check session key status on connect:', error);
          setHasSessionKey(false);
        }
      } else {
        setHasSessionKey(false);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to connect Zyfai';
      setError(errorMsg);

      // Provide helpful error messages based on common issues
      if (errorMsg.includes('CORS') || errorMsg.includes('Network error')) {
        console.error(
          '❌ Zyfai connection failed: CORS/Network error\n' +
          'Common causes:\n' +
          '1. Invalid API key - Check VITE_ZYFAI_API_KEY in .env\n' +
          '2. Wrong environment - Try "production" instead of "staging"\n' +
          '3. API not accessible - Verify Zyfai API is reachable\n',
          error
        );
      } else if (errorMsg.includes('Unsupported chain')) {
        console.error(
          '❌ Zyfai connection failed: Unsupported chain\n' +
          'Make sure you are on Base (8453), Arbitrum (42161), or Plasma (9745)\n',
          error
        );
      } else {
        console.error('❌ Failed to connect Zyfai:', error);
      }
    }
  };

  const disconnectZyfai = () => {
    if (sdk) {
      sdk.disconnectAccount();
      setIsConnected(false);
      setSmartWalletAddress(null);
      setIsDeployed(false);
      setConnectedAddress(null);
      setCurrentChainId(null);
      setHasSessionKey(false);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const refreshWalletInfo = async () => {
    if (!sdk || !connectedAddress || !currentChainId) {
      console.warn('Cannot refresh wallet info: SDK or address not available');
      return;
    }

    try {
      const walletInfo = await sdk.getSmartWalletAddress(connectedAddress, currentChainId);
      setSmartWalletAddress(walletInfo.address);
      setIsDeployed(walletInfo.isDeployed);
      console.log('Wallet info refreshed:', walletInfo);

      // Also check session key status if Safe is deployed
      if (walletInfo.isDeployed) {
        try {
          const positions = await sdk.getPositions(connectedAddress, currentChainId);
          // Session key status is nested in the first position object
          const hasSessionKey = positions.positions?.[0]?.hasActiveSessionKey || false;
          console.log('Session key status:', hasSessionKey);
          setHasSessionKey(hasSessionKey);
        } catch (error) {
          console.warn('Could not check session key status:', error);
        }
      }
    } catch (error) {
      console.error('Failed to refresh wallet info:', error);
    }
  };

  // Manual connection method - user must explicitly connect Zyfai
  const connectZyfaiManually = async () => {
    if (!account.isConnected) {
      throw new Error('Connect Para wallet first');
    }
    await connectZyfai();
  };

  // Auto-disconnect when Para wallet disconnects
  useEffect(() => {
    if (!account.isConnected && isConnected) {
      disconnectZyfai();
    }
  }, [account.isConnected, isConnected]);

  const value: ZyfaiContextType = {
    sdk,
    isConnected,
    smartWalletAddress,
    isDeployed,
    connectedAddress,
    currentChainId,
    hasSessionKey,
    error,
    connectZyfai,
    connectZyfaiManually,
    disconnectZyfai,
    clearError,
    refreshWalletInfo,
  };

  return <ZyfaiContext.Provider value={value}>{children}</ZyfaiContext.Provider>;
}

export function useZyfai() {
  const context = useContext(ZyfaiContext);
  if (context === undefined) {
    throw new Error('useZyfai must be used within a ZyfaiProvider');
  }
  return context;
}
