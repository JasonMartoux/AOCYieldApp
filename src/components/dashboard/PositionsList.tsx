import { useEffect } from 'react';
import { usePositions } from '../../hooks/useZyfaiOperations';

export function PositionsList() {
  const { fetchPositions, positions, isPending } = usePositions();

  // Fetch positions on mount
  useEffect(() => {
    fetchPositions();
  }, []);

  if (isPending) {
    return (
      <div className="bg-white border border-gray-300">
        <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Current Positions
          </h2>
        </div>
        <div className="p-6 text-center text-sm text-gray-500">
          Loading positions...
        </div>
      </div>
    );
  }

  // Flatten all position slots from all positions
  const allSlots = positions?.positions?.flatMap(p => p.positions) || [];

  return (
    <div className="bg-white border border-gray-300">
      <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Current Positions
        </h2>
      </div>

      {allSlots.length === 0 ? (
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-2">No active positions yet.</p>
          <p className="text-xs text-gray-500">
            After depositing, your funds will be automatically invested across DeFi protocols
            within 5-15 minutes. Check back soon.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Protocol
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Current APY
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Daily Earnings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allSlots.map((slot, index) => {
                // underlyingAmount is in raw units (6 decimals for USDC/USDT)
                const rawAmount = parseFloat(slot.underlyingAmount || '0');
                const amount = rawAmount / 1_000_000; // Convert to actual token amount
                const apy = slot.pool_apy || 0;
                const dailyEarnings = (amount * apy) / 365 / 100;

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {slot.protocol_name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {slot.pool || ''}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      ${amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      {apy.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-600">
                      ${dailyEarnings.toFixed(4)}/day
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <p>
          APY rates change daily based on market conditions. Daily earnings are estimates only.
        </p>
      </div>
    </div>
  );
}
