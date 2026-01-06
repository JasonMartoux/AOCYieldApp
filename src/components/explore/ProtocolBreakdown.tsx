import { useEffect, useState } from 'react';
import { useGetOpportunities } from '../../hooks/useZyfaiOperations';

interface Protocol {
  name: string;
  apy: string;
  tvl: string;
  risk: string;
  riskBadge: string;
}

export function ProtocolBreakdown() {
  const { fetchSafeOpportunities, safeOpportunities, isPending, sdk } = useGetOpportunities();
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  // Fetch opportunities when SDK is ready
  useEffect(() => {
    if (sdk) {
      fetchSafeOpportunities(8453); // Base chain
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk]);

  // Process opportunities to extract top protocols
  useEffect(() => {
    if (safeOpportunities && safeOpportunities.data && safeOpportunities.data.length > 0) {
      // Filter only live opportunities
      const liveOpportunities = safeOpportunities.data.filter((opp: any) => opp.status === 'live');

      if (liveOpportunities.length > 0) {
        // Group by protocol name and get the best APY for each
        const protocolMap = new Map<string, { apy: number; tvl: number }>();

        liveOpportunities.forEach((opp: any) => {
          const protocolName = opp.protocolName || 'Unknown';
          const existing = protocolMap.get(protocolName);

          if (!existing || opp.apy > existing.apy) {
            protocolMap.set(protocolName, {
              apy: opp.apy,
              tvl: opp.tvl || 0,
            });
          }
        });

        // Convert to array and sort by APY
        const protocolsArray = Array.from(protocolMap.entries())
          .map(([name, data]) => ({
            name,
            apy: `${data.apy.toFixed(2)}%`,
            tvl: data.tvl > 0 ? `$${(data.tvl / 1e6).toFixed(1)}M` : 'N/A',
            risk: 'Low',
            riskBadge: 'badge-success',
          }))
          .sort((a, b) => parseFloat(b.apy) - parseFloat(a.apy))
          .slice(0, 5); // Top 5 protocols

        setProtocols(protocolsArray);
      }
    }
  }, [safeOpportunities]);

  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Protocol Breakdown
      </h2>
      <p className="opacity-70 text-center mb-8">
        See exactly where your money goes
      </p>

      <div className="card card-bordered shadow-xl">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Protocol</th>
                <th>APY</th>
                <th>TVL</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {isPending && protocols.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-md text-success"></span>
                      <span className="opacity-70">Loading protocols...</span>
                    </div>
                  </td>
                </tr>
              ) : protocols.length > 0 ? (
                protocols.map((protocol) => (
                  <tr key={protocol.name} className="hover">
                    <td>
                      <span className="font-semibold">{protocol.name}</span>
                    </td>
                    <td>
                      <span className="text-success font-medium">{protocol.apy}</span>
                    </td>
                    <td>
                      <span className="opacity-70">{protocol.tvl}</span>
                    </td>
                    <td>
                      <span className={`badge ${protocol.riskBadge}`}>{protocol.risk}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 opacity-70">
                    No protocol data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs opacity-60 mt-4 text-center">
        Data updates in real-time based on current market conditions
      </p>
    </section>
  );
}
