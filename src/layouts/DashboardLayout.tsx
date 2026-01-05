import { Outlet, Link, Navigate } from 'react-router-dom';
import { useModal, useAccount } from '@getpara/react-sdk';
import { useZyfai } from '../contexts/ZyfaiContext';

export function DashboardLayout() {
  const { openModal } = useModal();
  const { isConnected } = useAccount();
  const { isConnected: zyfaiConnected } = useZyfai();

  // Redirect to home if not connected
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">AOC Yield</h1>
                <p className="text-xs text-gray-500">Multichain Optimization</p>
              </div>
            </Link>

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
                Switch Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 animate-fade-in">
        <Outlet />
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
              <Link to="/fees" className="hover:text-gray-900 transition-colors">
                Fee Structure
              </Link>
              <span>·</span>
              <Link to="/risks" className="hover:text-gray-900 transition-colors">
                Risk Disclosure
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
