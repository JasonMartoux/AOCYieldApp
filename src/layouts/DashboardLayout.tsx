import { Outlet, Link, Navigate } from 'react-router-dom';
import { useModal, useAccount } from '@getpara/react-sdk';
import { useZyfai } from '../contexts/ZyfaiContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function DashboardLayout() {
  const { openModal } = useModal();
  const { isConnected } = useAccount();
  const { isConnected: zyfaiConnected } = useZyfai();

  // Redirect to home if not connected
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col gradient-mesh">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 gradient-primary flex items-center justify-center text-primary-foreground font-bold text-base rounded-lg transition-transform group-hover:scale-105 shadow-lg">
                A
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-foreground">AOC Yield</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/fees"
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              >
                Fees
              </Link>
              <Link
                to="/risks"
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              >
                Risks
              </Link>
            </nav>

            {/* Connection Status & Actions */}
            <div className="flex items-center gap-3">
              {isConnected && zyfaiConnected && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full text-xs font-semibold text-success">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Ready
                </div>
              )}

              {isConnected && !zyfaiConnected && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Wallet Only
                </div>
              )}

              <ThemeToggle />

              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-all rounded-lg border border-border shadow-sm hover:shadow"
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
      <footer className="border-t border-border bg-card/50 backdrop-blur-xl mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2024 AOC Yield</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Multichain DeFi Optimization</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/fees" className="hover:text-foreground transition-colors">
                Fee Structure
              </Link>
              <span>·</span>
              <Link to="/risks" className="hover:text-foreground transition-colors">
                Risk Disclosure
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
