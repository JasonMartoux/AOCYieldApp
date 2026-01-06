import { useState, useEffect } from 'react';
import { useZyfai } from '../contexts/ZyfaiContext';
import { ConnectPrompt } from '../components/ui/ConnectPrompt';
import { WalletDetails } from '../components/dashboard/WalletDetails';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { ActionPanel } from '../components/dashboard/ActionPanel';
import { PositionsList } from '../components/dashboard/PositionsList';
import { ApyHistory } from '../components/dashboard/ApyHistory';

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
          <div className="card card-bordered shadow-xl">
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-lg mb-2">
                Smart Wallet Setup Required
              </h3>
              <p className="text-sm opacity-70 mb-4">
                You need to deploy a Smart Wallet to deposit funds and start earning.
              </p>
              <button
                onClick={() => setShowPrompt(true)}
                className="btn btn-primary"
              >
                Set Up Smart Wallet
              </button>
            </div>
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

      {/* Bottom Section: Positions & APY History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PositionsList />
        </div>
        <div>
          <ApyHistory />
        </div>
      </div>

      {/* Disclaimers */}
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm">
            <strong>Important:</strong> APY rates are not guaranteed and change based on market conditions.
            Past performance does not indicate future results.
            Your deposits are not insured. Only invest what you can afford to lose.{' '}
            <a href="/risks" className="link link-hover font-semibold">
              Read full risk disclosure
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
