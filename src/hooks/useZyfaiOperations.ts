import { useState, useCallback, useRef } from 'react';
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
  const { sdk, isConnected, connectedAddress, currentChainId, refreshWalletInfo } = useZyfai();
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
      console.log(result);
      setDeploymentData(result);

      // Refresh wallet info to update isDeployed status
      await refreshWalletInfo();

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
  const fetchedChainsRef = useRef<Set<number | 'all'>>(new Set());

  const fetchPositions = useCallback(async (chainId?: SupportedChainId) => {
    if (!sdk || !isConnected || !connectedAddress) {
      return;
    }

    const cacheKey = chainId || 'all';

    // Skip if already fetched
    if (fetchedChainsRef.current.has(cacheKey)) {
      return positions;
    }

    fetchedChainsRef.current.add(cacheKey);
    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getPositions(connectedAddress, chainId);
      console.log('📊 Positions response:', JSON.stringify(result, null, 2));
      setPositions(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch positions');
      setError(error);
      fetchedChainsRef.current.delete(cacheKey);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, isConnected, connectedAddress]);

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
  const hasFetchedRef = useRef(false);

  const fetchEarnings = useCallback(async () => {
    if (!sdk || !isConnected || !smartWalletAddress) {
      return;
    }

    // Skip if already fetched
    if (hasFetchedRef.current) {
      return earnings;
    }

    hasFetchedRef.current = true;
    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getOnchainEarnings(smartWalletAddress);
      setEarnings(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch earnings');
      setError(error);
      hasFetchedRef.current = false;
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, isConnected, smartWalletAddress]);

  return { fetchEarnings, earnings, isPending, error };
}

// Hook for creating session key (enables gasless transactions)
export function useCreateSessionKey() {
  const { sdk, isConnected, connectedAddress, currentChainId, refreshWalletInfo } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionKeyData, setSessionKeyData] = useState<SessionKeyResponse | null>(null);

  const createSessionKey = async () => {
    console.log('🔑 Creating session key...');
    console.log('SDK:', !!sdk);
    console.log('Connected:', isConnected);
    console.log('Address:', connectedAddress);
    console.log('Chain:', currentChainId);

    if (!sdk || !isConnected || !connectedAddress || !currentChainId) {
      const errorMsg = 'SDK not connected or missing address/chain';
      console.error('❌ Cannot create session key:', errorMsg);
      const err = new Error(errorMsg);
      setError(err);
      throw err;
    }

    setIsPending(true);
    setError(null);

    try {
      console.log('📡 Calling sdk.createSessionKey...');
      const result = await sdk.createSessionKey(connectedAddress, currentChainId);
      console.log('✅ Session key created:', result);
      setSessionKeyData(result);

      // Refresh wallet info to update session key status
      await refreshWalletInfo();

      return result;
    } catch (err) {
      console.error('❌ Session key creation failed:', err);
      const error = err instanceof Error ? err : new Error('Failed to create session key');
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { createSessionKey, sessionKeyData, isPending, error };
}

// Hook for getting safe yield opportunities
export function useGetOpportunities() {
  const { sdk, currentChainId } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [safeOpportunities, setSafeOpportunities] = useState<any | null>(null);
  const [degenStrategies, setDegenStrategies] = useState<any | null>(null);
  const fetchedChainsRef = useRef<{ safe: Set<number>; degen: Set<number> }>({
    safe: new Set(),
    degen: new Set()
  });

  const fetchSafeOpportunities = useCallback(async (chainId?: SupportedChainId) => {
    const targetChain = chainId || currentChainId;
    if (!sdk || !targetChain) {
      return;
    }

    // Skip if already fetched for this chain
    if (fetchedChainsRef.current.safe.has(targetChain)) {
      return safeOpportunities;
    }

    // Mark as being fetched
    fetchedChainsRef.current.safe.add(targetChain);

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getSafeOpportunities(targetChain);
      setSafeOpportunities(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch safe opportunities');
      setError(error);
      // Remove from cache on error
      fetchedChainsRef.current.safe.delete(targetChain);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk]);

  const fetchDegenStrategies = useCallback(async (chainId?: SupportedChainId) => {
    const targetChain = chainId || currentChainId;
    if (!sdk || !targetChain) {
      return;
    }

    // Skip if already fetched for this chain
    if (fetchedChainsRef.current.degen.has(targetChain)) {
      return degenStrategies;
    }

    // Mark as being fetched
    fetchedChainsRef.current.degen.add(targetChain);

    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getDegenStrategies(targetChain);
      setDegenStrategies(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch degen strategies');
      setError(error);
      // Remove from cache on error
      fetchedChainsRef.current.degen.delete(targetChain);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk]);

  return { fetchSafeOpportunities, fetchDegenStrategies, safeOpportunities, degenStrategies, isPending, error, sdk };
}

// Hook for getting daily APY history
export function useGetApyHistory() {
  const { sdk, smartWalletAddress } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [apyHistory, setApyHistory] = useState<any | null>(null);
  const fetchedPeriodsRef = useRef<Set<string>>(new Set());

  const fetchApyHistory = useCallback(async (period: '7D' | '14D' | '30D' = '30D') => {
    if (!sdk || !smartWalletAddress) {
      return;
    }

    // Skip if already fetched for this period
    if (fetchedPeriodsRef.current.has(period)) {
      return apyHistory;
    }

    fetchedPeriodsRef.current.add(period);
    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getDailyApyHistory(smartWalletAddress, period);
      setApyHistory(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch APY history');
      setError(error);
      fetchedPeriodsRef.current.delete(period);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, smartWalletAddress]);

  return { fetchApyHistory, apyHistory, isPending, error };
}

// Hook for getting daily earnings
export function useGetDailyEarnings() {
  const { sdk, smartWalletAddress } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [dailyEarnings, setDailyEarnings] = useState<any | null>(null);
  const fetchedRangesRef = useRef<Set<string>>(new Set());

  const fetchDailyEarnings = useCallback(async (startDate: string, endDate: string) => {
    if (!sdk || !smartWalletAddress) {
      return;
    }

    const cacheKey = `${startDate}-${endDate}`;

    // Skip if already fetched for this date range
    if (fetchedRangesRef.current.has(cacheKey)) {
      return dailyEarnings;
    }

    fetchedRangesRef.current.add(cacheKey);
    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getDailyEarnings(smartWalletAddress, startDate, endDate);
      setDailyEarnings(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch daily earnings');
      setError(error);
      fetchedRangesRef.current.delete(cacheKey);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, smartWalletAddress]);

  return { fetchDailyEarnings, dailyEarnings, isPending, error };
}

// Hook for getting transaction history
export function useGetHistory() {
  const { sdk, smartWalletAddress, currentChainId } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [history, setHistory] = useState<any | null>(null);
  const fetchedQueriesRef = useRef<Set<string>>(new Set());

  const fetchHistory = useCallback(async (options?: { limit?: number; offset?: number; fromDate?: string; toDate?: string }, chainId?: SupportedChainId) => {
    const targetChain = chainId || currentChainId;
    if (!sdk || !smartWalletAddress || !targetChain) {
      return;
    }

    const cacheKey = `${targetChain}-${JSON.stringify(options || {})}`;

    // Skip if already fetched for this query
    if (fetchedQueriesRef.current.has(cacheKey)) {
      return history;
    }

    fetchedQueriesRef.current.add(cacheKey);
    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getHistory(smartWalletAddress, targetChain, options);
      setHistory(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch transaction history');
      setError(error);
      fetchedQueriesRef.current.delete(cacheKey);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, smartWalletAddress, currentChainId]);

  return { fetchHistory, history, isPending, error };
}

// Hook for getting available protocols
export function useGetProtocols() {
  const { sdk, currentChainId } = useZyfai();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [protocols, setProtocols] = useState<any | null>(null);
  const fetchedChainsRef = useRef<Set<number>>(new Set());

  const fetchProtocols = useCallback(async (chainId?: SupportedChainId) => {
    const targetChain = chainId || currentChainId;
    if (!sdk || !targetChain) {
      return;
    }

    // Skip if already fetched for this chain
    if (fetchedChainsRef.current.has(targetChain)) {
      return protocols;
    }

    fetchedChainsRef.current.add(targetChain);
    setIsPending(true);
    setError(null);

    try {
      const result = await sdk.getAvailableProtocols(targetChain);
      setProtocols(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch protocols');
      setError(error);
      fetchedChainsRef.current.delete(targetChain);
      throw error;
    } finally {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, currentChainId]);

  return { fetchProtocols, protocols, isPending, error };
}
