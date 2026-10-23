import { motion } from 'framer-motion'

/**
 * Reusable stat card for dashboard metrics.
 * Props: icon, label, value, sub, color (blue|green|orange|purple)
 */
const colorMap = {
  blue:   { bg: 'bg-primary-50', icon: 'text-primary-600', border: 'border-primary-100', bar: 'bg-primary-500' },
  green:  { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100', bar: 'bg-emerald-500' },
  orange: { bg: 'bg-orange-50',  icon: 'text-orange-600',  border: 'border-orange-100',  bar: 'bg-orange-500'  },
  purple: { bg: 'bg-purple-50',  icon: 'text-purple-600',  border: 'border-purple-100',  bar: 'bg-purple-500'  },
}

export default function StatCard({ icon: Icon, label, value, sub, color = 'blue', progress }) {
  const c = colorMap[color] ?? colorMap.blue

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card group cursor-default"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
          {Icon && <Icon className={`w-5 h-5 ${c.icon}`} />}
        </div>
        {sub && <span className="text-xs text-slate-400 font-medium">{sub}</span>}
      </div>
      <p className="text-2xl font-bold text-navy-900 leading-none mb-1">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${c.bar}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">{Math.round(progress)}% of daily goal</p>
        </div>
      )}
    </motion.div>
  )
}
