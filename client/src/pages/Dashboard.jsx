import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Timer, Flame, Award, TrendingUp, Play, CheckCircle2,
  Circle, ArrowRight, BookOpen, Users, Plus, Calendar,
  Sparkles, Coffee, Clock
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import SectionCard from '../components/SectionCard'
import LiveClock from '../components/LiveClock'

const weeklyData = [
  { day: 'Mon', hours: 4.2, sessions: 8 },
  { day: 'Tue', hours: 5.5, sessions: 11 },
  { day: 'Wed', hours: 3.8, sessions: 7 },
  { day: 'Thu', hours: 6.1, sessions: 12 },
  { day: 'Fri', hours: 4.9, sessions: 10 },
  { day: 'Sat', hours: 2.5, sessions: 5 },
  { day: 'Sun', hours: 3.5, sessions: 7 },
]

const recentSessions = [
  { id: 1, subject: 'Data Structures & Algorithms', duration: '50m', tag: 'CS', color: 'blue', time: '10:30 AM', status: 'Completed' },
  { id: 2, subject: 'Calculus II — Multivariable', duration: '45m', tag: 'Math', color: 'purple', time: '1:15 PM', status: 'Completed' },
  { id: 3, subject: 'Computer Architecture', duration: '25m', tag: 'CS', color: 'blue', time: '3:45 PM', status: 'Completed' },
  { id: 4, subject: 'Technical Writing & Review', duration: '30m', tag: 'General', color: 'green', time: '5:10 PM', status: 'Completed' },
]

const initialTasks = [
  { id: 1, title: 'Finish Binary Search Trees problem set', subject: 'CS 201', done: false, due: 'Today' },
  { id: 2, title: 'Read Chapter 5: Virtual Memory', subject: 'OS 304', done: true, due: 'Done' },
  { id: 3, title: 'Review Calculus integration techniques', subject: 'Math 152', done: false, due: 'Tomorrow' },
  { id: 4, title: 'Prepare slides for group presentation', subject: 'Ethics', done: false, due: 'Oct 25' },
]

const activeFriends = [
  { id: 1, name: 'Alex Chen', subject: 'Organic Chemistry', avatar: 'AC', mins: '42m' },
  { id: 2, name: 'Sophia Miller', subject: 'Machine Learning', avatar: 'SM', mins: '1h 15m' },
  { id: 3, name: 'David Kumar', subject: 'Macroeconomics', avatar: 'DK', mins: '28m' },
]

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Welcome back, Jane 👋"
        subtitle="You are 75% towards your daily study goal. Keep the momentum going!"
      >
        <Link to="/planner" className="btn-secondary text-sm">
          <Calendar className="w-4 h-4" />
          Planner
        </Link>
        <Link to="/focus" className="btn-primary text-sm shadow-button">
          <Play className="w-4 h-4 fill-white" />
          Start Focus
        </Link>
      </PageHeader>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Timer}
          label="Today's Focus Time"
          value="3h 45m"
          sub="Goal: 5h 00m"
          color="blue"
          progress={75}
        />
        <StatCard
          icon={Flame}
          label="Current Day Streak"
          value="14 Days 🔥"
          sub="Personal best: 21"
          color="orange"
          progress={66}
        />
        <StatCard
          icon={Award}
          label="Sessions Finished"
          value="7 Sessions"
          sub="Avg. 38 mins/session"
          color="purple"
          progress={88}
        />
        <StatCard
          icon={TrendingUp}
          label="Study Efficiency"
          value="94%"
          sub="+6% vs last week"
          color="green"
          progress={94}
        />
      </div>

      {/* Main Grid: 2 columns on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chart & Recent Sessions (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Study Trends Chart */}
          <SectionCard
            title="Weekly Study Activity"
            subtitle="Focus hours logged across the past 7 days"
            action={
              <Link to="/analytics" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `${v}h`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.08)',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val} hours`, 'Focus Time']}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#focusGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* Quick Focus Launchers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/focus"
              className="card bg-gradient-to-br from-primary-50 to-white hover:border-primary-300 p-5 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="badge-blue font-semibold">Standard</span>
                <Play className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-xl font-bold text-navy-900">25 Min</p>
                <p className="text-xs text-slate-500 mt-0.5">Classic Pomodoro Focus</p>
              </div>
            </Link>

            <Link
              to="/focus"
              className="card bg-gradient-to-br from-purple-50 to-white hover:border-purple-300 p-5 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="badge-purple font-semibold">Deep Work</span>
                <Sparkles className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-xl font-bold text-navy-900">50 Min</p>
                <p className="text-xs text-slate-500 mt-0.5">Extended Sprint</p>
              </div>
            </Link>

            <Link
              to="/focus"
              className="card bg-gradient-to-br from-emerald-50 to-white hover:border-emerald-300 p-5 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="badge-green font-semibold">Short Break</span>
                <Coffee className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-xl font-bold text-navy-900">5 Min</p>
                <p className="text-xs text-slate-500 mt-0.5">Rest & Recharge</p>
              </div>
            </Link>
          </div>

          {/* Recent Sessions */}
          <SectionCard
            title="Recent Study Sessions"
            subtitle="Completed sessions from today"
            action={
              <Link to="/analytics" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                All History <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="divide-y divide-slate-100">
              {recentSessions.map((session) => (
                <div key={session.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4.5 h-4.5 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{session.subject}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {session.time} • <span className="text-primary-600 font-medium">{session.tag}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-navy-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {session.duration}
                    </span>
                    <span className="badge-green text-xs hidden sm:inline-flex">
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Clock widget, Tasks, Study Room presence (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Clock Card */}
          <div className="card bg-gradient-to-br from-white via-primary-50/30 to-blue-50/50 border border-primary-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">Live Clock</span>
              <Link to="/clock" className="text-xs text-slate-500 hover:text-primary-600 flex items-center gap-1">
                Full Screen <Clock className="w-3 h-3" />
              </Link>
            </div>
            <div className="py-2">
              <LiveClock size="md" showDate />
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link to="/focus" className="btn-primary w-full justify-center">
                <Play className="w-4 h-4 fill-white" />
                Launch Pomodoro
              </Link>
            </div>
          </div>

          {/* Today's Tasks */}
          <SectionCard
            title="Today's Priorities"
            subtitle={`${tasks.filter(t => t.done).length} of ${tasks.length} done`}
            action={
              <Link to="/planner" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </Link>
            }
          >
            <div className="space-y-2.5">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                    task.done
                      ? 'bg-slate-50 border-slate-200 text-slate-400'
                      : 'bg-white border-slate-100 hover:border-primary-200 hover:bg-primary-50/30'
                  }`}
                >
                  <button className="mt-0.5 flex-shrink-0" aria-label={task.done ? 'Mark pending' : 'Mark complete'}>
                    {task.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 hover:text-primary-500" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium leading-snug ${task.done ? 'line-through text-slate-400' : 'text-navy-900'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 font-medium">{task.subject}</span>
                      <span className="text-[10px] text-primary-600 font-semibold">• {task.due}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Friends Studying Now */}
          <SectionCard
            title="Study Rooms & Peers"
            subtitle="Study with peers for accountability"
            action={
              <Link to="/rooms" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                Join Room <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="space-y-3">
              {activeFriends.map(friend => (
                <div key={friend.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-navy-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {friend.avatar}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy-900 truncate">{friend.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{friend.subject}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
                    {friend.mins}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link to="/rooms" className="btn-secondary w-full justify-center text-xs py-2">
                <Users className="w-3.5 h-3.5" />
                Browse All Rooms
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
