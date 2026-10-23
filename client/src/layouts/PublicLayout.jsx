import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Clock, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
]

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-nav border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="FocusClock Home">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-button group-hover:bg-primary-700 transition-colors">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-navy-900 font-bold text-lg tracking-tight">
              Focus<span className="text-primary-600">Clock</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-ghost">Sign In</Link>
            <Link to="/register" className="btn-primary">
              <Zap className="w-4 h-4" />
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-slate-700 font-medium py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-slate-100" />
                <Link to="/login" className="btn-ghost justify-center" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>
                  <Zap className="w-4 h-4" />
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white font-bold">Focus<span className="text-primary-400">Clock</span></span>
              </Link>
              <p className="text-sm leading-relaxed">
                Built to help students focus deeper, track progress, and study smarter.
              </p>
            </div>

            {[
              {
                title: 'Product',
                links: [
                  { label: 'Dashboard', to: '/dashboard' },
                  { label: 'Focus Timer', to: '/focus' },
                  { label: 'Analytics', to: '/analytics' },
                  { label: 'Study Rooms', to: '/rooms' },
                ],
              },
              {
                title: 'Account',
                links: [
                  { label: 'Sign Up', to: '/register' },
                  { label: 'Sign In', to: '/login' },
                  { label: 'Settings', to: '/settings' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', to: '/' },
                  { label: 'Privacy Policy', to: '/' },
                  { label: 'Terms of Service', to: '/' },
                ],
              },
            ].map(section => (
              <div key={section.title}>
                <h3 className="text-white font-semibold text-sm mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map(l => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs">© 2026 FocusClock. All rights reserved.</p>
            <p className="text-xs">Made with ❤️ for students everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
