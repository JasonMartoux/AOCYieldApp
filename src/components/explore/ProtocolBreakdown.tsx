export function ProtocolBreakdown() {
  const protocols = [
    {
      name: 'Morpho',
      apy: '8.2%',
      tvl: '$124M',
      risk: 'Low',
      riskBadge: 'badge-success',
    },
    {
      name: 'Aave',
      apy: '7.8%',
      tvl: '$2.1B',
      risk: 'Low',
      riskBadge: 'badge-success',
    },
    {
      name: 'Compound',
      apy: '7.5%',
      tvl: '$980M',
      risk: 'Low',
      riskBadge: 'badge-success',
    },
  ];

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
              {protocols.map((protocol) => (
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
              ))}
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
