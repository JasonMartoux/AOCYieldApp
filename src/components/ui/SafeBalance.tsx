import { useEffect, useState } from 'react';
import { useZyfai } from '../../contexts/ZyfaiContext';
import { usePublicClient } from 'wagmi';
import { formatUnits } from 'viem';

// USDC contract address on Base
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'symbol', type: 'string' }],
  },
] as const;

export function SafeBalance() {
  const { smartWalletAddress, isDeployed, currentChainId } = useZyfai();
  const publicClient = usePublicClient({ chainId: currentChainId || 8453 });
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!smartWalletAddress || !publicClient || !isDeployed) return;

    setLoading(true);
    try {
      // Get USDC balance on Base
      const usdcBalance = await publicClient.readContract({
        address: USDC_BASE,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [smartWalletAddress as `0x${string}`],
      });

      // USDC has 6 decimals
      const formatted = formatUnits(usdcBalance, 6);
      setBalance(formatted);
      console.log('Safe USDC Balance:', formatted);
    } catch (error) {
      console.error('Failed to fetch Safe balance:', error);
      setBalance('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDeployed && smartWalletAddress) {
      fetchBalance();
    }
  }, [isDeployed, smartWalletAddress]);

  if (!isDeployed) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-blue-900 uppercase tracking-wide mb-1">
            Safe Balance (Onchain)
          </p>
          <p className="text-2xl font-bold text-blue-900 font-mono">
            {loading ? 'Loading...' : `${parseFloat(balance).toFixed(2)} USDC`}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Not yet invested by Zyfai
          </p>
        </div>
        <button
          onClick={fetchBalance}
          disabled={loading}
          className="px-3 py-2 text-xs font-medium text-blue-700 hover:text-blue-900 transition-colors"
          title="Refresh balance"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
