export function HowItWorks() {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-bordered shadow-xl">
          <div className="card-body">
            <div className="text-3xl font-bold text-success mb-2">1</div>
            <h3 className="card-title text-lg mb-2">Connect</h3>
            <p className="text-sm opacity-70">
              Connect with email, social login, or your existing wallet. No complicated setup.
            </p>
          </div>
        </div>

        <div className="card card-bordered shadow-xl">
          <div className="card-body">
            <div className="text-3xl font-bold text-success mb-2">2</div>
            <h3 className="card-title text-lg mb-2">Deposit</h3>
            <p className="text-sm opacity-70">
              Send USDC to your Smart Wallet. We'll automatically find the best yields.
            </p>
          </div>
        </div>

        <div className="card card-bordered shadow-xl">
          <div className="card-body">
            <div className="text-3xl font-bold text-success mb-2">3</div>
            <h3 className="card-title text-lg mb-2">Earn</h3>
            <p className="text-sm opacity-70">
              Your funds earn optimized returns. Withdraw anytime, no lock-ups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
