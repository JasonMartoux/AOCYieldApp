export default function Risks() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Risk Disclosure</h1>
        <p className="text-lg text-gray-600 mb-12">
          Here's everything that could go wrong. We won't sugarcoat it.
        </p>

        {/* High Risk */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-red-600 mb-6">High Risk</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Contract Risk
              </h3>
              <p className="text-gray-700 mb-4">
                The protocols we use (Aave, Compound, Morpho, etc.) are built with smart contracts.
                These contracts could have bugs or vulnerabilities that lead to loss of funds.
              </p>
              <div className="text-sm text-gray-600">
                <strong>What we do:</strong> We only use audited protocols with proven track records.
                But audits don't guarantee safety.
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Loss of Funds
              </h3>
              <p className="text-gray-700 mb-4">
                You could lose some or all of your deposited funds due to:
                hacks, exploits, protocol failures, or economic attacks.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Reality check:</strong> DeFi has seen billions lost to hacks.
                Only deposit what you can afford to lose.
              </div>
            </div>
          </div>
        </section>

        {/* Medium Risk */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-600 mb-6">Medium Risk</h2>

          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                APY Variability
              </h3>
              <p className="text-gray-700 mb-4">
                The yields you see today will change. Sometimes dramatically.
                Market conditions, protocol changes, and user behavior all affect rates.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Example:</strong> A protocol offering 15% APY today might drop to 3% tomorrow.
                Past performance means nothing.
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stablecoin De-pegging
              </h3>
              <p className="text-gray-700 mb-4">
                USDC and USDT are supposed to be worth $1. But they could lose their peg during extreme market events.
              </p>
              <div className="text-sm text-gray-600">
                <strong>History:</strong> USDC briefly de-pegged to $0.88 in March 2023 during the Silicon Valley Bank crisis.
                It recovered, but it could happen again.
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Withdrawal Delays
              </h3>
              <p className="text-gray-700 mb-4">
                During high network congestion or protocol stress, withdrawals might:
                take longer than expected, cost more in gas fees, or be temporarily paused.
              </p>
            </div>
          </div>
        </section>

        {/* Low Risk */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Lower Risk (But Still Real)</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Opportunity Cost
              </h3>
              <p className="text-gray-700">
                By depositing here, you might miss out on better opportunities elsewhere.
                DeFi moves fast, and the best yields change constantly.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Complexity Risk
              </h3>
              <p className="text-gray-700">
                This system involves multiple layers: your wallet, our contracts, the protocols we use.
                More complexity = more things that could go wrong.
              </p>
            </div>
          </div>
        </section>

        {/* What We Don't Cover */}
        <section className="mb-12">
          <div className="bg-gray-900 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">What We Don't Cover</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• We don't insure your deposits</li>
              <li>• We can't guarantee any specific returns</li>
              <li>• We're not liable for protocol failures or hacks</li>
              <li>• We don't provide financial, tax, or legal advice</li>
              <li>• We can't reverse transactions on the blockchain</li>
            </ul>
          </div>
        </section>

        {/* Final Warning */}
        <section>
          <div className="bg-red-900 text-white p-8 border-4 border-red-600">
            <h2 className="text-2xl font-bold mb-4">Before You Deposit</h2>
            <div className="space-y-3 text-red-100">
              <p className="text-lg font-semibold">
                ⚠️ Only deposit money you can afford to lose completely.
              </p>
              <p>
                ⚠️ This is experimental technology. Treat it like a high-risk investment.
              </p>
              <p>
                ⚠️ Don't trust us or anyone else blindly. Do your own research (DYOR).
              </p>
              <p>
                ⚠️ If you don't understand how this works, don't use it.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
