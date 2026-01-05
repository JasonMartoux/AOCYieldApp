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
          <div className="text-center py-8 text-sm text-gray-500">
            No APY history available yet.
            <p className="text-xs mt-1">Historical data will appear after deposits are made.</p>
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
