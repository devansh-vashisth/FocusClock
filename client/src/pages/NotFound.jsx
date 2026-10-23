import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowLeft, Home, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-primary-50 border border-primary-200 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-sm">
          <Compass className="w-8 h-8 text-primary-600 animate-spin-slow" />
        </div>

        <p className="font-mono text-sm font-bold text-primary-600 tracking-wider uppercase mb-1">
          404 Error
        </p>
        <h1 className="text-3xl font-extrabold text-navy-950 mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Looks like this study path doesn't exist or has moved. Let's get you back to your focus zone.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard" className="btn-primary w-full sm:w-auto justify-center">
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link to="/" className="btn-secondary w-full sm:w-auto justify-center">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
