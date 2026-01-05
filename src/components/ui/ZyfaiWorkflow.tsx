import { useZyfai } from '../../contexts/ZyfaiContext';
import { useCreateSessionKey, usePositions } from '../../hooks/useZyfaiOperations';

type WorkflowStep = {
  id: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  description: string;
  action?: () => Promise<void>;
};

export function ZyfaiWorkflow() {
  const { isConnected, isDeployed, hasSessionKey, smartWalletAddress } = useZyfai();
  const { createSessionKey, isPending: sessionPending, sessionKeyData, error: sessionError } = useCreateSessionKey();
  const { positions } = usePositions();

  const handleCreateSessionKey = async () => {
    console.log('🔘 Session key button clicked');
    try {
      await createSessionKey();
    } catch (error) {
      console.error('Session key creation error:', error);
    }
  };

  const hasPositions = positions?.positions && positions.positions.length > 0;

  // Define workflow steps following Zyfai SDK pattern
  const steps: WorkflowStep[] = [
    {
      id: 1,
      name: 'Connect Wallet',
      status: isConnected ? 'completed' : 'pending',
      description: 'Connect with Para SDK (email, social, or external wallet)',
    },
    {
      id: 2,
      name: 'Deploy Smart Wallet',
      status: isDeployed ? 'completed' : isConnected ? 'in_progress' : 'pending',
      description: 'Deploy your ERC-4337 Safe on Base',
    },
    {
      id: 3,
      name: 'Enable Auto-Invest',
      status: hasSessionKey || sessionKeyData
        ? 'completed'
        : isDeployed
        ? 'in_progress'
        : 'pending',
      description: 'Create session key for gasless automation',
      action: handleCreateSessionKey,
    },
    {
      id: 4,
      name: 'Fund Your Safe',
      status: hasPositions ? 'completed' : hasSessionKey ? 'in_progress' : 'pending',
      description: 'Deposit USDC to start earning yield',
    },
    {
      id: 5,
      name: 'Zyfai Optimization',
      status: hasPositions ? 'completed' : 'pending',
      description: 'AI analyzes and invests in best protocols (5-15 min)',
    },
    {
      id: 6,
      name: 'Earn Yield',
      status: hasPositions ? 'in_progress' : 'pending',
      description: 'Your funds are earning optimized returns',
    },
  ];

  const getStepIcon = (step: WorkflowStep) => {
    if (step.status === 'completed') {
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (step.status === 'in_progress') {
      return (
        <svg className="w-5 h-5 text-blue-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return (
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
        <span className="text-xs text-gray-400">{step.id}</span>
      </div>
    );
  };

  if (!isConnected) {
    return null;
  }

  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const progressPercentage = (completedSteps / steps.length) * 100;
  const isSetupComplete = hasSessionKey && isDeployed;

  // Show completion state when session key exists
  if (isSetupComplete) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-emerald-900 mb-1">
                Setup Complete!
              </h3>
              <p className="text-xs text-emerald-700 mb-3">
                Your Smart Wallet is ready. Deposit USDC to start earning optimized yield.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/60 text-emerald-700 border border-emerald-200">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Smart Wallet Deployed
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/60 text-emerald-700 border border-emerald-200">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Gasless Enabled
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/60 text-emerald-700 border border-emerald-200">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Auto-Invest Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Setup Progress
          </h3>
          <span className="text-xs font-medium text-gray-600">
            {completedSteps} / {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-2.5 top-8 w-0.5 h-6 ${
                    step.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}

              {/* Step content */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">{getStepIcon(step)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p
                      className={`text-sm font-medium ${
                        step.status === 'completed'
                          ? 'text-green-900'
                          : step.status === 'in_progress'
                          ? 'text-blue-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </p>
                    {step.status === 'completed' && (
                      <span className="text-xs font-medium text-green-600">✓ Done</span>
                    )}
                    {step.status === 'in_progress' && (
                      <span className="text-xs font-medium text-blue-600">In Progress</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{step.description}</p>

                  {/* Action button for session key */}
                  {step.id === 3 && step.status === 'in_progress' && !hasSessionKey && (
                    <div>
                      <button
                        onClick={step.action}
                        disabled={sessionPending}
                        className="mt-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {sessionPending ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Creating...
                          </span>
                        ) : (
                          'Create Session Key'
                        )}
                      </button>
                      {sessionError && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                          <p className="text-xs text-red-700">{sessionError.message}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Waiting message for optimization */}
                  {step.id === 5 && step.status === 'pending' && hasSessionKey && smartWalletAddress && (
                    <div className="mt-2 p-2 bg-blue-50 border-l-2 border-blue-400">
                      <div className="flex items-start gap-2 text-xs text-blue-700">
                        <svg
                          className="animate-spin h-3 w-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Analyzing protocols and optimizing allocation... This may take 5-15 minutes.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
