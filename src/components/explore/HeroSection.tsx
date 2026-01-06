import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '@getpara/react-sdk';
import { ConnectButton } from '../ui/ConnectButton';
import { useGetOpportunities } from '../../hooks/useZyfaiOperations';

export function HeroSection() {
  const { isConnected } = useAccount();
  const { fetchSafeOpportunities, safeOpportunities, isPending, sdk } = useGetOpportunities();
  const [bestApy, setBestApy] = useState<number | null>(null);

  // Fetch opportunities when SDK is ready
  useEffect(() => {
    if (sdk) {
      fetchSafeOpportunities(8453); // Base chain
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk]);

  // Calculate best APY when data arrives
  useEffect(() => {
    
    if (safeOpportunities && safeOpportunities.data && safeOpportunities.data.length > 0) {
      // Filter only live opportunities
      const liveOpportunities = safeOpportunities.data.filter((opp: any) => opp.status === 'live');
      if (liveOpportunities.length > 0) {
        const sorted = [...liveOpportunities].sort((a, b) => b.apy - a.apy);
        setBestApy(sorted[0].apy);
      }
    }
  }, [safeOpportunities]);

  return (
    <section className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Earn More on Your Stablecoins
      </h1>
      <p className="text-xl opacity-80 mb-8">
        Simple. Transparent. Actually Safe.
      </p>

      <div className="card card-bordered shadow-xl mb-8">
        <div className="card-body">
          <div className="text-sm opacity-70 uppercase tracking-wide mb-2">
            Current Best APY (Live)
          </div>
          {isPending ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <span className="loading loading-spinner loading-lg text-success"></span>
              <span className="text-lg opacity-70">Loading rates...</span>
            </div>
          ) : bestApy ? (
            <>
              <div className="text-5xl font-bold text-success mb-2">
                {bestApy.toFixed(2)}%
              </div>
              <div className="text-sm opacity-80">
                Live rate from DeFi protocols on Base
              </div>
            </>
          ) : (
            <>
              <div className="text-5xl font-bold text-success mb-2">
                ~12%
              </div>
              <div className="text-sm opacity-80">
                Typical APY range (rates vary)
              </div>
            </>
          )}
        </div>
      </div>

      {isConnected ? (
        <Link to="/dashboard" className="btn btn-success btn-lg gap-2">
          Go to Dashboard →
        </Link>
      ) : (
        <div className="inline-block">
          <ConnectButton />
        </div>
      )}
    </section>
  );
}
