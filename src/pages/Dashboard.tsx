import { useState, useEffect } from 'react';
import { useZyfai } from '../contexts/ZyfaiContext';
import { ConnectPrompt } from '../components/ui/ConnectPrompt';
import { WalletDetails } from '../components/dashboard/WalletDetails';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { ActionPanel } from '../components/dashboard/ActionPanel';
import { PositionsList } from '../components/dashboard/PositionsList';

export default function Dashboard() {
  const { isConnected: zyfaiConnected, connectZyfaiManually } = useZyfai();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Only show prompt if not connected to Zyfai
  useEffect(() => {
    if (!zyfaiConnected) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [zyfaiConnected]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectZyfaiManually();
      setShowPrompt(false);
    } catch (error) {
      console.error('Failed to connect Zyfai:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  // If not connected to Zyfai, show setup prompt
  if (!zyfaiConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        {showPrompt ? (
          <ConnectPrompt
            onConnect={handleConnect}
            onCancel={handleCancel}
            isConnecting={isConnecting}
          />
        ) : (
          <div className="bg-white border border-gray-300 p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Smart Wallet Setup Required
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You need to deploy a Smart Wallet to deposit funds and start earning.
            </p>
            <button
              onClick={() => setShowPrompt(true)}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            >
              Set Up Smart Wallet
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full dashboard for connected users
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Section: Summary + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AccountSummary />
        </div>
        <div>
          <WalletDetails />
        </div>
      </div>

      {/* Middle Section: Deposit/Withdraw */}
      <ActionPanel />

      {/* Bottom Section: Positions */}
      <PositionsList />

      {/* Disclaimers */}
      <div className="bg-gray-50 border border-gray-300 p-4">
        <p className="text-xs text-gray-600">
          <strong>Important:</strong> APY rates are not guaranteed and change based on market conditions.
          Past performance does not indicate future results. We charge a 10% performance fee on earnings only.
          Your deposits are not insured. Only invest what you can afford to lose.{' '}
          <a href="/risks" className="underline hover:text-gray-900">
            Read full risk disclosure
          </a>
        </p>
      </div>
    </div>
  );
}
