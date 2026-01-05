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
      const amount = parseFloat(slot.amount || '0');
      return slotSum + amount;
    }, 0);
  }, 0) || 0;

  const totalEarned = earnings?.data?.totalEarnings || 0;
  const ourFee = totalEarned * 0.10; // 10% performance fee
  const yourEarnings = totalEarned - ourFee;
  const currentValue = totalDeposited + yourEarnings;

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
            <tr>
              <td className="py-3 text-gray-600">Gross Earnings</td>
              <td className="py-3 text-right font-mono text-gray-700">
                ${totalEarned.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600">Our Fee (10%)</td>
              <td className="py-3 text-right font-mono text-red-600">
                -${ourFee.toFixed(2)}
              </td>
            </tr>
            <tr className="border-t-2 border-gray-900">
              <td className="py-3 font-bold text-gray-900">Your Net Earnings</td>
              <td className="py-3 text-right font-mono font-bold text-gray-900">
                ${yourEarnings.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
          <p>Current Value = Deposited + Net Earnings</p>
          <p className="mt-1">Performance fee only charged on profits, not deposits</p>
        </div>
      </div>
    </div>
  );
}
