export default function Risks() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Risk Disclosure</h1>
        <p className="text-lg opacity-80 mb-12">
          Here's everything that could go wrong. We won't sugarcoat it.
        </p>

        {/* High Risk */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-error mb-6">High Risk</h2>

          <div className="space-y-6">
            <div className="alert alert-error shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <h3 className="font-bold">Smart Contract Risk</h3>
                <p className="text-sm">
                  The protocols we use (Aave, Compound, Morpho, etc.) are built with smart contracts.
                  These contracts could have bugs or vulnerabilities that lead to loss of funds.
                </p>
                <p className="text-sm mt-2">
                  <strong>What we do:</strong> We only use audited protocols with proven track records.
                  But audits don't guarantee safety.
                </p>
              </div>
            </div>

            <div className="alert alert-error shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <h3 className="font-bold">Loss of Funds</h3>
                <p className="text-sm">
                  You could lose some or all of your deposited funds due to:
                  hacks, exploits, protocol failures, or economic attacks.
                </p>
                <p className="text-sm mt-2">
                  <strong>Reality check:</strong> DeFi has seen billions lost to hacks.
                  Only deposit what you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medium Risk */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warning mb-6">Medium Risk</h2>

          <div className="space-y-6">
            <div className="alert alert-warning shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <h3 className="font-bold">APY Variability</h3>
                <p className="text-sm">
                  The yields you see today will change. Sometimes dramatically.
                  Market conditions, protocol changes, and user behavior all affect rates.
                </p>
                <p className="text-sm mt-2">
                  <strong>Example:</strong> A protocol offering 15% APY today might drop to 3% tomorrow.
                  Past performance means nothing.
                </p>
              </div>
            </div>

            <div className="alert alert-warning shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <h3 className="font-bold">Stablecoin De-pegging</h3>
                <p className="text-sm">
                  USDC and USDT are supposed to be worth $1. But they could lose their peg during extreme market events.
                </p>
                <p className="text-sm mt-2">
                  <strong>History:</strong> USDC briefly de-pegged to $0.88 in March 2023 during the Silicon Valley Bank crisis.
                  It recovered, but it could happen again.
                </p>
              </div>
            </div>

            <div className="alert alert-warning shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <h3 className="font-bold">Withdrawal Delays</h3>
                <p className="text-sm">
                  During high network congestion or protocol stress, withdrawals might:
                  take longer than expected, cost more in gas fees, or be temporarily paused.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Low Risk */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-info mb-6">Lower Risk (But Still Real)</h2>

          <div className="space-y-6">
            <div className="alert alert-info shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <h3 className="font-bold">Opportunity Cost</h3>
                <p className="text-sm">
                  By depositing here, you might miss out on better opportunities elsewhere.
                  DeFi moves fast, and the best yields change constantly.
                </p>
              </div>
            </div>

            <div className="alert alert-info shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <h3 className="font-bold">Complexity Risk</h3>
                <p className="text-sm">
                  This system involves multiple layers: your wallet, our contracts, the protocols we use.
                  More complexity = more things that could go wrong.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Don't Cover */}
        <section className="mb-12">
          <div className="card card-bordered border-2 border-neutral shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">What We Don't Cover</h2>
              <ul className="space-y-2">
                <li>• We don't insure your deposits</li>
                <li>• We can't guarantee any specific returns</li>
                <li>• We're not liable for protocol failures or hacks</li>
                <li>• We don't provide financial, tax, or legal advice</li>
                <li>• We can't reverse transactions on the blockchain</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final Warning */}
        <section>
          <div className="alert alert-error shadow-2xl border-4 border-error">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">Before You Deposit</h2>
              <div className="space-y-3">
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
          </div>
        </section>
      </div>
    </div>
  );
}
