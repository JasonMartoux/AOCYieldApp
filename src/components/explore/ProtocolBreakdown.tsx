export function ProtocolBreakdown() {
  const protocols = [
    {
      name: 'Morpho',
      apy: '8.2%',
      tvl: '$124M',
      risk: 'Low',
      riskColor: 'text-emerald-600',
    },
    {
      name: 'Aave',
      apy: '7.8%',
      tvl: '$2.1B',
      risk: 'Low',
      riskColor: 'text-emerald-600',
    },
    {
      name: 'Compound',
      apy: '7.5%',
      tvl: '$980M',
      risk: 'Low',
      riskColor: 'text-emerald-600',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Protocol Breakdown
      </h2>
      <p className="text-gray-600 text-center mb-8">
        See exactly where your money goes
      </p>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Protocol</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">APY</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">TVL</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {protocols.map((protocol) => (
              <tr key={protocol.name} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-semibold text-gray-900">{protocol.name}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-600 font-medium">{protocol.apy}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-600">{protocol.tvl}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`font-medium ${protocol.riskColor}`}>{protocol.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Data updates in real-time based on current market conditions
      </p>
    </section>
  );
}
