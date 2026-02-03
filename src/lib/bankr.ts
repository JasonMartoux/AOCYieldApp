export interface BankrAccount {
  id: string
  address: string
  chainId: number
  label: string
  createdAt: string
}

export interface BankrBalance {
  token: string
  symbol: string
  balance: string
  balanceUsd: number
  decimals: number
}

export interface BankrTransaction {
  id: string
  type: "transfer" | "approve" | "deposit" | "withdraw"
  status: "pending" | "confirmed" | "failed"
  hash: string
  from: string
  to: string
  value: string
  token: string
  timestamp: string
}

export const BANKR_CHAINS = {
  ETHEREUM: 1,
  BASE: 8453,
  ARBITRUM: 42161,
  OPTIMISM: 10,
} as const

export type BankrChainId = (typeof BANKR_CHAINS)[keyof typeof BANKR_CHAINS]
