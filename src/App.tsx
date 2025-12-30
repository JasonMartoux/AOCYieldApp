import { useModal, useAccount } from "@getpara/react-sdk";
import { ConnectCard } from "./components/ui/ConnectCard";
import './App.css'
import { WalletInfo } from './components/ui/WalletInfo';
import { SmartWalletInfo } from './components/ui/SmartWalletInfo';
import { YieldDashboard } from './components/ui/YieldDashboard';
import { DepositWithdraw } from './components/ui/DepositWithdraw';
import { useZyfai } from './contexts/ZyfaiContext';

function App() {
  const { openModal } = useModal();
  const { isConnected } = useAccount();
  const { isConnected: zyfaiConnected } = useZyfai();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">AOC Yield</h1>
                <p className="text-xs text-gray-500">Multichain Optimization</p>
              </div>
            </div>

            {/* Connection Status & Button */}
            <div className="flex items-center gap-4">
              {isConnected && zyfaiConnected && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected
                </div>
              )}

              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
              >
                {isConnected ? 'Switch Wallet' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 animate-fade-in">
        {!isConnected ? (
          <div className="max-w-md mx-auto mt-24">
            <ConnectCard onConnect={openModal} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Left Column - Wallet & Smart Wallet Info */}
            <div className="lg:col-span-1 space-y-6">
              <WalletInfo />
              <SmartWalletInfo />
            </div>

            {/* Right Column - Main Actions & Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              <DepositWithdraw />
              <YieldDashboard />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>© 2024 AOC Yield</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Multichain DeFi Optimization</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
              <span>·</span>
              <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
