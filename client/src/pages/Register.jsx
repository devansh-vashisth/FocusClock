import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, User, Mail, Lock, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 600)
  }

  return (
    <div className="py-12 sm:py-20 px-4 flex items-center justify-center bg-slate-50 min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-button">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Join FocusClock</h1>
          <p className="text-sm text-slate-500 mt-1">
            Build deep study habits, track analytics, and stay accountable.
          </p>
        </div>

        <div className="card p-6 sm:p-8 shadow-card border border-slate-100 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label text-xs">Full name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Jane Student"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input pl-10 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="form-label text-xs">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-10 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="form-label text-xs">Primary field of study</label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="form-input pl-10 text-sm"
                >
                  <option value="Computer Science">Computer Science & Engineering</option>
                  <option value="Mathematics">Mathematics & Statistics</option>
                  <option value="Pre-Med">Medicine & Biology</option>
                  <option value="Law">Law & Humanities</option>
                  <option value="Business">Business & Finance</option>
                  <option value="General">General High School / College</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label text-xs">Create password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-10 text-sm"
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                defaultChecked
                className="w-4 h-4 mt-0.5 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-slate-600 leading-snug">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-2.5 text-sm shadow-button"
            >
              {isLoading ? 'Creating account...' : 'Create Free Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
