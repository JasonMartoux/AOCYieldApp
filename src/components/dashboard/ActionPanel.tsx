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
    <div className="card card-bordered shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base uppercase tracking-wide">
          Deposit or Withdraw
        </h2>

        {/* Action Selector */}
        <div className="join w-full mb-4">
          <button
            onClick={() => setAction('deposit')}
            className={`btn btn-lg join-item flex-1 ${action === 'deposit' ? 'btn-primary' : 'btn-outline'}`}
          >
            Deposit
          </button>
          <button
            onClick={() => setAction('withdraw')}
            className={`btn btn-lg join-item flex-1 ${action === 'withdraw' ? 'btn-primary' : 'btn-outline'}`}
          >
            Withdraw
          </button>
        </div>

        {/* Available Balance */}
        <div className="alert mb-4">
          <div className="flex justify-between w-full text-base">
            <span>Available:</span>
            <span className="font-mono font-semibold text-lg">
              ${availableBalance}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-base font-medium">Amount (USD)</span>
          </label>
          <div className="join w-full">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="input input-bordered input-lg join-item flex-1 font-mono text-lg"
              disabled={isPending}
            />
            <button
              onClick={handleMaxClick}
              className="btn btn-lg join-item"
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
          className="btn btn-primary btn-lg btn-block text-base"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-spinner loading-md"></span>
              Processing...
            </span>
          ) : (
            `${action === 'deposit' ? 'Deposit' : 'Withdraw'} $${amount || '0.00'}`
          )}
        </button>

        {/* Warning for deposits */}
        {action === 'deposit' && (
          <div className="alert alert-warning mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-sm">
              <strong>Note:</strong> After depositing, it may take 5-15 minutes for our AI to analyze
              and invest your funds across protocols. Your money won't earn interest until invested.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
