import { useZyfai } from '../../contexts/ZyfaiContext';
import { useDeploySafe } from '../../hooks/useZyfaiOperations';
import { ChainNames } from '../../types/zyfai';

export function SmartWalletInfo() {
  const { smartWalletAddress, isDeployed, isConnected, currentChainId } = useZyfai();
  const { deploySafe, isPending, error } = useDeploySafe();

  if (!isConnected) {
    return null;
  }

  const handleDeploy = async () => {
    try {
      await deploySafe();
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  const chainName = currentChainId ? ChainNames[currentChainId] : 'Unknown';

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Smart Wallet</h3>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Chain */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Network</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-gray-900">{chainName}</span>
          </div>
        </div>

        {/* Address */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Safe Address</p>
            {smartWalletAddress && (
              <button
                onClick={() => navigator.clipboard.writeText(smartWalletAddress)}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                title="Copy address"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm font-mono text-gray-900 tracking-tight break-all">
            {smartWalletAddress ? `${smartWalletAddress.slice(0, 10)}···${smartWalletAddress.slice(-8)}` : 'Not deployed'}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Status</p>
          {isDeployed ? (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Deployed
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Not Deployed
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200">
            <p className="text-xs text-red-700">{error.message}</p>
          </div>
        )}

        {/* Deploy Button */}
        {!isDeployed && (
          <button
            onClick={handleDeploy}
            disabled={isPending}
            className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-md"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deploying Safe...
              </span>
            ) : (
              'Deploy Smart Wallet'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
