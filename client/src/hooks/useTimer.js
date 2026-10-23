import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useStopwatch — robust stopwatch using performance.now() or Date.now()
 * for elapsed time calculation to prevent drift.
 */
export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0)     // ms
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const startTimeRef = useRef(null)
  const baseElapsedRef = useRef(0)
  const rafRef = useRef(null)

  const tick = useCallback(() => {
    if (startTimeRef.current !== null) {
      setElapsed(baseElapsedRef.current + (Date.now() - startTimeRef.current))
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [])

  const start = useCallback(() => {
    startTimeRef.current = Date.now()
    setRunning(true)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pause = useCallback(() => {
    if (startTimeRef.current !== null) {
      baseElapsedRef.current += Date.now() - startTimeRef.current
      startTimeRef.current = null
    }
    cancelAnimationFrame(rafRef.current)
    setRunning(false)
  }, [])

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    startTimeRef.current = null
    baseElapsedRef.current = 0
    setElapsed(0)
    setRunning(false)
    setLaps([])
  }, [])

  const lap = useCallback(() => {
    setLaps(prev => {
      const lapTime = elapsed - (prev.length > 0 ? prev[prev.length - 1].total : 0)
      return [...prev, { lap: prev.length + 1, split: lapTime, total: elapsed }]
    })
  }, [elapsed])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return { elapsed, running, laps, start, pause, reset, lap }
}

/**
 * useCountdown — robust countdown timer using Date.now() math.
 * Props: initialSeconds (number)
 */
export function useCountdown() {
  const [totalSeconds, setTotalSeconds] = useState(5 * 60)  // default 5 min
  const [remaining, setRemaining] = useState(5 * 60)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const endTimeRef = useRef(null)
  const intervalRef = useRef(null)

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const tick = useCallback(() => {
    const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
    setRemaining(left)
    if (left <= 0) {
      clearTimer()
      setRunning(false)
      setFinished(true)
    }
  }, [])

  const start = useCallback((seconds) => {
    const secs = seconds ?? remaining
    if (secs <= 0) return
    clearTimer()
    endTimeRef.current = Date.now() + secs * 1000
    setRemaining(secs)
    setFinished(false)
    setRunning(true)
    intervalRef.current = setInterval(tick, 250)
  }, [remaining, tick])

  const pause = useCallback(() => {
    clearTimer()
    setRunning(false)
  }, [])

  const reset = useCallback((newSeconds) => {
    clearTimer()
    const secs = newSeconds ?? totalSeconds
    setTotalSeconds(secs)
    setRemaining(secs)
    setRunning(false)
    setFinished(false)
    endTimeRef.current = null
  }, [totalSeconds])

  const setDuration = useCallback((secs) => {
    clearTimer()
    setTotalSeconds(secs)
    setRemaining(secs)
    setRunning(false)
    setFinished(false)
  }, [])

  useEffect(() => {
    return () => clearTimer()
  }, [])

  return { remaining, running, finished, totalSeconds, start, pause, reset, setDuration }
}

/**
 * Format ms to HH:MM:SS.cc string
 */
export function formatMs(ms) {
  const totalMs = Math.floor(ms)
  const cs = Math.floor((totalMs % 1000) / 10)
  const secs = Math.floor(totalMs / 1000) % 60
  const mins = Math.floor(totalMs / 60000) % 60
  const hrs  = Math.floor(totalMs / 3600000)
  const pad = n => String(n).padStart(2, '0')
  if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(cs)}`
  return `${pad(mins)}:${pad(secs)}.${pad(cs)}`
}

/**
 * Format seconds to MM:SS
 */
export function formatSeconds(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
