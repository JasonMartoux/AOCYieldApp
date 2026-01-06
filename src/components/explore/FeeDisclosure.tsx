import { Link } from 'react-router-dom';

export function FeeDisclosure() {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <div className="card card-bordered shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">
            What You'll Pay (The Truth)
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span>Deposits</span>
              <span className="badge badge-success badge-lg font-semibold">FREE</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Withdrawals</span>
              <span className="badge badge-success badge-lg font-semibold">FREE</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Performance Fee</span>
              <span className="badge badge-success badge-lg font-semibold">FREE</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Gas Costs (one-time setup)</span>
              <span className="font-semibold">~$2-5</span>
            </div>
          </div>

          <div className="alert alert-success">
            <div>
              <div className="text-sm font-semibold mb-1">Zero Fees:</div>
              <div className="text-sm">
                <strong>You keep 100% of your earnings</strong> - no performance fee charged
              </div>
            </div>
          </div>

          <Link
            to="/fees"
            className="link link-success text-sm font-medium"
          >
            See full fee breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
}
