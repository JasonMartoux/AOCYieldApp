export interface YieldPosition {
  id: string
  protocol: string
  asset: string
  deposited: number
  apy: number
  value: number
  chain: string
}

export interface DashboardStats {
  totalValue: number
  totalApy: number
  dailyEarnings: number
  weeklyEarnings: number
  monthlyEarnings: number
  pendingEarnings: number
}

export interface MockData {
  positions: YieldPosition[]
  stats: DashboardStats
  availableProtocols: Array<{
    name: string
    apyRange: { min: number; max: number }
    tvl: number
    chains: string[]
  }>
}

// Mock data inspired by Zyfi SDK structure
export const MOCK_DATA: MockData = {
  positions: [
    {
      id: "pos_1",
      protocol: "Aave V3",
      asset: "USDC",
      deposited: 1000,
      apy: 5.24,
      value: 1052,
      chain: "Base",
    },
    {
      id: "pos_2",
      protocol: "Compound V3",
      asset: "USDT",
      deposited: 500,
      apy: 4.85,
      value: 524,
      chain: "Arbitrum",
    },
    {
      id: "pos_3",
      protocol: "Morpho Blue",
      asset: "USDC",
      deposited: 1500,
      apy: 3.12,
      value: 1523,
      chain: "Base",
    },
    {
      id: "pos_4",
      protocol: "Aerodrome",
      asset: "USDC",
      deposited: 250,
      apy: 8.45,
      value: 268,
      chain: "Base",
    },
  ],
  stats: {
    totalValue: 3367,
    totalApy: 5.1,
    dailyEarnings: 0.47,
    weeklyEarnings: 3.29,
    monthlyEarnings: 14.10,
    pendingEarnings: 2.34,
  },
  availableProtocols: [
    {
      name: "Aave V3",
      apyRange: { min: 4.5, max: 6.5 },
      tvl: 2500000000,
      chains: ["Base", "Ethereum", "Arbitrum"],
    },
    {
      name: "Compound V3",
      apyRange: { min: 4.0, max: 5.5 },
      tvl: 1800000000,
      chains: ["Base", "Arbitrum", "Optimism"],
    },
    {
      name: "Morpho Blue",
      apyRange: { min: 2.5, max: 4.5 },
      tvl: 500000000,
      chains: ["Base"],
    },
    {
      name: "Aerodrome",
      apyRange: { min: 6.0, max: 12.0 },
      tvl: 800000000,
      chains: ["Base"],
    },
  ],
}

// APY history mock (30 days)
export function generateApyHistory(): Array<{ date: string; apy: number }> {
  const data = []
  const baseApy = 5.1
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const variation = (Math.random() - 0.5) * 0.5 // ±0.25% variation
    data.push({
      date: date.toISOString().split("T")[0],
      apy: Number((baseApy + variation).toFixed(2)),
    })
  }
  
  return data
}
