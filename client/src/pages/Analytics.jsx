import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart2, TrendingUp, Clock, Calendar, CheckCircle2,
  Award, Sparkles, Filter, ChevronDown, PieChart as PieIcon
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import SectionCard from '../components/SectionCard'

const dailyData = [
  { day: 'Mon', hours: 4.5, target: 4.0 },
  { day: 'Tue', hours: 5.2, target: 4.0 },
  { day: 'Wed', hours: 3.8, target: 4.0 },
  { day: 'Thu', hours: 6.0, target: 4.0 },
  { day: 'Fri', hours: 4.8, target: 4.0 },
  { day: 'Sat', hours: 2.5, target: 3.0 },
  { day: 'Sun', hours: 3.7, target: 3.0 },
]

const subjectData = [
  { name: 'Computer Science', value: 14.2, color: '#2563eb' },
  { name: 'Calculus & Linear Alg', value: 8.5, color: '#8b5cf6' },
  { name: 'Systems Engineering', value: 5.0, color: '#10b981' },
  { name: 'Technical Writing', value: 2.8, color: '#f59e0b' },
]

const timeOfDayData = [
  { period: 'Morning (6am - 12pm)', hours: 12.5, percent: '41%' },
  { period: 'Afternoon (12pm - 6pm)', hours: 11.0, percent: '36%' },
  { period: 'Evening (6pm - 12am)', hours: 7.0, percent: '23%' },
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Study Analytics"
        subtitle="Track your focus habits, measure consistency, and uncover peak study hours."
      >
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 text-xs font-semibold">
          {['week', 'month', 'year'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                timeRange === r
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              {r === 'week' ? 'This Week' : r === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          label="Total Study Time"
          value="30.5 hrs"
          sub="+3.5h vs last week"
          color="blue"
          progress={88}
        />
        <StatCard
          icon={TrendingUp}
          label="Daily Average"
          value="4.35 hrs"
          sub="Goal: 4.0 hrs/day"
          color="green"
          progress={100}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Sessions"
          value="44 Sessions"
          sub="91% completion rate"
          color="purple"
          progress={91}
        />
        <StatCard
          icon={Award}
          label="Deep Focus Score"
          value="96 / 100"
          sub="Top 5% among peers"
          color="orange"
          progress={96}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Bar Chart (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <SectionCard
            title="Focus Hours by Day"
            subtitle="Actual study time compared to your daily goal"
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    formatter={(val) => [`${val} hrs`, '']}
                  />
                  <Bar dataKey="hours" name="Study Hours" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" name="Daily Target" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* Time of Day Distribution */}
          <SectionCard
            title="Time of Day Distribution"
            subtitle="When your most productive study hours take place"
          >
            <div className="space-y-4">
              {timeOfDayData.map(t => (
                <div key={t.period} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-navy-900">{t.period}</span>
                    <span className="text-primary-600">{t.hours} hrs ({t.percent})</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full"
                      style={{ width: t.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Subject Breakdown & Smart Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <SectionCard
            title="Subject Distribution"
            subtitle="Breakdown of study time per topic"
          >
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`${val} hrs`, 'Time']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {subjectData.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-slate-600 font-medium truncate max-w-[150px]">{s.name}</span>
                  </div>
                  <span className="font-semibold text-navy-900 font-mono">{s.value}h</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* AI Productivity Insights */}
          <SectionCard
            title="Smart Observations"
            subtitle="Automated study habit patterns"
          >
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-xs font-semibold text-primary-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary-600" /> Morning Momentum
                </p>
                <p className="text-xs text-primary-700 mt-1 leading-relaxed">
                  You complete 40% more Pomodoro sessions when starting before 10:00 AM.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Goal Exceeded
                </p>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  Thursday was your strongest session with 6.0 hours logged in total.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
