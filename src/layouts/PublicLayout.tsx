import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useModal, useAccount } from '@getpara/react-sdk';

export function PublicLayout() {
  const { openModal } = useModal();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  const handleConnect = () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      openModal();
    }
  };

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
                <p className="text-xs text-gray-500">Honest DeFi. No BS.</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Explore
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
              <Link
                to="/glossary"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Glossary
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {isConnected && (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                {isConnected ? 'Go to Dashboard →' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
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
              <span>·</span>
              <Link to="/glossary" className="hover:text-gray-900 transition-colors">
                Glossary
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
