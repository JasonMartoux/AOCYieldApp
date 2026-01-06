import { useEffect, useState } from 'react';
import { useGetApyHistory } from '../../hooks/useZyfaiOperations';

type Period = '7D' | '14D' | '30D';

export function ApyHistory() {
  const { fetchApyHistory, apyHistory, isPending } = useGetApyHistory();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30D');

  // Fetch APY history on mount and when period changes
  useEffect(() => {
    fetchApyHistory(selectedPeriod);
  }, [selectedPeriod]);

  // Debug: log the APY history data
  useEffect(() => {
    if (apyHistory) {
      console.log('📊 APY History Data:', JSON.stringify(apyHistory, null, 2));
    }
  }, [apyHistory]);

  const periods: { value: Period; label: string }[] = [
    { value: '7D', label: '7 Days' },
    { value: '14D', label: '14 Days' },
    { value: '30D', label: '30 Days' },
  ];

  const averageApy = apyHistory?.averageWeightedApy || 0;

  return (
    <div className="bg-white border border-gray-300">
      <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Historical APY
          </h2>

          {/* Period Selector */}
          <div className="flex gap-1 bg-gray-100 p-0.5">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {isPending ? (
          <div className="text-center py-8 text-sm text-gray-500">
            Loading APY history...
          </div>
        ) : apyHistory && apyHistory.totalDays > 0 ? (
          <div className="space-y-4">
            {/* Average APY Display */}
            <div className="text-center py-6 bg-gray-50 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">
                Average Weighted APY ({selectedPeriod})
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {averageApy.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Based on {apyHistory.totalDays} days of data
              </div>
            </div>

            {/* Optional: Show last few days */}
            {apyHistory.history && Object.keys(apyHistory.history).length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Recent Daily APY
                </div>
                <div className="space-y-1">
                  {Object.entries(apyHistory.history)
                    .slice(-5)
                    .reverse()
                    .map(([date, entry]: [string, any]) => {
                      // Try to get APY from various possible fields
                      let apyValue = 'N/A';
                      if (typeof entry === 'object' && entry !== null) {
                        const apy = entry.weightedApy ?? entry.apy ?? entry.weighted_apy ?? null;
                        if (apy !== null && apy !== undefined) {
                          apyValue = `${Number(apy).toFixed(2)}%`;
                        }
                      } else if (typeof entry === 'number') {
                        apyValue = `${entry.toFixed(2)}%`;
                      }

                      return (
                        <div
                          key={date}
                          className="flex justify-between items-center text-xs py-1.5 border-b border-gray-100"
                        >
                          <span className="text-gray-600">{date}</span>
                          <span className="font-mono text-gray-900">{apyValue}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm font-medium text-gray-700 mb-1">No APY History Yet</p>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Historical APY data will be available after your first deposit is invested.
              This typically takes 5-15 minutes after depositing.
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <p>
          Weighted APY accounts for the amount deployed in each protocol. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}
