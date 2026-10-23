import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Timer, BarChart2, Users, CalendarCheck, ArrowRight,
  CheckCircle2, Zap, Clock, Play, ChevronRight, Star
} from 'lucide-react'
import LiveClock from '../components/LiveClock'

const features = [
  {
    icon: Timer,
    title: 'Focus Timer',
    description: 'Pomodoro-powered sessions with smart break reminders and customizable intervals. Stay in the zone longer.',
    color: 'blue',
    badge: 'Most Popular',
  },
  {
    icon: BarChart2,
    title: 'Study Analytics',
    description: 'Track your study patterns with rich charts. See weekly trends, subject breakdowns, and streak data.',
    color: 'purple',
    badge: null,
  },
  {
    icon: Users,
    title: 'Study Together',
    description: 'Join virtual study rooms with peers. Stay accountable and motivated with live presence indicators.',
    color: 'green',
    badge: 'New',
  },
  {
    icon: CalendarCheck,
    title: 'Task Planning',
    description: 'Organize assignments and deadlines. Prioritize tasks and connect them to study sessions seamlessly.',
    color: 'orange',
    badge: null,
  },
]

const colorMap = {
  blue:   { bg: 'bg-primary-50',  icon: 'text-primary-600',  border: 'border-primary-100',  badge: 'badge-blue' },
  purple: { bg: 'bg-purple-50',   icon: 'text-purple-600',   border: 'border-purple-100',   badge: 'badge-purple' },
  green:  { bg: 'bg-emerald-50',  icon: 'text-emerald-600',  border: 'border-emerald-100',  badge: 'badge-green' },
  orange: { bg: 'bg-orange-50',   icon: 'text-orange-600',   border: 'border-orange-100',   badge: 'badge-orange' },
}

const steps = [
  { number: '01', title: 'Create Your Profile', desc: 'Sign up in seconds. Set your study goals and choose your subjects.' },
  { number: '02', title: 'Start a Focus Session', desc: 'Pick a subject, start the Pomodoro timer, and dive deep without distractions.' },
  { number: '03', title: 'Track Your Progress', desc: 'Review your analytics dashboard to see how far you\'ve come and where to improve.' },
]

const testimonials = [
  { name: 'Priya K.', role: 'Medical Student', text: 'FocusClock transformed my study routine. I\'m covering 40% more material per day.', rating: 5 },
  { name: 'James R.', role: 'CS Undergrad', text: 'The study rooms feature is brilliant. Studying with friends online keeps me accountable.', rating: 5 },
  { name: 'Amara L.', role: 'Law Student', text: 'The analytics showed me I was least productive after lunch. Game changer!', rating: 5 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function Landing() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero-bg py-20 sm:py-28 overflow-hidden" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} className="mb-4">
                <span className="badge-blue text-xs font-semibold px-3 py-1.5">
                  🎓 Built for students, by students
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-navy-950 leading-tight mb-6"
              >
                Make Every{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
                  Study Session
                </span>{' '}
                Count.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg"
              >
                Build better study habits, stay focused, and make progress together.
                FocusClock gives you the tools to study smarter — not just longer.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                <Link to="/register" id="hero-get-started" className="btn-primary px-6 py-3 text-base">
                  <Zap className="w-5 h-5" />
                  Get Started — It's Free
                </Link>
                <Link to="/dashboard" id="hero-explore-dashboard" className="btn-secondary px-6 py-3 text-base">
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                {['No credit card needed', 'Free forever plan', '10,000+ students'].map(item => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: live clock preview card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-300/30 to-primary-500/20 blur-2xl -m-4" />
                <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] border border-slate-100 p-8 min-w-[320px]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Clock</p>
                      <p className="text-sm text-slate-400 mt-0.5">Current time preview</p>
                    </div>
                    <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-4.5 h-4.5 text-primary-600 w-[18px] h-[18px]" />
                    </div>
                  </div>
                  <LiveClock size="md" showDate className="mb-6" />
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">Today's Focus</span>
                      <span className="text-xs font-semibold text-primary-600">2h 45m / 4h goal</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '69%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 bg-primary-50 rounded-xl p-2.5 text-center">
                        <p className="text-sm font-bold text-primary-700">6</p>
                        <p className="text-xs text-slate-500">Sessions</p>
                      </div>
                      <div className="flex-1 bg-emerald-50 rounded-xl p-2.5 text-center">
                        <p className="text-sm font-bold text-emerald-700">12</p>
                        <p className="text-xs text-slate-500">Day Streak 🔥</p>
                      </div>
                      <div className="flex-1 bg-purple-50 rounded-xl p-2.5 text-center">
                        <p className="text-sm font-bold text-purple-700">3</p>
                        <p className="text-xs text-slate-500">Friends</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card px-3 py-2 border border-slate-100"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🔥</span>
                    <div>
                      <p className="text-xs font-bold text-navy-900">12 Day Streak!</p>
                      <p className="text-xs text-slate-400">Keep it up</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-3 py-2 border border-slate-100"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">👥</span>
                    <div>
                      <p className="text-xs font-bold text-navy-900">5 friends studying</p>
                      <p className="text-xs text-slate-400">right now</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────── */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-blue mb-3">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mb-4">
              Everything you need to study better
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              From focused work sessions to collaborative rooms — FocusClock is your all-in-one study companion.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const c = colorMap[f.color]
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card group"
                >
                  <div className={`w-12 h-12 ${c.bg} border ${c.border} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <f.icon className={`w-6 h-6 ${c.icon}`} />
                  </div>
                  {f.badge && (
                    <span className={`${c.badge} badge mb-2`}>{f.badge}</span>
                  )}
                  <h3 className="font-bold text-navy-900 text-base mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                  <Link
                    to="/dashboard"
                    className={`mt-4 text-sm font-medium ${c.icon} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────── */}
      <section className="py-20 bg-slate-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-blue mb-3">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mb-4">
              Get started in minutes
            </h2>
            <p className="text-slate-500">Simple steps to transform how you study.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="card text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-4 shadow-button">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-primary-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/register" id="how-it-works-cta" className="btn-primary px-8 py-3 text-base inline-flex">
              <Play className="w-4 h-4" />
              Start Your First Session
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-blue mb-3">Testimonials</span>
            <h2 className="text-3xl font-bold text-navy-950 mb-3">Loved by students worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to study smarter?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students already using FocusClock to build better study habits.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/register" id="cta-register" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg inline-flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Get Started Free
              </Link>
              <Link to="/login" className="border border-primary-400 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors inline-flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
