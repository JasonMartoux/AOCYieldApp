import { useEffect } from 'react';
import { usePositions, useEarnings } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';

export function YieldDashboard() {
  const { isConnected, isDeployed } = useZyfai();
  const { fetchPositions, positions, isPending: positionsPending, error: positionsError } = usePositions();
  const { fetchEarnings, earnings, isPending: earningsPending, error: earningsError } = useEarnings();

  useEffect(() => {
    if (isConnected && isDeployed) {
      fetchPositions();
      fetchEarnings();
    }
  }, [isConnected, isDeployed]);

  if (!isConnected || !isDeployed) {
    return null;
  }

  const hasPositions = positions && positions.positions && positions.positions.length > 0;

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Earnings Overview</h3>
        </div>

        <div className="px-5 py-5">
          {earningsPending ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : earningsError ? (
            <div className="py-4 px-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-sm text-red-700">{earningsError.message}</p>
            </div>
          ) : earnings?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Earnings */}
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-emerald-600 font-mono">
                  ${(earnings.data.totalEarnings || 0).toFixed(2)}
                </p>
              </div>

              {/* Current Earnings */}
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Current</p>
                <p className="text-2xl font-bold text-gray-900 font-mono">
                  ${(earnings.data.currentEarnings || 0).toFixed(2)}
                </p>
              </div>

              {/* Lifetime Earnings */}
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Lifetime</p>
                <p className="text-2xl font-bold text-gray-900 font-mono">
                  ${(earnings.data.lifetimeEarnings || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm text-gray-500">No earnings data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Active Positions */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Active Positions</h3>
          {hasPositions && (
            <span className="text-xs font-medium text-gray-500">
              {positions.positions.length} {positions.positions.length === 1 ? 'Position' : 'Positions'}
            </span>
          )}
        </div>

        <div className="divide-y divide-gray-200">
          {positionsPending ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : positionsError ? (
            <div className="px-5 py-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-500">
                <p className="text-sm text-red-700">{positionsError.message}</p>
              </div>
            </div>
          ) : hasPositions ? (
            positions.positions.map((position, posIndex) => (
              <div key={posIndex} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                {/* Position Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{position.strategy || 'Strategy'}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{position.chain}</p>
                  </div>
                </div>

                {/* Position Slots */}
                {position.positions && position.positions.length > 0 && (
                  <div className="space-y-3 mt-3">
                    {position.positions.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="pl-4 border-l-2 border-gray-200 hover:border-emerald-500 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {slot.protocol_name || 'Unknown Protocol'}
                            </p>
                            {slot.pool && (
                              <p className="text-xs text-gray-500 mt-0.5 truncate">{slot.pool}</p>
                            )}
                          </div>

                          {slot.pool_apy && (
                            <div className="ml-4 text-right">
                              <p className="text-sm font-bold text-emerald-600">
                                {slot.pool_apy.toFixed(2)}%
                              </p>
                              <p className="text-xs text-gray-500">APY</p>
                            </div>
                          )}
                        </div>

                        {slot.underlyingAmount && (
                          <div className="mt-2 flex items-baseline gap-2">
                            <p className="text-xs font-medium text-gray-700">Balance:</p>
                            <p className="text-sm font-mono text-gray-900">
                              {parseFloat(slot.underlyingAmount).toFixed(4)} {slot.token_symbol}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-5 py-12 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-sm font-medium text-gray-900 mb-1">No active positions</p>
              <p className="text-xs text-gray-500">Deposit funds to start earning yield across protocols</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
