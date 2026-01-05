import { useEffect, useState } from 'react';
import { useGetOpportunities } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';

type StrategyType = 'safe' | 'degen';

export function OpportunitiesPanel() {
  const { isConnected, currentChainId } = useZyfai();
  const { fetchSafeOpportunities, fetchDegenStrategies, safeOpportunities, degenStrategies, isPending, error } = useGetOpportunities();
  const [activeTab, setActiveTab] = useState<StrategyType>('safe');

  useEffect(() => {
    if (isConnected && currentChainId) {
      fetchSafeOpportunities();
      fetchDegenStrategies();
    }
  }, [isConnected, currentChainId]);

  if (!isConnected) {
    return null;
  }

  const safeData = safeOpportunities?.data || [];
  const degenData = degenStrategies?.data || [];
  const displayData = activeTab === 'safe' ? safeData : degenData;

  // Sort by APY descending
  const sortedData = [...displayData].sort((a: any, b: any) => (b.apy || 0) - (a.apy || 0));

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Yield Opportunities</h3>
      </div>

      <div className="px-5 py-5">
        {/* Strategy Type Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 mb-6">
          <button
            onClick={() => setActiveTab('safe')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'safe'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Safe Strategies
          </button>
          <button
            onClick={() => setActiveTab('degen')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'degen'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Degen Strategies
          </button>
        </div>

        {/* Loading State */}
        {isPending ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        ) : sortedData.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-sm text-gray-500">No {activeTab} opportunities available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Top 10 Opportunities */}
            {sortedData.slice(0, 10).map((opp: any, index: number) => (
              <div
                key={index}
                className="p-4 border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                      <h4 className="text-sm font-semibold text-gray-900">{opp.protocolName || 'Unknown Protocol'}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{opp.poolName || 'Pool'}</p>
                    {opp.tvl && (
                      <p className="text-xs text-gray-500">
                        TVL: ${(opp.tvl / 1_000_000).toFixed(2)}M
                      </p>
                    )}
                    {opp.status && activeTab === 'degen' && (
                      <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                        {opp.status}
                      </span>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${activeTab === 'safe' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {opp.apy.toFixed(2)}%
                    </div>
                    <p className="text-xs text-gray-500">APY</p>
                  </div>
                </div>
              </div>
            ))}

            {sortedData.length > 10 && (
              <p className="text-xs text-center text-gray-500 mt-4">
                + {sortedData.length - 10} more opportunities
              </p>
            )}
          </div>
        )}

        {/* Info Text */}
        <div className={`mt-6 p-3 border-l-4 ${activeTab === 'safe' ? 'bg-emerald-50 border-emerald-500' : 'bg-amber-50 border-amber-500'}`}>
          <p className="text-xs text-gray-700">
            {activeTab === 'safe'
              ? '✅ Safe strategies focus on established protocols with lower risk and stable yields.'
              : '⚠️ Degen strategies offer higher potential returns but come with increased risk. DYOR!'}
          </p>
        </div>
      </div>
    </div>
  );
}
