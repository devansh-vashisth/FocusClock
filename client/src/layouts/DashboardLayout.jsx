import { useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Clock, Timer, BarChart2, CalendarCheck,
  Users, Video, Settings, Menu, X, Zap, LogOut, Bell
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Focus Timer', icon: Timer, to: '/focus' },
  { label: 'Clock', icon: Clock, to: '/clock' },
  { label: 'Analytics', icon: BarChart2, to: '/analytics' },
  { label: 'Planner', icon: CalendarCheck, to: '/planner' },
  { label: 'Friends', icon: Users, to: '/friends' },
  { label: 'Study Rooms', icon: Video, to: '/rooms' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-button">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <span className="text-navy-900 font-bold text-base tracking-tight">
            Focus<span className="text-primary-600">Clock</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Sidebar navigation">
        <ul className="space-y-0.5">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-4.5 h-4.5 w-[18px] h-[18px] flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom user area */}
      <div className="px-3 py-4 border-t border-slate-100">
        {/* Demo notice */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl px-3 py-2.5 mb-3">
          <p className="text-xs text-primary-700 font-medium">Demo Mode</p>
          <p className="text-xs text-primary-600 mt-0.5">Sign in to save your progress</p>
        </div>
        {/* User card */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            JS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-navy-900 truncate">Jane Student</p>
            <p className="text-xs text-slate-500 truncate">jane@example.com</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-100 shadow-sm flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 shadow-sm">
          <button
            id="sidebar-toggle"
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
            </button>
            <Link to="/focus" className="btn-primary text-xs py-1.5 px-3">
              <Zap className="w-3.5 h-3.5" />
              Start Focus
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
