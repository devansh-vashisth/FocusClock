import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, UserPlus, Flame, Award, Clock, Sparkles,
  Search, Check, Share2, Video, Trophy
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import StatCard from '../components/StatCard'

const initialFriends = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'AC',
    status: 'studying',
    subject: 'Algorithms & Complexity',
    sessionTime: '45m active',
    weeklyHours: 32.5,
    streak: 18,
  },
  {
    id: 2,
    name: 'Sophia Miller',
    avatar: 'SM',
    status: 'studying',
    subject: 'Machine Learning & Stats',
    sessionTime: '1h 20m active',
    weeklyHours: 29.0,
    streak: 14,
  },
  {
    id: 3,
    name: 'David Kumar',
    avatar: 'DK',
    status: 'studying',
    subject: 'Macroeconomics',
    sessionTime: '25m active',
    weeklyHours: 24.5,
    streak: 9,
  },
  {
    id: 4,
    name: 'Emma Watson',
    avatar: 'EW',
    status: 'idle',
    subject: 'Taking a 10m break',
    sessionTime: 'Break',
    weeklyHours: 21.0,
    streak: 11,
  },
  {
    id: 5,
    name: 'Liam Vance',
    avatar: 'LV',
    status: 'offline',
    subject: 'Last active 3h ago',
    sessionTime: 'Offline',
    weeklyHours: 18.2,
    streak: 6,
  },
]

export default function Friends() {
  const [friends, setFriends] = useState(initialFriends)
  const [searchQuery, setSearchQuery] = useState('')
  const [cheeredId, setCheeredId] = useState(null)
  const [activeTab, setActiveTab] = useState('list') // 'list' | 'leaderboard'

  const handleCheer = (id) => {
    setCheeredId(id)
    setTimeout(() => setCheeredId(null), 2000)
  }

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const leaderboard = [...friends].sort((a, b) => b.weeklyHours - a.weeklyHours)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Study Friends & Leaderboard"
        subtitle="Stay accountable together, cheer each other on, and make progress."
      >
        <button className="btn-primary text-sm shadow-button">
          <UserPlus className="w-4 h-4" />
          Add Friend
        </button>
      </PageHeader>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          label="Studying Now"
          value="3 Friends"
          sub="Live presence"
          color="green"
        />
        <StatCard
          icon={Trophy}
          label="Your Weekly Rank"
          value="#2 Overall"
          sub="30.5 hrs logged"
          color="blue"
        />
        <StatCard
          icon={Flame}
          label="Team Streak Score"
          value="58 Days Combined"
          sub="All friends active"
          color="orange"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'list'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Users className="w-4 h-4" />
          Friends Directory
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'leaderboard'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Weekly Leaderboard
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search friends by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10 text-sm"
            />
          </div>

          {/* Friends List */}
          <div className="space-y-3">
            {filtered.map(f => (
              <div
                key={f.id}
                className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary-200 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-600 to-navy-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {f.avatar}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        f.status === 'studying'
                          ? 'bg-emerald-500 ring-2 ring-emerald-100'
                          : f.status === 'idle'
                          ? 'bg-amber-400'
                          : 'bg-slate-300'
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-navy-900 truncate">{f.name}</p>
                      {f.status === 'studying' && (
                        <span className="badge-green text-[10px] py-0 px-2 font-medium">Studying</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{f.subject}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-mono font-bold text-navy-900">{f.sessionTime}</p>
                    <p className="text-[11px] text-slate-400">🔥 {f.streak}d streak</p>
                  </div>

                  <button
                    onClick={() => handleCheer(f.id)}
                    className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                  >
                    {cheeredId === f.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Cheered!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                        <span>Cheer</span>
                      </>
                    )}
                  </button>

                  <Link
                    to="/rooms"
                    className="btn-ghost text-xs py-1.5 px-2.5 text-slate-500 hover:text-primary-600 flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-navy-900 text-base">Weekly Study Leaderboard</h2>
              <p className="text-xs text-slate-500 mt-0.5">Resets every Sunday at midnight</p>
            </div>
            <span className="badge-blue text-xs font-semibold">Active Cycle</span>
          </div>

          <div className="divide-y divide-slate-100">
            {leaderboard.map((user, idx) => (
              <div key={user.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className={`w-6 text-center font-bold text-sm ${
                    idx === 0 ? 'text-amber-500 font-extrabold text-base' :
                    idx === 1 ? 'text-slate-400 font-bold' :
                    idx === 2 ? 'text-amber-700 font-bold' :
                    'text-slate-400'
                  }`}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 flex items-center justify-center flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.streak} day streak</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold font-mono text-primary-600">{user.weeklyHours} hrs</p>
                  <p className="text-[11px] text-slate-400">logged this week</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
