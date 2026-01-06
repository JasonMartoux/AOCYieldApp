import { useState, useEffect } from 'react';
import { useZyfai } from '../contexts/ZyfaiContext';
import { useDeploySafe } from '../hooks/useZyfaiOperations';
import { ConnectPrompt } from '../components/ui/ConnectPrompt';
import { WalletDetails } from '../components/dashboard/WalletDetails';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { ActionPanel } from '../components/dashboard/ActionPanel';
import { PositionsList } from '../components/dashboard/PositionsList';
import { ApyHistory } from '../components/dashboard/ApyHistory';

export default function Dashboard() {
  const { isConnected: zyfaiConnected, isDeployed, smartWalletAddress, connectZyfaiManually } = useZyfai();
  const { deploySafe, isPending: isDeploying } = useDeploySafe();
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

  const handleDeploy = async () => {
    try {
      await deploySafe();
    } catch (error) {
      console.error('Failed to deploy Safe:', error);
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
          <div className="card card-bordered border-2 border-primary shadow-xl">
            <div className="card-body text-center">
              <div className="avatar avatar-placeholder mx-auto mb-4">
                <div className="bg-primary text-primary-content rounded-full w-16">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              <h3 className="card-title justify-center text-xl mb-2">
                Ready to Set Up Your Smart Wallet?
              </h3>
              <p className="text-sm opacity-70 mb-6">
                Deploy a Smart Wallet to deposit funds and start earning yield on your stablecoins.
              </p>
              <button
                onClick={() => setShowPrompt(true)}
                className="btn btn-primary btn-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Set Up Smart Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If connected but Safe not deployed, show deployment card
  if (zyfaiConnected && !isDeployed) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card card-bordered border-2 border-success shadow-xl">
          <div className="card-body text-center">
            <div className="avatar avatar-placeholder mx-auto mb-4">
              <div className="bg-success text-success-content rounded-full w-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h3 className="card-title justify-center text-xl mb-2">
              Deploy Your Smart Wallet
            </h3>

            <p className="text-sm opacity-70 mb-2">
              Your Smart Wallet address has been generated:
            </p>

            <code className="badge badge-ghost badge-lg font-mono text-sm mb-4">
              {smartWalletAddress ? `${smartWalletAddress.slice(0, 10)}...${smartWalletAddress.slice(-8)}` : '—'}
            </code>

            <div className="alert alert-info mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div className="text-left text-sm">
                <p className="font-semibold mb-1">This will:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Deploy an ERC-4337 Safe Smart Wallet on-chain</li>
                  <li>Enable secure DeFi yield optimization</li>
                  <li>Require one transaction to confirm deployment</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="btn btn-success btn-lg"
            >
              {isDeploying ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-md"></span>
                  Deploying Smart Wallet...
                </span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Deploy Smart Wallet
                </>
              )}
            </button>

            <p className="text-xs opacity-60 mt-4">
              This is a one-time setup. Gas fees may apply.
            </p>
          </div>
        </div>
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
