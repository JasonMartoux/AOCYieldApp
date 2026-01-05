import { useNavigate } from 'react-router-dom';
import { useModal, useAccount } from '@getpara/react-sdk';

export function HeroSection() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { isConnected } = useAccount();

  const handleStartEarning = () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      openModal();
    }
  };

  return (
    <section className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Earn More on Your Stablecoins
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Simple. Transparent. Actually Safe.
      </p>

      <div className="bg-white border border-gray-200 p-8 mb-8">
        <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
          Current Best APY (Live)
        </div>
        <div className="text-5xl font-bold text-emerald-600 mb-2">
          11.96%
        </div>
        <div className="text-sm text-gray-600">
          Base APY: 8.26% + Rewards: 3.70%
        </div>
      </div>

      <button
        onClick={handleStartEarning}
        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-medium transition-colors"
      >
        Start Earning →
      </button>
    </section>
  );
}
