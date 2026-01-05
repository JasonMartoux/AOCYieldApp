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
    <div className="bg-white border border-gray-300">
      <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Account Summary
        </h2>
      </div>

      <div className="p-6">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-3 text-gray-600">Current Value</td>
              <td className="py-3 text-right font-mono font-semibold text-gray-900">
                ${currentValue.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600">Total Deposited</td>
              <td className="py-3 text-right font-mono text-gray-700">
                ${totalDeposited.toFixed(2)}
              </td>
            </tr>
            <tr className="border-t-2 border-gray-900">
              <td className="py-3 font-bold text-gray-900">Total Earnings</td>
              <td className="py-3 text-right font-mono font-bold text-gray-900">
                ${totalEarned.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
          <p>Current Value = Deposited + Earnings</p>
        </div>
      </div>
    </div>
  );
}
