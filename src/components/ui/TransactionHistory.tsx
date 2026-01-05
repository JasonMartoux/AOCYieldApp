import { useEffect } from 'react';
import { useGetHistory } from '../../hooks/useZyfaiOperations';
import { useZyfai } from '../../contexts/ZyfaiContext';

export function TransactionHistory() {
  const { isConnected, isDeployed } = useZyfai();
  const { fetchHistory, history, isPending, error } = useGetHistory();

  useEffect(() => {
    if (isConnected && isDeployed) {
      fetchHistory({ limit: 20, offset: 0 });
    }
  }, [isConnected, isDeployed]);

  if (!isConnected || !isDeployed) {
    return null;
  }

  const transactions = history?.data || [];
  const totalTransactions = history?.total || 0;

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Transaction History</h3>
        {totalTransactions > 0 && (
          <span className="text-xs font-medium text-gray-500">{totalTransactions} total</span>
        )}
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {isPending ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : error ? (
          <div className="px-5 py-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-sm text-red-700">{error.message}</p>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm font-medium text-gray-900 mb-1">No transactions yet</p>
            <p className="text-xs text-gray-500">Deposit funds to start building your yield history</p>
          </div>
        ) : (
          transactions.map((tx: any, index: number) => (
            <div key={index} className="px-5 py-4 hover:bg-gray-50 transition-colors">
              {/* Transaction Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${
                        tx.action === 'deposit'
                          ? 'bg-emerald-100 text-emerald-700'
                          : tx.action === 'withdraw'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {tx.action || 'unknown'}
                    </span>
                    {tx.crosschain && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700">
                        crosschain
                      </span>
                    )}
                    {tx.rebalance && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700">
                        rebalance
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {tx.date ? new Date(tx.date).toLocaleString() : 'Date unavailable'}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs font-medium text-gray-700">{tx.strategy || 'N/A'}</p>
                  <p className="text-xs text-gray-500">Chain {tx.chainId}</p>
                </div>
              </div>

              {/* Transaction Hash */}
              {tx.transactionHash && (
                <p className="text-xs font-mono text-gray-400 mb-2">
                  {tx.transactionHash.slice(0, 10)}...{tx.transactionHash.slice(-8)}
                </p>
              )}

              {/* Positions */}
              {tx.positions && tx.positions.length > 0 && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">Positions:</p>
                  {tx.positions.map((pos: any, posIndex: number) => (
                    <div key={posIndex} className="flex items-center justify-between py-1">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">{pos.protocol_name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{pos.pool || 'N/A'}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xs font-medium text-gray-900">
                          {pos.amount} {pos.token_symbol}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {transactions.length > 0 && transactions.length < totalTransactions && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => fetchHistory({ limit: 20, offset: transactions.length })}
            className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Load More ({totalTransactions - transactions.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
