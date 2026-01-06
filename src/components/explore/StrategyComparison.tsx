import { useEffect, useState } from 'react';
import { useGetOpportunities } from '../../hooks/useZyfaiOperations';

export function StrategyComparison() {
  const { fetchSafeOpportunities, fetchDegenStrategies, safeOpportunities, degenStrategies, isPending, sdk } = useGetOpportunities();
  const [safeAvgApy, setSafeAvgApy] = useState<number | null>(null);
  const [degenAvgApy, setDegenAvgApy] = useState<number | null>(null);

  // Fetch opportunities when SDK is ready
  useEffect(() => {
    if (sdk) {
      fetchSafeOpportunities(8453); // Base chain
      fetchDegenStrategies(8453); // Base chain
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk]);

  // Calculate average APY for Safe Strategy
  useEffect(() => {
    if (safeOpportunities && safeOpportunities.data && safeOpportunities.data.length > 0) {
      // Filter only live opportunities
      const liveOpportunities = safeOpportunities.data.filter((opp: any) => opp.status === 'live');
      if (liveOpportunities.length > 0) {
        const totalApy = liveOpportunities.reduce((sum: number, opp: any) => sum + opp.apy, 0);
        const avgApy = totalApy / liveOpportunities.length;
        setSafeAvgApy(avgApy);
      }
    }
  }, [safeOpportunities]);

  // Calculate average APY for Degen Strategy
  useEffect(() => {
    if (degenStrategies && degenStrategies.data && degenStrategies.data.length > 0) {
      // Filter only live strategies
      const liveStrategies = degenStrategies.data.filter((strat: any) => strat.status === 'live');
      if (liveStrategies.length > 0) {
        const totalApy = liveStrategies.reduce((sum: number, strat: any) => sum + strat.apy, 0);
        const avgApy = totalApy / liveStrategies.length;
        setDegenAvgApy(avgApy);
      }
    }
  }, [degenStrategies]);

  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Choose Your Strategy
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Safe Strategy */}
        <div className="card card-bordered border-2 border-success hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="card-title text-xl">Safe Strategy</h3>
              </div>
              <span className="badge badge-success badge-lg">Recommended</span>
            </div>

            <div className="mb-4">
              {isPending && !safeAvgApy ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm text-success"></span>
                  <span className="text-lg opacity-70">Loading...</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-success mb-1">
                    {safeAvgApy ? `${safeAvgApy.toFixed(1)}%` : '8-12%'}
                  </div>
                  <div className="text-sm opacity-60">Average APY</div>
                </>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Low risk protocols only</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Established protocols (Aave, Compound)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>High liquidity</span>
              </div>
            </div>

            <div className="divider my-2"></div>
            <p className="text-xs opacity-70">
              Best for: Conservative investors who prioritize safety over maximum yield
            </p>
          </div>
        </div>

        {/* Degen Strategy */}
        <div className="card card-bordered border-2 border-warning hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                <h3 className="card-title text-xl">Degen Strategy</h3>
              </div>
              <span className="badge badge-warning badge-lg">High Risk</span>
            </div>

            <div className="mb-4">
              {isPending && !degenAvgApy ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm text-warning"></span>
                  <span className="text-lg opacity-70">Loading...</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-warning mb-1">
                    {degenAvgApy ? `${degenAvgApy.toFixed(1)}%` : '15-25%'}
                  </div>
                  <div className="text-sm opacity-60">Average APY</div>
                </>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Higher risk, higher rewards</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Newer protocols included</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>More volatile returns</span>
              </div>
            </div>

            <div className="divider my-2"></div>
            <p className="text-xs opacity-70">
              Best for: Risk-tolerant investors seeking maximum yield. Only invest what you can lose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
