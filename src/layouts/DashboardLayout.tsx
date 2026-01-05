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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-emerald-600 flex items-center justify-center text-white font-bold text-base transition-transform group-hover:scale-105">
                A
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-gray-900">AOC Yield</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/fees"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Fees
              </Link>
              <Link
                to="/risks"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Risks
              </Link>
            </nav>

            {/* Connection Status & Actions */}
            <div className="flex items-center gap-3">
              {isConnected && zyfaiConnected && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Ready
                </div>
              )}

              {isConnected && !zyfaiConnected && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Wallet Only
                </div>
              )}

              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors border border-gray-300"
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
