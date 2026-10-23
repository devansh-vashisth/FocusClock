import { useEffect, useState } from 'react'

/**
 * Live digital clock component.
 * Props: size ('sm' | 'md' | 'lg' | 'xl'), showSeconds, showDate
 */
const sizeMap = {
  sm: { time: 'text-2xl', date: 'text-xs', dot: 'text-2xl' },
  md: { time: 'text-4xl', date: 'text-sm', dot: 'text-4xl' },
  lg: { time: 'text-6xl', date: 'text-base', dot: 'text-6xl' },
  xl: { time: 'text-8xl', date: 'text-lg',  dot: 'text-8xl' },
}

export default function LiveClock({ size = 'lg', showDate = true, showSeconds = true, className = '' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const s = sizeMap[size] ?? sizeMap.lg
  const pad = n => String(n).padStart(2, '0')

  const hours   = pad(now.getHours())
  const minutes = pad(now.getMinutes())
  const seconds = pad(now.getSeconds())

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`font-mono font-bold tabular-nums text-navy-900 clock-glow flex items-baseline ${s.time}`}>
        <span>{hours}</span>
        <span className={`${s.dot} text-primary-400 mx-0.5 animate-pulse`}>:</span>
        <span>{minutes}</span>
        {showSeconds && (
          <>
            <span className={`${s.dot} text-primary-400 mx-0.5 animate-pulse`}>:</span>
            <span className={`${size === 'xl' ? 'text-5xl' : size === 'lg' ? 'text-3xl' : ''} text-slate-400`}>
              {seconds}
            </span>
          </>
        )}
      </div>
      {showDate && (
        <p className={`${s.date} text-slate-500 font-medium`}>{dateStr}</p>
      )}
    </div>
  )
}
