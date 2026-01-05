import { useState } from 'react';
import { useWallet } from '@getpara/react-sdk';
import { useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { useDepositFunds, useWithdrawFunds } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';

const TOKEN_ADDRESSES = {
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base USDC
  42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // Arbitrum USDC
  9745: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904', // Plasma USDT
} as const;

export function ActionPanel() {
  const [action, setAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const { data: wallet } = useWallet();
  const { currentChainId, smartWalletAddress } = useZyfai();
  const { deposit, isPending: isDepositing } = useDepositFunds();
  const { withdraw, isPending: isWithdrawing } = useWithdrawFunds();

  const selectedChain = (currentChainId || 8453) as keyof typeof TOKEN_ADDRESSES;

  // Get wallet balance for deposits
  const { data: walletBalanceData } = useBalance({
    address: wallet?.address as `0x${string}` | undefined,
    token: TOKEN_ADDRESSES[selectedChain],
    chainId: selectedChain,
  });

  // Get Safe balance for withdrawals
  const { data: safeBalanceData } = useBalance({
    address: smartWalletAddress as `0x${string}` | undefined,
    token: TOKEN_ADDRESSES[selectedChain],
    chainId: selectedChain,
  });

  const getFormattedBalance = (balanceData: typeof walletBalanceData): string => {
    if (!balanceData?.value || !balanceData?.decimals) return '0.00';
    return formatUnits(balanceData.value, balanceData.decimals);
  };

  const availableBalance = action === 'deposit'
    ? getFormattedBalance(walletBalanceData)
    : getFormattedBalance(safeBalanceData);

  const handleMaxClick = () => {
    setAmount(availableBalance);
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !currentChainId) return;

    try {
      if (action === 'deposit') {
        await deposit(currentChainId, amount);
      } else {
        await withdraw(currentChainId, amount);
      }
      setAmount('');
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
    }
  };

  const isPending = isDepositing || isWithdrawing;

  return (
    <div className="bg-white border border-gray-300">
      <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Deposit or Withdraw
        </h2>
      </div>

      <div className="p-6">
        {/* Action Selector */}
        <div className="flex border border-gray-300 mb-4">
          <button
            onClick={() => setAction('deposit')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              action === 'deposit'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setAction('withdraw')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              action === 'withdraw'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Available Balance */}
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available:</span>
            <span className="font-mono font-semibold text-gray-900">
              ${availableBalance}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (USD)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 px-3 py-2 border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              disabled={isPending}
            />
            <button
              onClick={handleMaxClick}
              className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isPending}
            >
              Max
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isPending || !amount || parseFloat(amount) <= 0}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            `${action === 'deposit' ? 'Deposit' : 'Withdraw'} $${amount || '0.00'}`
          )}
        </button>

        {/* Warning for deposits */}
        {action === 'deposit' && (
          <div className="mt-4 p-3 border border-amber-300 bg-amber-50">
            <p className="text-xs text-gray-700">
              <strong>Note:</strong> After depositing, it may take 5-15 minutes for our AI to analyze
              and invest your funds across protocols. Your money won't earn interest until invested.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
