import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon, Bell, Volume2, User, Clock,
  Shield, Check, Save, Sparkles, Moon, Sun
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('timer') // 'timer' | 'profile' | 'notifications'
  const [saved, setSaved] = useState(false)

  // Timer settings
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [autoStartBreaks, setAutoStartBreaks] = useState(false)
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false)

  // Profile settings
  const [name, setName] = useState('Jane Student')
  const [email, setEmail] = useState('jane@example.com')
  const [institution, setInstitution] = useState('Stanford University')
  const [dailyGoal, setDailyGoal] = useState(4)

  // Notification settings
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [soundChoice, setSoundChoice] = useState('bell')
  const [desktopNotify, setDesktopNotify] = useState(true)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Fine-tune your timer durations, sound triggers, and study profile."
      >
        <button
          onClick={handleSave}
          className="btn-primary text-sm shadow-button flex items-center gap-1.5"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {saved ? 'Preferences Saved!' : 'Save Changes'}
        </button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        {[
          { id: 'timer', label: 'Timer Durations', icon: Clock },
          { id: 'profile', label: 'Student Profile', icon: User },
          { id: 'notifications', label: 'Sound & Alerts', icon: Bell },
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Timer Durations */}
        {activeTab === 'timer' && (
          <div className="space-y-6">
            <SectionCard
              title="Pomodoro Intervals (Minutes)"
              subtitle="Customize the length of focus blocks and break periods"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label text-xs">Focus Duration</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={pomodoroMinutes}
                    onChange={(e) => setPomodoroMinutes(Number(e.target.value))}
                    className="form-input"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Default: 25 minutes</p>
                </div>

                <div>
                  <label className="form-label text-xs">Short Break</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={shortBreakMinutes}
                    onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
                    className="form-input"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Default: 5 minutes</p>
                </div>

                <div>
                  <label className="form-label text-xs">Long Break</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={longBreakMinutes}
                    onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
                    className="form-input"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Default: 15 minutes</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Automation & Flow"
              subtitle="Configure auto-transition rules between sessions"
            >
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Auto-start Breaks</p>
                    <p className="text-xs text-slate-500">Automatically start countdown when focus timer ends</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoStartBreaks}
                    onChange={(e) => setAutoStartBreaks(e.target.checked)}
                    className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                </label>

                <hr className="border-slate-100" />

                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Auto-start Pomodoros</p>
                    <p className="text-xs text-slate-500">Automatically begin next study block after break finishes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoStartPomodoros}
                    onChange={(e) => setAutoStartPomodoros(e.target.checked)}
                    className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                </label>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Tab 2: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <SectionCard title="Student Information" subtitle="Your FocusClock public display details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-xs">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label text-xs">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label text-xs">School / University</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label text-xs">Daily Goal (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Tab 3: Sound & Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <SectionCard title="Audio & Alerts" subtitle="Sound chimes for completions and breaks">
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Chime on Session End</p>
                    <p className="text-xs text-slate-500">Play an audible chime when the timer finishes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                </label>

                <hr className="border-slate-100" />

                <div>
                  <label className="form-label text-xs">Chime Sound Style</label>
                  <select
                    value={soundChoice}
                    onChange={(e) => setSoundChoice(e.target.value)}
                    className="form-input text-sm"
                  >
                    <option value="bell">Tibetan Singing Bowl (Relaxing)</option>
                    <option value="digital">Soft Electronic Chime</option>
                    <option value="bell2">School Bell / Classic</option>
                  </select>
                </div>

                <hr className="border-slate-100" />

                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Desktop Notifications</p>
                    <p className="text-xs text-slate-500">Show a browser popup reminder when returning from break</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={desktopNotify}
                    onChange={(e) => setDesktopNotify(e.target.checked)}
                    className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                </label>
              </div>
            </SectionCard>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button type="submit" className="btn-primary text-sm shadow-button">
            {saved ? 'Saved!' : 'Save All Preferences'}
          </button>
        </div>
      </form>
    </div>
  )
}
