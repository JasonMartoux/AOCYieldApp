interface ConnectPromptProps {
  onConnect: () => void;
  onCancel: () => void;
  isConnecting?: boolean;
}

export function ConnectPrompt({ onConnect, onCancel, isConnecting }: ConnectPromptProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Set Up Your Smart Wallet?
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            To deposit funds and earn yield, you need to deploy a Smart Wallet. Here's what will happen:
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">1. Sign a Message</div>
                <div className="text-gray-600">
                  We'll ask you to sign a message to prove you own your wallet (no transaction, no gas fees)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">2. Deploy Smart Wallet</div>
                <div className="text-gray-600">
                  We'll create a Safe Smart Wallet on the Base network (~$2-5 in gas fees, one-time)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">3. You're Ready</div>
                <div className="text-gray-600">
                  Once deployed, you can deposit funds and start earning yield
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 border border-blue-300 mb-4">
            <div className="text-xs font-semibold text-gray-900 mb-1">
              What's a Smart Wallet?
            </div>
            <div className="text-xs text-gray-700">
              It's a secure, programmable wallet that enables gasless transactions and automated yield optimization.
              You maintain full control - we can't access your funds without your permission.
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Setting up...
                </span>
              ) : (
                'Set Up Smart Wallet'
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={isConnecting}
              className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Not Yet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
