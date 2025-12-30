/**
 * Zyfai SDK Types
 * Centralized type definitions for Zyfai SDK responses and operations
 */

// Supported Zyfai chain IDs
export type SupportedChainId = 8453 | 42161 | 9745;

// Chain names mapping
export const ChainNames: Record<SupportedChainId, string> = {
  8453: 'Base',
  42161: 'Arbitrum',
  9745: 'Plasma',
};

// Token symbols mapping
export const ChainTokens: Record<SupportedChainId, string> = {
  8453: 'USDC',
  42161: 'USDC',
  9745: 'USDT',
};

// Safe Smart Wallet Deployment
export interface DeploySafeResponse {
  success: boolean;
  safeAddress: string;
  txHash: string;
  status: 'deployed' | 'failed';
}

export interface SmartWalletResponse {
  address: string;
  isDeployed: boolean;
}

// Session Key
export interface SessionKeyResponse {
  success: boolean;
  sessionKeyAddress?: string;
  signature?: string;
  sessionNonces?: bigint[];
  userId?: string;
  sessionActivation?: {
    id: string;
    hash: string;
    signer: string;
    nonces: number[];
    expiresAt: string;
    txHash?: string;
    isActive: boolean;
    isEnabled: boolean;
  };
  message?: string;
  alreadyActive?: boolean;
}

// Deposits and Withdrawals
export interface DepositResponse {
  success: boolean;
  txHash: string;
  smartWallet: string;
  amount: string;
}

export interface WithdrawResponse {
  success: boolean;
  message: string;
  txHash?: string;
  type: 'full' | 'partial';
  amount: string;
}

// Positions
export interface PositionSlot {
  protocol_id?: string;
  protocol_name?: string;
  pool?: string;
  token_symbol?: string;
  underlyingAmount?: string;
  pool_apy?: number;
  pool_tvl?: number;
}

export interface Position {
  chain?: string;
  strategy?: string;
  smartWallet?: string;
  positions: PositionSlot[];
}

export interface PositionsResponse {
  success: boolean;
  userAddress: string;
  positions: Position[];
}

// Earnings
export interface OnchainEarnings {
  success: boolean;
  data: {
    walletAddress: string;
    totalEarnings: number;
    currentEarnings: number;
    lifetimeEarnings: number;
    [key: string]: any;
  };
}

// Protocols
export interface Protocol {
  id: string;
  name: string;
  type: string;
  chains: number[];
  strategies?: string[];
  description?: string;
  imageUrl?: string;
  website?: string;
  pools?: Array<{
    id: string;
    name: string;
    asset: string;
    apy?: number;
    tvl?: string;
  }>;
}

export interface ProtocolsResponse {
  success: boolean;
  chainId: number;
  protocols: Protocol[];
}

// User Details
export interface UserDetailsResponse {
  success: boolean;
  user: {
    id: string;
    address: string;
    smartWallet: string;
    chains: number[];
    protocols: Protocol[];
    hasActiveSessionKey: boolean;
    autoSelectProtocols: boolean;
    [key: string]: any;
  };
}
