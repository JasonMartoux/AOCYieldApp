import { useState } from 'react';
import { useZyfai } from '../contexts/ZyfaiContext';
import { WalletInfo } from '../components/ui/WalletInfo';
import { SmartWalletInfo } from '../components/ui/SmartWalletInfo';
import { ZyfaiWorkflow } from '../components/ui/ZyfaiWorkflow';
import { DepositWithdraw } from '../components/ui/DepositWithdraw';
import { YieldDashboard } from '../components/ui/YieldDashboard';
import { OpportunitiesPanel } from '../components/ui/OpportunitiesPanel';
import { TransactionHistory } from '../components/ui/TransactionHistory';
import { ConnectPrompt } from '../components/ui/ConnectPrompt';

export default function Dashboard() {
  const { isConnected: zyfaiConnected, connectZyfaiManually } = useZyfai();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(!zyfaiConnected);

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Connection Prompt - Show if not connected to Zyfai */}
      {!zyfaiConnected && showPrompt && (
        <ConnectPrompt
          onConnect={handleConnect}
          onCancel={handleCancel}
          isConnecting={isConnecting}
        />
      )}

      {/* Top Row - Wallet Info & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Wallet & Smart Wallet Info */}
        <div className="lg:col-span-1 space-y-6">
          <WalletInfo />

          {/* Only show Smart Wallet info if connected to Zyfai */}
          {zyfaiConnected && <SmartWalletInfo />}

          {/* Setup Progress - Shows completion state when ready */}
          {zyfaiConnected && <ZyfaiWorkflow />}

          {/* Show button to re-open prompt if dismissed */}
          {!zyfaiConnected && !showPrompt && (
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-4">
                Set up your Smart Wallet to deposit funds and start earning yield.
              </p>
              <button
                onClick={() => setShowPrompt(true)}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                Set Up Smart Wallet
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Deposit/Withdraw */}
        <div className="lg:col-span-2">
          {zyfaiConnected ? (
            <DepositWithdraw />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Wallet Required
              </h3>
              <p className="text-sm text-gray-600">
                Set up your Smart Wallet above to deposit funds and start earning yield.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Yield Dashboard - Show even without Zyfai for transparency */}
      {zyfaiConnected && <YieldDashboard />}

      {/* Bottom Row - Opportunities & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpportunitiesPanel />
        {zyfaiConnected && <TransactionHistory />}
      </div>
    </div>
  );
}
