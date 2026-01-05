import { useWallet, useLogout, useModal } from '@getpara/react-sdk';
import { useZyfai } from '../../contexts/ZyfaiContext';

export function WalletDetails() {
  const { data: wallet } = useWallet();
  const { logout } = useLogout();
  const { closeModal } = useModal();
  const { smartWalletAddress, isDeployed, currentChainId } = useZyfai();

  const handleDisconnect = () => {
    logout();
    closeModal();
  };

  const chainNames = {
    8453: 'Base',
    42161: 'Arbitrum',
    9745: 'Plasma',
  };

  return (
    <div className="bg-white border border-gray-300">
      <div className="border-b border-gray-300 px-4 py-3 bg-gray-50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Wallet Details
        </h2>
        <button
          onClick={handleDisconnect}
          className="text-xs text-red-600 hover:text-red-700 font-medium"
        >
          Disconnect
        </button>
      </div>

      <div className="p-4">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 text-gray-600 w-32">Your Wallet</td>
              <td className="py-2 text-right">
                <code className="text-xs bg-gray-100 px-2 py-1 font-mono text-gray-900">
                  {wallet?.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : '—'}
                </code>
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600">Smart Wallet</td>
              <td className="py-2 text-right">
                {smartWalletAddress ? (
                  <code className="text-xs bg-gray-100 px-2 py-1 font-mono text-gray-900">
                    {smartWalletAddress.slice(0, 6)}...{smartWalletAddress.slice(-4)}
                  </code>
                ) : (
                  <span className="text-xs text-gray-500">Not deployed</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600">Network</td>
              <td className="py-2 text-right font-medium text-gray-900">
                {currentChainId && chainNames[currentChainId as keyof typeof chainNames]
                  ? chainNames[currentChainId as keyof typeof chainNames]
                  : 'Unknown'}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600">Status</td>
              <td className="py-2 text-right">
                {isDeployed ? (
                  <span className="text-xs font-semibold text-green-700">Active</span>
                ) : (
                  <span className="text-xs font-semibold text-amber-600">Setup Required</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
