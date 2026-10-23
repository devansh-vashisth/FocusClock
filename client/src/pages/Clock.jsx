import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock as ClockIcon, Timer, Flag, Play, Pause, RotateCcw,
  Maximize2, Minimize2, Globe, Volume2, Sparkles, Check
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import LiveClock from '../components/LiveClock'
import { useStopwatch, useCountdown, formatMs, formatSeconds } from '../hooks/useTimer'

const timezones = [
  { label: 'New York (EDT)', tz: 'America/New_York' },
  { label: 'London (BST)', tz: 'Europe/London' },
  { label: 'Paris (CEST)', tz: 'Europe/Paris' },
  { label: 'Tokyo (JST)', tz: 'Asia/Tokyo' },
  { label: 'Sydney (AEST)', tz: 'Australia/Sydney' },
]

export default function Clock() {
  const [activeTab, setActiveTab] = useState('clock') // 'clock' | 'stopwatch' | 'timer'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [use24Hour, setUse24Hour] = useState(false)
  const [ambientSound, setAmbientSound] = useState(false)

  // Stopwatch hook
  const sw = useStopwatch()

  // Countdown hook
  const cd = useCountdown()
  const [customMinutes, setCustomMinutes] = useState(10)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clock & Timers"
        subtitle="Live digital clock, precision stopwatch, and multi-purpose study countdown."
      >
        <button
          onClick={toggleFullscreen}
          className="btn-secondary text-sm"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        {[
          { id: 'clock', label: 'Digital Clock', icon: ClockIcon },
          { id: 'stopwatch', label: 'Stopwatch', icon: Flag },
          { id: 'timer', label: 'Timer', icon: Timer },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === t.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Live Digital Clock */}
      {activeTab === 'clock' && (
        <div className="space-y-6">
          <div className="card text-center py-12 sm:py-16 bg-gradient-to-br from-white via-primary-50/40 to-slate-50 border border-primary-100/60 shadow-card relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setUse24Hour(!use24Hour)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  use24Hour
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {use24Hour ? '24h' : '12h'}
              </button>
            </div>

            <div className="max-w-xl mx-auto px-4">
              <span className="badge-blue mb-4 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Study Mode Clock
              </span>
              <div className="my-6">
                <LiveClock size="xl" showDate showSeconds />
              </div>
              <p className="text-sm text-slate-500 mt-4">
                Stay aware of your schedule without high-pressure distractions.
              </p>
            </div>
          </div>

          {/* World Timezones */}
          <div>
            <h2 className="text-base font-semibold text-navy-900 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary-600" />
              World Clocks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {timezones.map(t => {
                const now = new Date()
                const timeString = now.toLocaleTimeString('en-US', {
                  timeZone: t.tz,
                  hour: '2-digit',
                  minute: '2-digit',
                })
                return (
                  <div key={t.tz} className="card p-4 hover:border-primary-200">
                    <p className="text-xs text-slate-500 font-medium truncate">{t.label}</p>
                    <p className="text-xl font-bold font-mono text-navy-900 mt-1">{timeString}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stopwatch */}
      {activeTab === 'stopwatch' && (
        <div className="space-y-6">
          <div className="card text-center py-12 bg-white border border-slate-100 shadow-card">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Precision Stopwatch</p>
            <div className="font-mono text-5xl sm:text-7xl font-bold text-navy-950 tabular-nums my-6 tracking-tight">
              {formatMs(sw.elapsed)}
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              {!sw.running ? (
                <button
                  onClick={sw.start}
                  className="btn-primary px-8 py-3 text-base shadow-button"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Start
                </button>
              ) : (
                <button
                  onClick={sw.pause}
                  className="btn-primary bg-amber-500 hover:bg-amber-600 px-8 py-3 text-base"
                >
                  <Pause className="w-5 h-5 fill-white" />
                  Pause
                </button>
              )}

              <button
                onClick={sw.lap}
                disabled={!sw.running}
                className="btn-secondary px-6 py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Flag className="w-5 h-5" />
                Lap
              </button>

              <button
                onClick={sw.reset}
                className="btn-ghost px-5 py-3 text-base text-slate-500 hover:text-rose-600"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Lap list */}
          {sw.laps.length > 0 && (
            <div className="card max-w-2xl mx-auto">
              <h3 className="font-semibold text-navy-900 text-sm mb-3">Recorded Laps ({sw.laps.length})</h3>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-2">
                {[...sw.laps].reverse().map(l => (
                  <div key={l.lap} className="py-2.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Lap {l.lap}</span>
                    <span className="font-mono text-primary-600 font-semibold">+{formatMs(l.split)}</span>
                    <span className="font-mono text-slate-400 text-xs">{formatMs(l.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Countdown Timer */}
      {activeTab === 'timer' && (
        <div className="space-y-6">
          <div className="card text-center py-12 bg-white border border-slate-100 shadow-card">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Countdown Timer</p>

            {/* Timer Display */}
            <div className="font-mono text-6xl sm:text-8xl font-bold text-navy-950 tabular-nums my-6 tracking-tight">
              {formatSeconds(cd.remaining)}
            </div>

            {/* Finished Alert */}
            {cd.finished && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold mb-4"
              >
                <Check className="w-4 h-4" /> Time is up! Great focus session.
              </motion.div>
            )}

            {/* Quick preset chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-lg mx-auto">
              {[1, 5, 10, 15, 25, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => cd.reset(mins * 60)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    cd.totalSeconds === mins * 60
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-3">
              {!cd.running ? (
                <button
                  onClick={() => cd.start()}
                  className="btn-primary px-8 py-3 text-base shadow-button"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Start Timer
                </button>
              ) : (
                <button
                  onClick={cd.pause}
                  className="btn-primary bg-amber-500 hover:bg-amber-600 px-8 py-3 text-base"
                >
                  <Pause className="w-5 h-5 fill-white" />
                  Pause
                </button>
              )}

              <button
                onClick={() => cd.reset()}
                className="btn-secondary px-6 py-3 text-base"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
