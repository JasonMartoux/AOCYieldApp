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
    <div className="card card-bordered shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-base uppercase tracking-wide">
            Wallet Details
          </h2>
          <button onClick={handleDisconnect} className="btn btn-error btn-sm btn-outline">
            Disconnect
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              <tr>
                <td className="w-32 text-base">Your Wallet</td>
                <td className="text-right">
                  <code className="badge badge-ghost badge-lg font-mono text-sm">
                    {wallet?.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : '—'}
                  </code>
                </td>
              </tr>
              <tr>
                <td className="text-base">Smart Wallet</td>
                <td className="text-right">
                  {smartWalletAddress ? (
                    <code className="badge badge-ghost badge-lg font-mono text-sm">
                      {smartWalletAddress.slice(0, 6)}...{smartWalletAddress.slice(-4)}
                    </code>
                  ) : (
                    <span className="text-sm opacity-60">Not deployed</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-base">Network</td>
                <td className="text-right font-medium text-base">
                  {currentChainId && chainNames[currentChainId as keyof typeof chainNames]
                    ? chainNames[currentChainId as keyof typeof chainNames]
                    : 'Unknown'}
                </td>
              </tr>
              <tr>
                <td className="text-base">Status</td>
                <td className="text-right">
                  {isDeployed ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-warning">Setup Required</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
