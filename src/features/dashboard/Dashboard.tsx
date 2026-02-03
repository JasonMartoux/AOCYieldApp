"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { formatCurrency, formatPercentage } from "@/lib/format"
import { MOCK_DATA, generateApyHistory, type YieldPosition } from "./mockData"

interface DashboardProps {
  onInvest?: () => void
  onWithdraw?: () => void
}

export function Dashboard({ onInvest, onWithdraw }: DashboardProps) {
  const [positions] = useState<YieldPosition[]>(MOCK_DATA.positions)
  const [apyHistory] = useState(() => generateApyHistory())
  const stats = MOCK_DATA.stats

  const maxApy = Math.max(...apyHistory.map((d) => d.apy))
  const minApy = Math.min(...apyHistory.map((d) => d.apy))

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500 mb-1">Capital total</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.totalValue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500 mb-1">APY moyen</p>
            <p className="text-2xl font-bold text-green-600">
              {formatPercentage(stats.totalApy)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500 mb-1">Gains ce mois</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.monthlyEarnings)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500 mb-1">En attente</p>
            <p className="text-2xl font-bold text-amber-600">
              {formatCurrency(stats.pendingEarnings)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* APY Chart (simplified bar chart) */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Évolution APY (30j)</h3>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end gap-1">
            {apyHistory.slice(-14).map((day, i) => {
              const height =
                30 +
                ((day.apy - minApy) / (maxApy - minApy)) * 70
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full bg-primary-500 rounded-t transition-all hover:bg-primary-600"
                    style={{ height: `${height}%` }}
                    title={`${day.date}: ${day.apy}%`}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Il y a 14j</span>
            <span>Aujourd&apos;hui</span>
          </div>
        </CardContent>
      </Card>

      {/* Positions List */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Mes positions</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-lg font-semibold">
                  {position.protocol.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {position.protocol}
                  </p>
                  <p className="text-sm text-gray-500">
                    {position.chain} • {position.asset}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatCurrency(position.value)}
                </p>
                <p className="text-sm text-green-600">
                  {formatPercentage(position.apy)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Protocols Info */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Protocoles disponibles</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MOCK_DATA.availableProtocols.map((protocol) => (
            <div
              key={protocol.name}
              className="p-3 bg-gray-50 rounded-xl"
            >
              <p className="font-medium text-gray-900 text-sm">
                {protocol.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatPercentage(protocol.apyRange.min)} -{" "}
                {formatPercentage(protocol.apyRange.max)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
