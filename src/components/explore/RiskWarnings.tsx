import { Link } from 'react-router-dom';

export function RiskWarnings() {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <div className="bg-amber-50 border border-amber-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What Could Go Wrong
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-start gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Smart Contract Risk</div>
                <div className="text-sm text-gray-700">
                  The protocols we use could have bugs or be exploited by hackers. While they're audited, no code is 100% safe.
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">APY Changes Daily</div>
                <div className="text-sm text-gray-700">
                  The yield rates you see today will change. They could go up or down. Past performance doesn't predict future returns.
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Withdrawal Delays</div>
                <div className="text-sm text-gray-700">
                  During high network congestion, withdrawals might take several hours or cost more in gas fees.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-amber-300 mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Important:</div>
          <div className="text-sm text-gray-700">
            Only deposit money you can afford to lose. This is not financial advice. Do your own research.
          </div>
        </div>

        <Link
          to="/risks"
          className="inline-block text-sm text-amber-700 hover:text-amber-800 font-medium"
        >
          Read full risk disclosure →
        </Link>
      </div>
    </section>
  );
}
