export default function Fees() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Fee Structure</h1>
        <p className="text-lg opacity-80 mb-12">
          Exactly what you'll pay. No hidden fees, no surprises.
        </p>

        {/* Fee Breakdown */}
        <section className="mb-12">
          <div className="card card-bordered shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">What You Pay</h2>

              <div className="space-y-6">
                {/* Deposit Fee */}
                <div className="flex items-start justify-between border-b border-base-300 pb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Deposit Fee</h3>
                    <p className="text-sm opacity-70">
                      No charge to add funds to your Smart Wallet.
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-success">FREE</div>
                </div>

                {/* Withdrawal Fee */}
                <div className="flex items-start justify-between border-b border-base-300 pb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Withdrawal Fee</h3>
                    <p className="text-sm opacity-70">
                      No charge to remove your funds at any time.
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-success">FREE</div>
                </div>

                {/* Performance Fee */}
                <div className="flex items-start justify-between border-b border-base-300 pb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Performance Fee</h3>
                    <p className="text-sm opacity-70">
                      You keep 100% of your earnings. No performance fee charged.
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-success">FREE</div>
                </div>

                {/* Gas Fees */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Gas Fees (One-Time)</h3>
                    <p className="text-sm opacity-70">
                      Blockchain transaction costs to deploy your Smart Wallet. You pay this to the network, not to us.
                    </p>
                  </div>
                  <div className="text-2xl font-bold">~$2-5</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Real Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Small Investment */}
            <div className="card card-bordered border-2 border-success shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Small Investment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">You deposit:</span>
                    <span className="font-semibold">$500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Earn 10% APY over 1 year:</span>
                    <span className="font-semibold">$50</span>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>You keep:</span>
                    <span className="text-success">$550</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Large Investment */}
            <div className="card card-bordered border-2 border-success shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Large Investment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">You deposit:</span>
                    <span className="font-semibold">$10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Earn 12% APY over 1 year:</span>
                    <span className="font-semibold">$1,200</span>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>You keep:</span>
                    <span className="text-success">$11,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The "Gasless" Truth */}
        <section className="mb-12">
          <div className="alert alert-info shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">About "Gasless" Transactions</h3>
              <p className="text-sm">
                After the one-time Smart Wallet setup (~$2-5), most transactions are gasless.
                This means you won't pay network fees for deposits, withdrawals, or rebalancing.
              </p>
              <p className="text-sm mt-2">
                <strong>How it works:</strong> We use ERC-4337 account abstraction and sponsor gas fees on your behalf.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How We Compare</h2>

          <div className="card card-bordered shadow-xl">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Performance Fee</th>
                    <th>Other Fees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-success bg-opacity-20">
                    <td className="font-bold">AOC Yield (Us)</td>
                    <td className="text-success font-bold">0%</td>
                    <td>~$2-5 setup (one-time)</td>
                  </tr>
                  <tr>
                    <td>Yearn Finance</td>
                    <td>20%</td>
                    <td>Gas fees per transaction</td>
                  </tr>
                  <tr>
                    <td>Beefy Finance</td>
                    <td>4.5%</td>
                    <td>0.1% withdrawal + gas fees</td>
                  </tr>
                  <tr>
                    <td>Traditional Savings</td>
                    <td>0%</td>
                    <td>0.5-2% APY (you earn less)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs opacity-60 mt-2">
            * Comparison data approximate as of 2024. Competitor fees may change.
          </p>
        </section>

        {/* Final Notes */}
        <section>
          <div className="card card-bordered border-2 border-neutral shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">What We Don't Charge For</h2>
              <ul className="space-y-2">
                <li>✓ Viewing your portfolio</li>
                <li>✓ Checking APY rates</li>
                <li>✓ Automatic rebalancing</li>
                <li>✓ Support and documentation</li>
                <li>✓ Withdrawing your funds</li>
              </ul>

              <div className="divider"></div>
              <p className="text-sm opacity-70">
                <strong>Bottom line:</strong> You keep 100% of your earnings.
                Zero performance fees. Simple as that.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
