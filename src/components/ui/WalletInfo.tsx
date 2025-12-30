import { useWallet, useModal } from "@getpara/react-sdk";

export function WalletInfo() {
  const { data: wallet } = useWallet();
  const { closeModal, logout } = useModal();
  const address = wallet?.address;

  if (!address) return null;

  const handleDisconnect = () => {
    logout();
    closeModal();
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Connected Wallet</h3>
        <button
          onClick={handleDisconnect}
          className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
          title="Disconnect wallet"
        >
          Disconnect
        </button>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Address</p>
          <button
            onClick={() => navigator.clipboard.writeText(address)}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            title="Copy address"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <p className="text-sm font-mono text-gray-900 tracking-tight">
          {address.slice(0, 6)}···{address.slice(-4)}
        </p>
      </div>
    </div>
  );
}