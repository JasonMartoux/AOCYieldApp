import { useState, useEffect } from 'react';
import { useDepositFunds, useWithdrawFunds, usePositions, useEarnings } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';
import type { SupportedChainId } from '../../types/zyfai';
import { ChainNames, ChainTokens } from '../../types/zyfai';
import { useWallet } from '@getpara/react-sdk';
import { useBalance } from 'wagmi';
import { formatUnits } from 'viem';

// USDC/USDT contract addresses per chain
const TOKEN_ADDRESSES = {
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base USDC
  42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // Arbitrum USDC
  9745: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904', // Plasma USDT
} as const;

export function DepositWithdraw() {
  const { isConnected, isDeployed, currentChainId, smartWalletAddress } = useZyfai();
  const { deposit, depositData, isPending: depositPending, error: depositError } = useDepositFunds();
  const { withdraw, withdrawData, isPending: withdrawPending, error: withdrawError } = useWithdrawFunds();
  const { fetchPositions } = usePositions();
  const { fetchEarnings } = useEarnings();
  const { data: wallet } = useWallet();

  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState<SupportedChainId>(currentChainId || 8453);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  // Get wallet balance for selected token (for deposit max)
  const { data: walletBalanceData } = useBalance({
    address: wallet?.address as `0x${string}` | undefined,
    token: TOKEN_ADDRESSES[selectedChain],
    chainId: selectedChain,
  });

  // Get Safe wallet balance for selected token (for withdraw max)
  const { data: safeBalanceData } = useBalance({
    address: smartWalletAddress as `0x${string}` | undefined,
    token: TOKEN_ADDRESSES[selectedChain],
    chainId: selectedChain,
  });

  // Helper to format balance from wei to human-readable format
  const getFormattedBalance = (balanceData: typeof walletBalanceData): string => {
    if (!balanceData?.value || !balanceData?.decimals) return '0.00';
    return formatUnits(balanceData.value, balanceData.decimals);
  };

  // Refresh positions and earnings after successful deposit/withdrawal
  useEffect(() => {
    if (depositData || withdrawData) {
      // Wait a bit for the blockchain to process the transaction
      const refreshTimer = setTimeout(() => {
        console.log('Refreshing positions and earnings after transaction...');
        fetchPositions();
        fetchEarnings();
      }, 3000); // Wait 3 seconds before refreshing

      return () => clearTimeout(refreshTimer);
    }
  }, [depositData, withdrawData]);

  // Handle Max button click
  const handleMaxClick = () => {
    if (activeTab === 'deposit' && walletBalanceData) {
      setAmount(getFormattedBalance(walletBalanceData));
    } else if (activeTab === 'withdraw' && safeBalanceData) {
      setAmount(getFormattedBalance(safeBalanceData));
    }
  };

  if (!isConnected || !isDeployed) {
    return null;
  }

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      const amountInUnits = Math.floor(parseFloat(amount) * 1_000_000).toString();
      await deposit(selectedChain, amountInUnits);
      setAmount('');
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      const amountInUnits = Math.floor(parseFloat(amount) * 1_000_000).toString();
      await withdraw(selectedChain, amountInUnits);
      setAmount('');
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  const isPending = depositPending || withdrawPending;
  const error = depositError || withdrawError;
  const successData = depositData || withdrawData;

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Fund Management</h3>
      </div>

      <div className="px-5 py-5">
        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 mb-6">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'deposit'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'withdraw'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Success Message */}
        {successData && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-emerald-900">
                  {activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'} initiated successfully
                </p>
                {withdrawData?.message && (
                  <p className="text-xs text-emerald-700 mt-1">{withdrawData.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-900">Transaction failed</p>
                <p className="text-xs text-red-700 mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chain Selection */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
            Network
          </label>
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(Number(e.target.value) as SupportedChainId)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          >
            <option value={8453}>{ChainNames[8453]} · {ChainTokens[8453]}</option>
            <option value={42161}>{ChainNames[42161]} · {ChainTokens[42161]}</option>
            <option value={9745}>{ChainNames[9745]} · {ChainTokens[9745]}</option>
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
              Amount ({ChainTokens[selectedChain]})
            </label>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">
                Available: {activeTab === 'deposit'
                  ? getFormattedBalance(walletBalanceData)
                  : getFormattedBalance(safeBalanceData)
                } {ChainTokens[selectedChain]}
              </span>
              <button
                type="button"
                onClick={handleMaxClick}
                disabled={
                  isPending ||
                  (activeTab === 'deposit' && !walletBalanceData?.value) ||
                  (activeTab === 'withdraw' && !safeBalanceData?.value)
                }
                className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                MAX
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-mono"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
              {ChainTokens[selectedChain]}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={activeTab === 'deposit' ? handleDeposit : handleWithdraw}
          disabled={isPending || !amount || parseFloat(amount) <= 0}
          className={`w-full px-4 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
            activeTab === 'deposit'
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
              : 'bg-gray-900 hover:bg-gray-800 text-white hover:shadow-md'
          }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {activeTab === 'deposit' ? 'Processing Deposit...' : 'Processing Withdrawal...'}
            </span>
          ) : (
            <span>{activeTab === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}</span>
          )}
        </button>

        {/* Info Text */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          {activeTab === 'deposit'
            ? 'Funds will be deposited to your Smart Wallet and optimized for yield across protocols.'
            : 'Withdrawn funds will be sent to your connected wallet address.'}
        </p>
      </div>
    </div>
  );
}
