import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX,
  Sparkles, CheckCircle2, BookOpen, Coffee, Flame, Settings2
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import { formatSeconds } from '../hooks/useTimer'

const MODES = {
  pomodoro: { label: 'Pomodoro', minutes: 25, color: 'primary' },
  shortBreak: { label: 'Short Break', minutes: 5, color: 'emerald' },
  longBreak: { label: 'Long Break', minutes: 15, color: 'purple' },
}

const subjects = [
  'Data Structures & Algorithms',
  'Calculus II',
  'Computer Systems & OS',
  'Physics Mechanics',
  'Technical Writing',
  'Language Learning',
]

export default function Focus() {
  const [mode, setMode] = useState('pomodoro') // 'pomodoro' | 'shortBreak' | 'longBreak'
  const [totalSeconds, setTotalSeconds] = useState(25 * 60)
  const [remaining, setRemaining] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(3)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [currentTask, setCurrentTask] = useState('Solve Dynamic Programming practice problems')
  const [soundEnabled, setSoundEnabled] = useState(true)

  const timerRef = useRef(null)
  const endTimeRef = useRef(null)

  // Switch modes
  const handleModeChange = (newMode) => {
    clearInterval(timerRef.current)
    setIsRunning(false)
    setMode(newMode)
    const secs = MODES[newMode].minutes * 60
    setTotalSeconds(secs)
    setRemaining(secs)
  }

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      endTimeRef.current = Date.now() + remaining * 1000
      timerRef.current = setInterval(() => {
        const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
        setRemaining(left)
        if (left <= 0) {
          clearInterval(timerRef.current)
          setIsRunning(false)
          if (mode === 'pomodoro') {
            setCompletedSessions(prev => prev + 1)
          }
        }
      }, 250)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning])

  const toggleTimer = () => setIsRunning(prev => !prev)

  const resetTimer = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
    const secs = MODES[mode].minutes * 60
    setTotalSeconds(secs)
    setRemaining(secs)
  }

  const skipTimer = () => {
    resetTimer()
    if (mode === 'pomodoro') {
      handleModeChange(completedSessions % 4 === 3 ? 'longBreak' : 'shortBreak')
    } else {
      handleModeChange('pomodoro')
    }
  }

  // Progress percentage calculation
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Focus Timer"
        subtitle="Eliminate distractions, focus deeply, and track your study intervals."
      >
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="btn-secondary text-xs"
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-primary-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          {soundEnabled ? 'Audio Chime ON' : 'Muted'}
        </button>
      </PageHeader>

      {/* Main Focus Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Timer & Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card text-center py-8 sm:py-12 bg-white border border-slate-100 shadow-card relative overflow-hidden">
            {/* Background subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-100/30 rounded-full blur-3xl pointer-events-none" />

            {/* Mode selection buttons */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl mb-8 relative z-10">
              {Object.entries(MODES).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleModeChange(key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    mode === key
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {config.label} ({config.minutes}m)
                </button>
              ))}
            </div>

            {/* Circular Timer Display */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
                {/* Background Ring */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Active Progress Ring */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  stroke={mode === 'shortBreak' ? '#10b981' : mode === 'longBreak' ? '#8b5cf6' : '#2563eb'}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Time in center */}
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-5xl sm:text-6xl font-extrabold text-navy-950 tabular-nums tracking-tight">
                  {formatSeconds(remaining)}
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 mt-2">
                  {isRunning ? 'Session Active' : 'Ready'}
                </span>
                <span className="text-xs text-primary-600 font-medium mt-1">
                  Session {completedSessions + 1} of 4
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8 relative z-10">
              <button
                onClick={toggleTimer}
                className={`btn-primary px-9 py-3.5 text-base shadow-button ${
                  isRunning ? 'bg-amber-500 hover:bg-amber-600' : ''
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-white" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    Start Focus
                  </>
                )}
              </button>

              <button
                onClick={skipTimer}
                className="btn-secondary px-5 py-3.5 text-sm"
                title="Skip to next session"
              >
                <SkipForward className="w-4 h-4" />
                Skip
              </button>

              <button
                onClick={resetTimer}
                className="btn-ghost px-4 py-3.5 text-slate-500 hover:text-rose-600"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Focus Task & Subject Context (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Subject & Task Config */}
          <SectionCard title="Current Focus Target" subtitle="Tie this session to a specific topic">
            <div className="space-y-4">
              <div>
                <label className="form-label text-xs">Subject / Topic</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="form-input text-xs"
                >
                  {subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label text-xs">Task Objective</label>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  className="form-input text-xs"
                  placeholder="What are you working on?"
                />
              </div>

              <div className="p-3 bg-primary-50/60 rounded-xl border border-primary-100 flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <p className="text-xs text-navy-900 font-medium">
                  {completedSessions} Pomodoros logged today!
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Deep Focus Best Practices */}
          <SectionCard title="Focus Protocol" subtitle="Simple rules for maximum retention">
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>Keep phone on Do Not Disturb and out of sight.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>Single-task only: close unrelated tabs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>Take real breaks: stand up, hydrate, stretch.</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
