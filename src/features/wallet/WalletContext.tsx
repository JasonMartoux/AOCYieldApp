"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { BankrAccount, BankrBalance, BankrChainId } from "@/lib/bankr"

interface WalletContextType {
  // Account state
  account: BankrAccount | null
  isConnected: boolean
  isConnecting: boolean
  
  // Balance state
  balances: BankrBalance[]
  isLoadingBalances: boolean
  
  // Actions
  connect: () => Promise<void>
  disconnect: () => void
  refreshBalances: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<BankrAccount | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [balances, setBalances] = useState<BankrBalance[]>([])
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      // TODO: Implement Bankr OAuth flow
      // For now, simulate connection with mock account
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const mockAccount: BankrAccount = {
        id: "acc_mock_123",
        address: "0x1234...abcd",
        chainId: BANKR_CHAINS.BASE,
        label: "Mon Wallet",
        createdAt: new Date().toISOString(),
      }
      
      setAccount(mockAccount)
      await refreshBalances(mockAccount)
    } catch (error) {
      console.error("Connection failed:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAccount(null)
    setBalances([])
  }, [])

  const refreshBalances = useCallback(async (acc?: BankrAccount) => {
    const targetAccount = acc || account
    if (!targetAccount) return
    
    setIsLoadingBalances(true)
    try {
      // TODO: Call Bankr API for real balances
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BANKR_BASE_URL}/accounts/${targetAccount.id}/balances`)
      
      // Mock balances for now
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      const mockBalances: BankrBalance[] = [
        {
          token: "USDC",
          symbol: "USDC",
          balance: "1500.00",
          balanceUsd: 1500,
          decimals: 6,
        },
        {
          token: "USDT",
          symbol: "USDT",
          balance: "500.00",
          balanceUsd: 500,
          decimals: 6,
        },
        {
          token: "EURC",
          symbol: "EURC",
          balance: "250.00",
          balanceUsd: 270,
          decimals: 6,
        },
      ]
      
      setBalances(mockBalances)
    } catch (error) {
      console.error("Failed to fetch balances:", error)
    } finally {
      setIsLoadingBalances(false)
    }
  }, [account])

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected: !!account,
        isConnecting,
        balances,
        isLoadingBalances,
        connect,
        disconnect,
        refreshBalances,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Re-export constants
const { BANKR_CHAINS } = require("@/lib/bankr")
