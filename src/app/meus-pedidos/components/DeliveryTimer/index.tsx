"use client"

import { useEffect, useState } from "react"

type DeliveryTimerProps = {
  createdAt: string | Date
  estimatedDeliveryMinutes: number | null
}

const DeliveryTimer = ({
  createdAt,
  estimatedDeliveryMinutes,
}: DeliveryTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    function calculateTimeLeft() {
      const orderTime = new Date(createdAt).getTime()
      const now = new Date().getTime()
      const minutesPassed = Math.floor((now - orderTime) / 1000 / 60)
      const remaining = estimatedDeliveryMinutes
        ? estimatedDeliveryMinutes - minutesPassed
        : 0
      return remaining > 0 ? remaining : 0
    }

    const initTimeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 0)

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 30000)

    return () => {
      clearTimeout(initTimeout)
      clearInterval(interval)
    }
  }, [createdAt, estimatedDeliveryMinutes])

  if (timeLeft === null) {
    return <span className="block h-4 w-16 animate-pulse rounded bg-gray-200" />
  }

  if (timeLeft === 0) {
    return (
      <p className="animate-pulse text-center text-sm font-semibold text-amber-600">
        Seu pedido deve chegar a qualquer momento! 🛵
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-1 text-center">
      <p className="text-muted-foreground text-sm">Previsão de entrega:</p>
      <p className="text-lg font-bold text-emerald-600">
        Aproximadamente {timeLeft} {timeLeft === 1 ? "minuto" : "minutos"}
      </p>
    </div>
  )
}

export default DeliveryTimer
