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
      <div className="card card-bordered shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-base uppercase tracking-wide">
            Current Positions
          </h2>
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  // Flatten all position slots from all positions
  const allSlots = positions?.positions?.flatMap(p => p.positions) || [];

  return (
    <div className="card card-bordered shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base uppercase tracking-wide">
          Current Positions
        </h2>

        {allSlots.length === 0 ? (
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <div className="font-semibold text-base">No active positions yet.</div>
              <div className="text-sm opacity-80">
                After depositing, your funds will be automatically invested across DeFi protocols
                within 5-15 minutes. Check back soon.
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th className="text-base">Protocol</th>
                    <th className="text-right text-base">Amount</th>
                    <th className="text-right text-base">Current APY</th>
                    <th className="text-right text-base">Daily Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {allSlots.map((slot, index) => {
                    // underlyingAmount is in raw units (6 decimals for USDC/USDT)
                    const rawAmount = parseFloat(slot.underlyingAmount || '0');
                    const amount = rawAmount / 1_000_000; // Convert to actual token amount
                    const apy = slot.pool_apy || 0;
                    const dailyEarnings = (amount * apy) / 365 / 100;

                    return (
                      <tr key={index}>
                        <td>
                          <div className="font-medium text-base">
                            {slot.protocol_name || 'Unknown'}
                          </div>
                          <div className="text-sm opacity-60">
                            {slot.pool || ''}
                          </div>
                        </td>
                        <td className="text-right font-mono text-base">
                          ${amount.toFixed(2)}
                        </td>
                        <td className="text-right font-mono text-base">
                          {apy.toFixed(2)}%
                        </td>
                        <td className="text-right font-mono text-sm opacity-70">
                          ${dailyEarnings.toFixed(4)}/day
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divider my-2"></div>
            <div className="text-sm opacity-60">
              <p>
                APY rates change daily based on market conditions. Daily earnings are estimates only.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
