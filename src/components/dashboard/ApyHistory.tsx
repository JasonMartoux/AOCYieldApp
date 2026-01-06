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
    <div className="card card-bordered shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-base uppercase tracking-wide">
            Historical APY
          </h2>

          {/* Period Selector */}
          <div className="join">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`btn btn-sm join-item ${
                  selectedPeriod === period.value ? 'btn-active' : ''
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {isPending ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : apyHistory && apyHistory.totalDays > 0 ? (
          <div className="space-y-4">
            {/* Average APY Display */}
            <div className="stats shadow w-full">
              <div className="stat place-items-center">
                <div className="stat-title text-sm">Average Weighted APY ({selectedPeriod})</div>
                <div className="stat-value text-primary text-2xl">{averageApy.toFixed(2)}%</div>
                <div className="stat-desc text-sm">Based on {apyHistory.totalDays} days of data</div>
              </div>
            </div>

            {/* Optional: Show last few days */}
            {apyHistory.history && Object.keys(apyHistory.history).length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-bold opacity-70 mb-2 uppercase tracking-wide">
                  Recent Daily APY
                </div>
                <div className="overflow-x-auto">
                  <table className="table">
                    <tbody>
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
                            <tr key={date}>
                              <td className="opacity-70 text-sm">{date}</td>
                              <td className="text-right font-mono text-base">{apyValue}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold text-base">No APY History Yet</h3>
              <div className="text-sm opacity-80">
                Historical APY data will be available after your first deposit is invested.
                This typically takes 5-15 minutes after depositing.
              </div>
            </div>
          </div>
        )}

        <div className="divider my-2"></div>
        <div className="text-sm opacity-60">
          <p>
            Weighted APY accounts for the amount deployed in each protocol. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
}
