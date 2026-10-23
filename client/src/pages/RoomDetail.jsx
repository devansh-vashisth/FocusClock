import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Users, Volume2, VolumeX, MicOff, VideoOff,
  Sparkles, Send, Play, Pause, RotateCcw, MessageSquare,
  Headphones, Flame, Heart
} from 'lucide-react'
import { formatSeconds } from '../hooks/useTimer'

const mockParticipants = [
  { id: 1, name: 'You (Jane)', avatar: 'JS', subject: 'Data Structures', isSelf: true, activeMins: '32m' },
  { id: 2, name: 'Sophia Miller', avatar: 'SM', subject: 'Machine Learning', isSelf: false, activeMins: '1h 10m' },
  { id: 3, name: 'Alex Chen', avatar: 'AC', subject: 'Algorithms', isSelf: false, activeMins: '48m' },
  { id: 4, name: 'Liam Vance', avatar: 'LV', subject: 'Calculus III', isSelf: false, activeMins: '25m' },
  { id: 5, name: 'Maya Lin', avatar: 'ML', subject: 'Biochemistry', isSelf: false, activeMins: '55m' },
  { id: 6, name: 'Noah Patel', avatar: 'NP', subject: 'Microeconomics', isSelf: false, activeMins: '15m' },
]

const initialFeed = [
  { id: 1, sender: 'System', text: 'Study room session synchronized. 25 min cycle started.', time: '10:00 AM' },
  { id: 2, sender: 'Alex Chen', text: 'Good morning everyone! Let’s crush this session.', time: '10:02 AM' },
  { id: 3, sender: 'Sophia Miller', text: 'Focusing on deep learning architectures today 🚀', time: '10:05 AM' },
]

export default function RoomDetail() {
  const { id } = useParams()
  const roomTitle = id ? id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Study Room'

  const [remaining, setRemaining] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(true)
  const [messages, setMessages] = useState(initialFeed)
  const [chatInput, setChatInput] = useState('')
  const [ambientAudio, setAmbientAudio] = useState(true)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setRemaining(prev => Math.max(0, prev - 1))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const newMsg = {
      id: Date.now(),
      sender: 'Jane (You)',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, newMsg])
    setChatInput('')
  }

  const sendReaction = (emoji) => {
    const newMsg = {
      id: Date.now(),
      sender: 'Jane (You)',
      text: `Sent reaction: ${emoji}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, newMsg])
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/rooms"
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Leave Room"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-navy-950">{roomTitle}</h1>
              <span className="badge-green text-xs font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              6 peers studying right now • Camera optional • Mic muted
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAmbientAudio(!ambientAudio)}
            className="btn-secondary text-xs py-2"
          >
            {ambientAudio ? <Volume2 className="w-4 h-4 text-primary-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            {ambientAudio ? 'Lofi Audio: ON' : 'Audio: OFF'}
          </button>
          <Link to="/rooms" className="btn-ghost text-xs text-rose-600 hover:bg-rose-50 py-2">
            Leave Room
          </Link>
        </div>
      </div>

      {/* Main Grid: Study Room Content (8 cols) & Quiet Chat / Activity (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Synchronized Room Timer Card */}
          <div className="card text-center py-6 bg-gradient-to-r from-primary-900 to-navy-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-semibold tracking-widest text-primary-300 uppercase">
              Shared Pomodoro Cycle
            </span>
            <div className="font-mono text-5xl sm:text-7xl font-extrabold my-3 tabular-nums tracking-tight">
              {formatSeconds(remaining)}
            </div>
            <p className="text-xs text-slate-300">
              Synced with all participants in this room. Focus until the chime!
            </p>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause My Timer' : 'Resume Timer'}
              </button>
              <button
                onClick={() => setRemaining(25 * 60)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-300 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Participant Presence Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-navy-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600" />
                Active Study Desks ({mockParticipants.length})
              </h2>
              <span className="text-xs text-slate-400">All microphones muted</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mockParticipants.map(p => (
                <div
                  key={p.id}
                  className={`card p-4 flex flex-col justify-between border transition-all ${
                    p.isSelf ? 'border-primary-400 bg-primary-50/30' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-navy-900 text-white font-bold text-xs flex items-center justify-center">
                      {p.avatar}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <MicOff className="w-3.5 h-3.5" />
                      <VideoOff className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-navy-900 truncate">
                      {p.name} {p.isSelf && <span className="text-primary-600 font-normal">(You)</span>}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{p.subject}</p>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-mono font-semibold mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {p.activeMins} in zone
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quiet Feed & Reactions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card p-4 flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary-600" />
                <h3 className="text-xs font-bold text-navy-900">Quiet Study Feed</h3>
              </div>
              <span className="text-[10px] text-slate-400">Low distraction</span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
              {messages.map(msg => (
                <div key={msg.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-navy-900">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Quick Cheer / Reaction bar */}
            <div className="flex items-center justify-around py-2 border-t border-slate-100">
              {['👏', '🔥', '☕', '💪', '✨'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => sendReaction(emoji)}
                  className="text-base hover:scale-125 transition-transform"
                  title="Send reaction"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                placeholder="Share your focus goal..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="form-input text-xs py-2"
              />
              <button type="submit" className="btn-primary text-xs px-3">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
