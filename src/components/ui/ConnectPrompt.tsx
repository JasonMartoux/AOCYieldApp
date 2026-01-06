interface ConnectPromptProps {
  onConnect: () => void;
  onCancel: () => void;
  isConnecting?: boolean;
}

export function ConnectPrompt({ onConnect, onCancel, isConnecting }: ConnectPromptProps) {
  return (
    <div className="alert alert-info shadow-lg">
      <div className="w-full">
        <div className="flex items-start gap-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">
              Ready to Set Up Your Smart Wallet?
            </h3>
            <p className="text-sm mb-4">
              To deposit funds and earn yield, you need to deploy a Smart Wallet. Here's what will happen:
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <div className="badge badge-success badge-sm mt-1">✓</div>
                <div className="text-sm">
                  <div className="font-semibold">1. Sign a Message</div>
                  <div className="opacity-80">
                    We'll ask you to sign a message to prove you own your wallet (no transaction, no gas fees)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="badge badge-success badge-sm mt-1">✓</div>
                <div className="text-sm">
                  <div className="font-semibold">2. Deploy Smart Wallet</div>
                  <div className="opacity-80">
                    We'll create a Safe Smart Wallet on the Base network (~$2-5 in gas fees, one-time)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="badge badge-success badge-sm mt-1">✓</div>
                <div className="text-sm">
                  <div className="font-semibold">3. You're Ready</div>
                  <div className="opacity-80">
                    Once deployed, you can deposit funds and start earning yield
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-bordered mb-4">
              <div>
                <div className="text-xs font-bold mb-1">
                  What's a Smart Wallet?
                </div>
                <div className="text-xs opacity-80">
                  It's a secure, programmable wallet that enables gasless transactions and automated yield optimization.
                  You maintain full control - we can't access your funds without your permission.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="btn btn-primary flex-1"
              >
                {isConnecting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Setting up...
                  </>
                ) : (
                  'Set Up Smart Wallet'
                )}
              </button>
              <button
                onClick={onCancel}
                disabled={isConnecting}
                className="btn btn-outline"
              >
                Not Yet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
