export default function Fees() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fee Structure</h1>
        <p className="text-lg text-gray-600 mb-12">
          Exactly what you'll pay. No hidden fees, no surprises.
        </p>

        {/* Fee Breakdown */}
        <section className="mb-12">
          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Pay</h2>

            <div className="space-y-6">
              {/* Deposit Fee */}
              <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Deposit Fee</h3>
                  <p className="text-sm text-gray-600">
                    No charge to add funds to your Smart Wallet.
                  </p>
                </div>
                <div className="text-2xl font-bold text-emerald-600">FREE</div>
              </div>

              {/* Withdrawal Fee */}
              <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Withdrawal Fee</h3>
                  <p className="text-sm text-gray-600">
                    No charge to remove your funds at any time.
                  </p>
                </div>
                <div className="text-2xl font-bold text-emerald-600">FREE</div>
              </div>

              {/* Performance Fee */}
              <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Performance Fee</h3>
                  <p className="text-sm text-gray-600">
                    We take 10% of your earnings. That's it. If you don't profit, we don't profit.
                  </p>
                </div>
                <div className="text-2xl font-bold text-gray-900">10%</div>
              </div>

              {/* Gas Fees */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Gas Fees (One-Time)</h3>
                  <p className="text-sm text-gray-600">
                    Blockchain transaction costs to deploy your Smart Wallet. You pay this to the network, not to us.
                  </p>
                </div>
                <div className="text-2xl font-bold text-gray-900">~$2-5</div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Small Investment */}
            <div className="bg-emerald-50 border border-emerald-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Small Investment</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">You deposit:</span>
                  <span className="font-semibold">$500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Earn 10% APY over 1 year:</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className="flex justify-between border-t border-emerald-300 pt-2">
                  <span className="text-gray-600">Our 10% fee:</span>
                  <span className="font-semibold text-red-600">-$5</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t-2 border-emerald-600 pt-2">
                  <span>You keep:</span>
                  <span className="text-emerald-700">$545</span>
                </div>
              </div>
            </div>

            {/* Large Investment */}
            <div className="bg-emerald-50 border border-emerald-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Large Investment</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">You deposit:</span>
                  <span className="font-semibold">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Earn 12% APY over 1 year:</span>
                  <span className="font-semibold">$1,200</span>
                </div>
                <div className="flex justify-between border-t border-emerald-300 pt-2">
                  <span className="text-gray-600">Our 10% fee:</span>
                  <span className="font-semibold text-red-600">-$120</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t-2 border-emerald-600 pt-2">
                  <span>You keep:</span>
                  <span className="text-emerald-700">$11,080</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The "Gasless" Truth */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About "Gasless" Transactions
            </h3>
            <p className="text-gray-700 mb-4">
              After the one-time Smart Wallet setup (~$2-5), most transactions are gasless.
              This means you won't pay network fees for deposits, withdrawals, or rebalancing.
            </p>
            <p className="text-gray-700">
              <strong>How it works:</strong> We use ERC-4337 account abstraction and sponsor gas fees
              on your behalf. This is covered by our 10% performance fee.
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Compare</h2>

          <div className="bg-white border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance Fee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Other Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-emerald-50">
                  <td className="py-3 px-4 font-semibold">AOC Yield (Us)</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4">~$2-5 setup (one-time)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Yearn Finance</td>
                  <td className="py-3 px-4">20%</td>
                  <td className="py-3 px-4">Gas fees per transaction</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Beefy Finance</td>
                  <td className="py-3 px-4">4.5%</td>
                  <td className="py-3 px-4">0.1% withdrawal + gas fees</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Traditional Savings</td>
                  <td className="py-3 px-4">0%</td>
                  <td className="py-3 px-4">0.5-2% APY (you earn less)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            * Comparison data approximate as of 2024. Competitor fees may change.
          </p>
        </section>

        {/* Final Notes */}
        <section>
          <div className="bg-gray-900 text-white p-8">
            <h2 className="text-xl font-bold mb-4">What We Don't Charge For</h2>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Viewing your portfolio</li>
              <li>✓ Checking APY rates</li>
              <li>✓ Automatic rebalancing</li>
              <li>✓ Support and documentation</li>
              <li>✓ Withdrawing your funds</li>
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                <strong>Bottom line:</strong> We make money when you make money.
                If you lose money, we don't take a fee. Simple as that.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
