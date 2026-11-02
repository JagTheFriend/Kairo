import { useEffect, useState } from 'react'

export interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function getRemaining(target: string): CountdownValue {
  const difference = new Date(target).getTime() - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const totalSeconds = Math.floor(difference / 1000)

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  }
}

export function useCountdown(target: string): CountdownValue {
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    const update = () => setRemaining(getRemaining(target))
    update()

    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [target])

  return remaining
}
