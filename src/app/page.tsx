"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Dashboard } from "@/features/dashboard/Dashboard"
import { useWallet } from "@/features/wallet/WalletContext"
import { useZK2P2P } from "@/features/zk2p2p/useZK2P2P"
import { formatCurrency } from "@/lib/format"

export default function Home() {
  const { isConnected, isConnecting, connect, account } = useWallet()
  const { getQuote, createOrder, isLoading } = useZK2P2P()
  const [showOnramp, setShowOnramp] = useState(false)
  const [amount, setAmount] = useState("100")

  const handleInvest = async () => {
    if (!isConnected) {
      await connect()
    }
    setShowOnramp(true)
  }

  const handleOnramp = async () => {
    const euros = parseFloat(amount)
    if (!euros || euros < 10) return

    try {
      // Step 1: Get quote
      const quote = await getQuote("EUR", "USDC", euros)
      console.log("Quote:", quote)

      // Step 2: Create order (mock)
      const order = await createOrder(
        quote.id,
        account?.address || "0x...",
        account?.address || "0x...",
        euros,
        quote.toAmount
      )
      console.log("Order:", order)

      alert(
        `Commande créée ! ID: ${order.id}\nVous allez recevoir ~${formatCurrency(quote.toAmount, "USD")}`
      )
      setShowOnramp(false)
    } catch (error) {
      console.error("Onramp failed:", error)
      alert("Erreur lors de la création de la commande")
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Yield App</h1>
            <p className="text-sm text-gray-500">
              Votre épargne travaille
            </p>
          </div>
          {isConnected && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Wallet connecté
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            size="lg"
            className="h-20 flex-col gap-1"
            onClick={handleInvest}
            disabled={isConnecting}
          >
            <span className="text-2xl">💰</span>
            <span className="text-sm font-medium">Investir</span>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-20 flex-col gap-1"
            onClick={() => {
              /* Show gains modal */
            }}
          >
            <span className="text-2xl">📈</span>
            <span className="text-sm font-medium">Mes gains</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-20 flex-col gap-1"
            onClick={onWithdraw}
          >
            <span className="text-2xl">💸</span>
            <span className="text-sm font-medium">Retirer</span>
          </Button>
        </div>

        {/* Onramp Form (shown when investing) */}
        {showOnramp && (
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">
                Investir via ZKP2P
              </h2>
              <p className="text-sm text-gray-500">
                Frais: ~2% • Délai: 5-10 minutes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant en euros
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="100"
                  min="10"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowOnramp(false)}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleOnramp}
                  disabled={isLoading || !parseFloat(amount)}
                >
                  {isLoading ? "Traitement..." : "Investir"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard (shown when wallet connected) */}
        {isConnected && !showOnramp && (
          <Dashboard onInvest={handleInvest} onWithdraw={onWithdraw} />
        )}

        {/* Welcome Card (shown when not connected) */}
        {!isConnected && !showOnramp && (
          <Card className="text-center py-8">
            <CardContent>
              <div className="text-4xl mb-4">🔐</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Connectez votre wallet
              </h2>
              <p className="text-gray-500 mb-4">
                Gérez vos investissements DeFi en toute simplicité
              </p>
              <Button onClick={connect} disabled={isConnecting}>
                {isConnecting ? "Connexion..." : "Connecter avec Bankr"}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
