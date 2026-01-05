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

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link to="/fees" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fees
              </Link>
              <Link to="/risks" className="text-gray-600 hover:text-gray-900 transition-colors">
                Risks
              </Link>
              <Link to="/glossary" className="text-gray-600 hover:text-gray-900 transition-colors">
                Glossary
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {isConnected && (
                <Link
                  to="/dashboard"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
              >
                {isConnected ? 'Go to Dashboard' : 'Connect Wallet'}
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
