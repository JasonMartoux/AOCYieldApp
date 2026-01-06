import { useEffect } from 'react';
import { usePositions, useEarnings } from '../../hooks/useZyfaiOperations';

export function AccountSummary() {
  const { fetchPositions, positions } = usePositions();
  const { fetchEarnings, earnings } = useEarnings();

  // Fetch data on mount
  useEffect(() => {
    fetchPositions();
    fetchEarnings();
  }, []);

  // Calculate totals from all position slots
  const totalDeposited = positions?.positions?.reduce((sum, position) => {
    return sum + position.positions.reduce((slotSum, slot) => {
      // underlyingAmount is in raw units (6 decimals for USDC/USDT)
      const rawAmount = parseFloat(slot.underlyingAmount || '0');
      const amount = rawAmount / 1_000_000; // Convert to actual token amount
      return slotSum + amount;
    }, 0);
  }, 0) || 0;

  const totalEarned = earnings?.data?.totalEarnings || 0;
  const currentValue = totalDeposited + totalEarned;

  return (
    <div className="card card-bordered shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base uppercase tracking-wide">
          Account Summary
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              <tr>
                <td className="text-base">Current Value</td>
                <td className="text-right font-mono font-semibold text-xl">
                  ${currentValue.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="text-base">Total Deposited</td>
                <td className="text-right font-mono text-lg">
                  ${totalDeposited.toFixed(2)}
                </td>
              </tr>
              <tr className="border-t-2 border-base-300">
                <td className="font-bold text-base">Total Earnings</td>
                <td className="text-right font-mono font-bold text-lg">
                  ${totalEarned.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="divider my-2"></div>
        <div className="text-sm opacity-60">
          <p>Current Value = Deposited + Earnings</p>
        </div>
      </div>
    </div>
  );
}
