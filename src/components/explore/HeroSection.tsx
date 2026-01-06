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
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Earn More on Your Stablecoins
      </h1>
      <p className="text-xl opacity-80 mb-8">
        Simple. Transparent. Actually Safe.
      </p>

      <div className="card card-bordered shadow-xl mb-8">
        <div className="card-body">
          <div className="text-sm opacity-70 uppercase tracking-wide mb-2">
            Current Best APY (Live)
          </div>
          <div className="text-5xl font-bold text-success mb-2">
            11.96%
          </div>
          <div className="text-sm opacity-80">
            Base APY: 8.26% + Rewards: 3.70%
          </div>
        </div>
      </div>

      <button onClick={handleStartEarning} className="btn btn-success btn-lg">
        Start Earning →
      </button>
    </section>
  );
}
