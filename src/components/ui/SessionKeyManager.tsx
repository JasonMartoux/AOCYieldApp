import { useState } from 'react';
import { useCreateSessionKey } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';

export function SessionKeyManager() {
  const { isConnected, isDeployed, hasSessionKey } = useZyfai();
  const { createSessionKey, isPending, error, sessionKeyData } = useCreateSessionKey();

  const handleCreateSessionKey = async () => {
    try {
      await createSessionKey();
    } catch (error) {
      console.error('Failed to create session key:', error);
    }
  };

  if (!isConnected || !isDeployed) {
    return null;
  }

  // Don't show if already has session key
  if (hasSessionKey) {
    return null;
  }

  return (
    <div className="bg-white border border-blue-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-blue-50 border-b border-blue-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
            Enable Gasless Transactions
          </h3>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-3">
            Create a session key to enable Zyfai's automated yield optimization. This allows the protocol to:
          </p>
          <ul className="space-y-2 text-xs text-gray-600 ml-4">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Automatically invest your funds across high-yield DeFi protocols</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Rebalance positions to maximize returns</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Execute transactions without gas fees</span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-red-700">{error.message}</p>
            </div>
          </div>
        )}

        {sessionKeyData && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs font-medium text-green-700">Session key created successfully!</p>
                <p className="text-xs text-green-600 mt-1">You can now deposit funds to start earning yield.</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCreateSessionKey}
          disabled={isPending}
          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Creating Session Key...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
              <span>Create Session Key</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          This is a one-time setup. The session key will be stored securely in your Safe wallet.
        </p>
      </div>
    </div>
  );
}
