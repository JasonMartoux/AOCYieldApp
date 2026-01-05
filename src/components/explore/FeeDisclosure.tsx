import { Link } from 'react-router-dom';

export function FeeDisclosure() {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <div className="bg-white border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What You'll Pay (The Truth)
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Deposits</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Withdrawals</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Performance Fee</span>
            <span className="font-semibold text-gray-900">10% of earnings</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Gas Costs (one-time setup)</span>
            <span className="font-semibold text-gray-900">~$2-5</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-l-4 border-emerald-600 mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Example:</div>
          <div className="text-sm text-gray-700">
            Earn $100 → We take $10 → <strong>You keep $90</strong>
          </div>
        </div>

        <Link
          to="/fees"
          className="inline-block text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          See full fee breakdown →
        </Link>
      </div>
    </section>
  );
}
