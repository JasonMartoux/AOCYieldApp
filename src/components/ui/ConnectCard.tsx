interface ConnectCardProps {
  onConnect: () => void;
}

export function ConnectCard({ onConnect }: ConnectCardProps) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-12 animate-slide-in">
      <div className="text-center max-w-sm mx-auto">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold mb-3 tracking-tight">Connect Your Wallet</h2>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          Connect your wallet to access yield optimization across multiple chains. Supports EVM, Solana, and Cosmos networks.
        </p>

        <button
          onClick={onConnect}
          data-testid="auth-connect-button"
          className="w-full px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-all hover:shadow-md"
        >
          Connect Wallet
        </button>

        <p className="mt-6 text-xs text-gray-500">
          Powered by Para SDK
        </p>
      </div>
    </div>
  );
}