import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAccount } from '@getpara/react-sdk';
import { useZyfai } from '../contexts/ZyfaiContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { ConnectButton } from '../components/ui/ConnectButton';
import { Navigate } from 'react-router-dom';

export function MainLayout() {
  const { isConnected } = useAccount();
  const { isConnected: zyfaiConnected } = useZyfai();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  // Redirect to home if trying to access dashboard while not connected
  if (isDashboard && !isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50 min-h-[4.5rem] border-b border-base-300">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case gap-3 hover:bg-base-200">
            <div className="avatar avatar-placeholder">
              <div className="bg-primary text-primary-content rounded-xl w-11 shadow-lg">
                <span className="text-xl font-bold">A</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl tracking-tight">AOC Yield</span>
              <span className="text-xs opacity-60 font-medium">Honest DeFi. No BS.</span>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            <li>
              <Link to={isDashboard ? "/dashboard" : "/"} className="rounded-lg">
                {isDashboard ? "Dashboard" : "Home"}
              </Link>
            </li>
            <li>
              <Link to="/fees" className="rounded-lg">
                Fees
              </Link>
            </li>
            <li>
              <Link to="/risks" className="rounded-lg">
                Risks
              </Link>
            </li>
            <li>
              <Link to="/glossary" className="rounded-lg">
                Glossary
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* Connection Status - only show on dashboard */}
          {isDashboard && isConnected && zyfaiConnected && (
            <div className="badge badge-success gap-2 py-3 px-3 hidden sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-content opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-content"></span>
              </span>
              <span className="font-medium">Ready</span>
            </div>
          )}

          {isDashboard && isConnected && !zyfaiConnected && (
            <div className="badge badge-warning gap-2 py-3 px-3 hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-warning-content" />
              <span className="font-medium">Setup Needed</span>
            </div>
          )}

          {/* Dashboard Link - only show on public pages when connected */}
          {!isDashboard && isConnected && (
            <Link
              to="/dashboard"
              className="btn btn-ghost gap-2 hidden sm:flex"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="font-medium">Dashboard</span>
            </Link>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Connect Button */}
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className={isDashboard ? "flex-1 container mx-auto px-4 sm:px-6 py-8" : "flex-1"}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-100 text-base-content border-t border-base-300 mt-auto">
        <div className="grid grid-flow-col gap-6">
          <Link to="/fees" className="link link-hover font-medium">
            Fee Structure
          </Link>
          <Link to="/risks" className="link link-hover font-medium">
            Risk Disclosure
          </Link>
          <Link to="/glossary" className="link link-hover font-medium">
            Glossary
          </Link>
        </div>
        <div>
          <p className="text-sm opacity-70">
            ©2026 ACE OF CLUBS - Multichain DeFi Optimization
          </p>
        </div>
      </footer>
    </div>
  );
}
