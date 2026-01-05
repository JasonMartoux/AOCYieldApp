import { useEffect, useState } from 'react';
import { usePositions, useEarnings, useGetApyHistory } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';
import { SafeBalance } from './SafeBalance';
import { SessionKeyManager } from './SessionKeyManager';

export function YieldDashboard() {
  const { isConnected, isDeployed } = useZyfai();
  const { fetchPositions, positions, isPending: positionsPending, error: positionsError } = usePositions();
  const { fetchEarnings, earnings, isPending: earningsPending, error: earningsError } = useEarnings();
  const { fetchApyHistory, apyHistory } = useGetApyHistory();
  const [apyPeriod, setApyPeriod] = useState<'7D' | '14D' | '30D'>('30D');

  useEffect(() => {
    if (isConnected && isDeployed) {
      fetchPositions();
      fetchEarnings();
      fetchApyHistory(apyPeriod);
    }
  }, [isConnected, isDeployed, apyPeriod]);

  if (!isConnected || !isDeployed) {
    return null;
  }

  const hasPositions = positions && positions.positions && positions.positions.length > 0;

  // Helper function to safely parse and round amounts
  // Handles both raw units (1500000) and human-readable formats (1.5)
  // Following Para SDK best practices for USDC (6 decimals)
  const parseAmount = (amount: string | undefined, symbol?: string): number => {
    if (!amount) return 0;
    const parsed = parseFloat(amount);
    if (isNaN(parsed)) return 0;

    // If amount is very large (>10000) and token is USDC/USDT, assume it's in raw units
    // USDC/USDT have 6 decimals: 1 USDC = 1000000 raw units
    const isStablecoin = symbol === 'USDC' || symbol === 'USDT';
    if (isStablecoin && parsed > 10000) {
      // Convert from raw units (6 decimals)
      return Math.round((parsed / 1e6) * 100) / 100;
    }

    // Otherwise, assume already in human-readable format
    return Math.round(parsed * 100) / 100;
  };

  // Calculate total invested amount from positions
  const totalInvested = positions?.positions.reduce((total, position) => {
    const positionTotal = position.positions?.reduce((sum, slot) => {
      return sum + parseAmount(slot.underlyingAmount, slot.token_symbol);
    }, 0) || 0;
    return total + positionTotal;
  }, 0) || 0;

  // Count active protocols
  const activeProtocols = positions?.positions.reduce((count, position) => {
    return count + (position.positions?.length || 0);
  }, 0) || 0;

  // Format USD amounts with proper decimal handling
  const formatUSD = (amount: number): string => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    
    <div className="space-y-6">
      {/* Safe Balance (Not Yet Invested) */}
      <SafeBalance />

      {/* Session Key Manager */}
      <SessionKeyManager />

      {/* Balance Overview Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-emerald-600 border-b border-emerald-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wide">Balance Overview</h3>
            {hasPositions && positions.positions[0]?.strategy && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                {positions.positions[0].strategy.toLowerCase().includes('safe') ? '🛡️' : '⚡'}
                <span className="uppercase tracking-wide">
                  {positions.positions[0].strategy.replace('_', ' ')}
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="px-5 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Invested */}
            <div className="text-center">
              <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">Total Invested</p>
              <p className="text-3xl font-bold text-emerald-900 font-mono">
                ${formatUSD(totalInvested)}
              </p>
              {activeProtocols > 0 && (
                <p className="text-xs text-emerald-600 mt-1">
                  {activeProtocols} {activeProtocols === 1 ? 'protocol' : 'protocols'}
                </p>
              )}
            </div>

            {/* Total Earnings */}
            <div className="text-center border-l border-emerald-300 pl-6">
              <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">Total Earnings</p>
              <p className="text-3xl font-bold text-emerald-900 font-mono">
                ${formatUSD(earnings?.data?.totalEarnings || 0)}
              </p>
              <p className="text-xs text-emerald-600 mt-1">Onchain verified</p>
            </div>

            {/* Total Value */}
            <div className="text-center border-l border-emerald-300 pl-6">
              <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">Total Value</p>
              <p className="text-3xl font-bold text-emerald-900 font-mono">
                ${formatUSD(totalInvested + (earnings?.data?.totalEarnings || 0))}
              </p>
              <p className="text-xs text-emerald-600 mt-1">Invested + Earnings</p>
            </div>
          </div>
        </div>
      </div>


      {/* APY History */}
      {apyHistory && (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">APY Performance</h3>
            <div className="flex gap-1">
              {(['7D', '14D', '30D'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setApyPeriod(period)}
                  className={`px-2 py-1 text-xs font-medium transition-all ${
                    apyPeriod === period
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Average Weighted APY ({apyPeriod})
              </p>
              <p className="text-4xl font-bold text-emerald-600 font-mono mb-1">
                {apyHistory.averageWeightedApy?.toFixed(2) || '0.00'}%
              </p>
              <p className="text-xs text-gray-500">
                Based on {apyHistory.totalDays || 0} days of data
              </p>
            </div>

            {/* Recent Daily Breakdown */}
            {apyHistory.history && Object.keys(apyHistory.history).length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-3">Recent Performance</p>
                <div className="space-y-2">
                  {Object.entries(apyHistory.history)
                    .slice(-5)
                    .reverse()
                    .map(([date, entry]: [string, any]) => {
                      // Use the actual field names from the API response
                      const finalApy = typeof entry === 'object' && entry.final_weighted_apy !== undefined
                        ? entry.final_weighted_apy.toFixed(2)
                        : 'n/a';
                      const weightedApy = typeof entry === 'object' && entry.weighted_apy !== undefined
                        ? entry.weighted_apy.toFixed(2)
                        : 'n/a';

                      return (
                        <div key={date} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-xs text-gray-600">{date}</span>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs font-medium text-gray-900">
                                {finalApy}% APY
                              </p>
                              <p className="text-xs text-gray-500">
                                Base: {weightedApy}%
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
                  ${formatUSD(earnings.data.totalEarnings || 0)}
                </p>
              </div>

              {/* Current Earnings */}
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Current</p>
                <p className="text-2xl font-bold text-gray-900 font-mono">
                  ${formatUSD(earnings.data.currentEarnings || 0)}
                </p>
              </div>

              {/* Lifetime Earnings */}
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Lifetime</p>
                <p className="text-2xl font-bold text-gray-900 font-mono">
                  ${formatUSD(earnings.data.lifetimeEarnings || 0)}
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
        <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Active Positions</h3>
            <div className="flex items-center gap-2">
              {hasPositions && positions.positions[0]?.strategy && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium ${
                  positions.positions[0].strategy.toLowerCase().includes('safe')
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : positions.positions[0].strategy.toLowerCase().includes('degen')
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {positions.positions[0].strategy.toLowerCase().includes('safe') && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {positions.positions[0].strategy.toLowerCase().includes('degen') && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                  )}
                  <span className="uppercase tracking-wide">
                    {positions.positions[0].strategy.replace('_', ' ')}
                  </span>
                </span>
              )}
              {hasPositions && (
                <span className="text-xs font-medium text-gray-500">
                  {positions.positions.length} {positions.positions.length === 1 ? 'Position' : 'Positions'}
                </span>
              )}
            </div>
          </div>
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
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{position.strategy || 'Strategy'}</h4>
                      {position.strategy?.toLowerCase().includes('safe') && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium border border-emerald-200">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Low Risk
                        </span>
                      )}
                      {position.strategy?.toLowerCase().includes('degen') && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium border border-purple-200">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                          </svg>
                          High Risk
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{position.chain}</p>
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
                              <p className="text-xs text-gray-500">Pool APY</p>
                            </div>
                          )}
                        </div>

                        {/* APY Details */}
                        {slot.pool_apy && (
                          <div className="mt-3 p-2.5 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-emerald-900">Pool APY</span>
                              <span className="font-mono font-bold text-lg text-emerald-700">
                                {slot.pool_apy.toFixed(2)}%
                              </span>
                            </div>
                            {slot.pool_tvl && (
                              <div className="flex items-center justify-between text-xs text-emerald-700">
                                <span>Total Value Locked:</span>
                                <span className="font-mono font-medium">
                                  ${(slot.pool_tvl / 1e6).toFixed(2)}M
                                </span>
                              </div>
                            )}
                            <p className="text-xs text-gray-600 mt-2 italic border-t border-emerald-200 pt-2">
                              💡 APY automatically optimized by Zyfai AI
                            </p>
                          </div>
                        )}

                        {slot.underlyingAmount && (
                          <div className="mt-2 flex items-baseline gap-2">
                            <p className="text-xs font-medium text-gray-700">Balance:</p>
                            <p className="text-sm font-mono text-gray-900">
                              {formatUSD(parseAmount(slot.underlyingAmount, slot.token_symbol))} {slot.token_symbol}
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
              <p className="text-xs text-gray-500 mb-4">Deposit funds to start earning yield across protocols</p>

              {/* Strategy Info */}
              <div className="max-w-md mx-auto mt-6 p-3 bg-blue-50 border border-blue-200 text-left">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-blue-900 mb-1">AI-Optimized Strategy</p>
                    <p className="text-xs text-blue-700">
                      Zyfai automatically selects and manages your investment strategy based on risk profile and market conditions.
                      The AI continuously monitors and rebalances to maximize returns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Strategy Legend - Show when positions exist */}
        {hasPositions && (
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">Strategy Types:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 font-medium border border-emerald-200">
                    🛡️ Safe
                  </span>
                  <span className="text-gray-500">Low risk, stable APY</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-purple-100 text-purple-700 font-medium border border-purple-200">
                    ⚡ Degen
                  </span>
                  <span className="text-gray-500">High risk, high APY</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
