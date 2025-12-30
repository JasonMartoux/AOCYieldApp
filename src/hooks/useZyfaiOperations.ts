import { useState } from 'react';
import { useZyfai } from '../contexts/ZyfaiContext';
import type {
  SupportedChainId,
  DeploySafeResponse,
  PositionsResponse,
  DepositResponse,
  WithdrawResponse,
  OnchainEarnings,
  SessionKeyResponse,
} from '../types/zyfai';

export function useDeploySafe() {
  const { sdk, isConnected, connectedAddress, currentChainId } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deploymentData, setDeploymentData] = useState<DeploySafeResponse | null>(null);

  const deploySafe = async () => {
    if (!sdk || !isConnected || !connectedAddress || !currentChainId) {
      setError(new Error('SDK not connected or missing address/chain'));
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.deploySafe(connectedAddress, currentChainId);
      setDeploymentData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to deploy Safe');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { deploySafe, isPending, error, deploymentData };
}

export function usePositions() {
  const { sdk, isConnected, connectedAddress } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [positions, setPositions] = useState<PositionsResponse | null>(null);

  const fetchPositions = async (chainId?: SupportedChainId) => {
    if (!sdk || !isConnected || !connectedAddress) {
      setError(new Error('SDK not connected or missing address'));
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getPositions(connectedAddress, chainId);
      setPositions(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch positions');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { fetchPositions, positions, isPending, error };
}

export function useDepositFunds() {
  const { sdk, isConnected, connectedAddress } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [depositData, setDepositData] = useState<DepositResponse | null>(null);

  const deposit = async (chainId: SupportedChainId, amount: string) => {
    if (!sdk || !isConnected || !connectedAddress) {
      setError(new Error('SDK not connected or missing address'));
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.depositFunds(connectedAddress, chainId, amount);
      setDepositData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to deposit funds');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { deposit, depositData, isPending, error };
}

export function useWithdrawFunds() {
  const { sdk, isConnected, connectedAddress } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [withdrawData, setWithdrawData] = useState<WithdrawResponse | null>(null);

  const withdraw = async (chainId: SupportedChainId, amount?: string) => {
    if (!sdk || !isConnected || !connectedAddress) {
      setError(new Error('SDK not connected or missing address'));
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.withdrawFunds(connectedAddress, chainId, amount);
      setWithdrawData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to withdraw funds');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { withdraw, withdrawData, isPending, error };
}

export function useEarnings() {
  const { sdk, isConnected, smartWalletAddress } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [earnings, setEarnings] = useState<OnchainEarnings | null>(null);

  const fetchEarnings = async () => {
    if (!sdk || !isConnected || !smartWalletAddress) {
      setError(new Error('SDK not connected or smart wallet not deployed'));
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getOnchainEarnings(smartWalletAddress);
      setEarnings(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch earnings');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { fetchEarnings, earnings, isPending, error };
}

// Hook for creating session key (enables gasless transactions)
export function useCreateSessionKey() {
  const { sdk, isConnected, connectedAddress, currentChainId } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionKeyData, setSessionKeyData] = useState<SessionKeyResponse | null>(null);

  const createSessionKey = async () => {
    if (!sdk || !isConnected || !connectedAddress || !currentChainId) {
      setError(new Error('SDK not connected or missing address/chain'));
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.createSessionKey(connectedAddress, currentChainId);
      setSessionKeyData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create session key');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { createSessionKey, sessionKeyData, isPending, error };
}
