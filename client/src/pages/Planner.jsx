import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, CheckCircle2, Circle, Plus, Trash2,
  Clock, Play, Tag, AlertCircle, Sparkles, Filter
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'

const initialTasks = [
  {
    id: 1,
    title: 'Implement AVL Tree rebalancing algorithm',
    subject: 'Computer Science',
    priority: 'high',
    pomodoros: 3,
    completedPomodoros: 2,
    dueDate: 'Today',
    done: false,
  },
  {
    id: 2,
    title: 'Solve Multivariable Calculus integration exercises (Set 4)',
    subject: 'Mathematics',
    priority: 'medium',
    pomodoros: 2,
    completedPomodoros: 1,
    dueDate: 'Tomorrow',
    done: false,
  },
  {
    id: 3,
    title: 'Read Operating Systems Chapter 7: Memory Management',
    subject: 'Computer Science',
    priority: 'low',
    pomodoros: 2,
    completedPomodoros: 2,
    dueDate: 'Yesterday',
    done: true,
  },
  {
    id: 4,
    title: 'Draft literature review outline for research paper',
    subject: 'Technical Writing',
    priority: 'medium',
    pomodoros: 4,
    completedPomodoros: 0,
    dueDate: 'Oct 28',
    done: false,
  },
  {
    id: 5,
    title: 'Physics Lab 3: Harmonic Motion data synthesis',
    subject: 'Physics',
    priority: 'high',
    pomodoros: 2,
    completedPomodoros: 0,
    dueDate: 'Oct 26',
    done: false,
  },
]

export default function Planner() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all') // 'all' | 'pending' | 'completed'
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState('Computer Science')
  const [newPriority, setNewPriority] = useState('medium')
  const [newPomodoros, setNewPomodoros] = useState(2)

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const addTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      subject: newSubject,
      priority: newPriority,
      pomodoros: Number(newPomodoros) || 2,
      completedPomodoros: 0,
      dueDate: 'Upcoming',
      done: false,
    }
    setTasks([newTask, ...tasks])
    setNewTitle('')
    setShowAddModal(false)
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.done
    if (filter === 'completed') return t.done
    return true
  })

  const completedCount = tasks.filter(t => t.done).length

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Study Planner"
        subtitle="Organize coursework, schedule sessions, and align your goals."
      >
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary text-sm shadow-button"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </PageHeader>

      {/* Filter Chips & Overview */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 text-xs font-semibold">
          {[
            { id: 'all', label: `All (${tasks.length})` },
            { id: 'pending', label: `Active (${tasks.length - completedCount})` },
            { id: 'completed', label: `Done (${completedCount})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === f.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Progress: <span className="text-primary-600 font-bold">{Math.round((completedCount / (tasks.length || 1)) * 100)}%</span> finished
        </div>
      </div>

      {/* Add Task Modal / Card */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card bg-white border-2 border-primary-200 shadow-card p-6"
          >
            <h2 className="text-base font-bold text-navy-900 mb-4">Create New Study Task</h2>
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label className="form-label text-xs">Task Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read chapters 1-3, solve problem set..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input text-sm"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="form-label text-xs">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="form-input text-xs"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Technical Writing">Technical Writing</option>
                    <option value="General Study">General Study</option>
                  </select>
                </div>

                <div>
                  <label className="form-label text-xs">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="form-input text-xs"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="form-label text-xs">Est. Pomodoros (25m each)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newPomodoros}
                    onChange={(e) => setNewPomodoros(e.target.value)}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Task
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="card text-center py-12 text-slate-400">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-600">No tasks in this view</p>
            <p className="text-xs text-slate-400 mt-1">Add a new task or switch filters.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <motion.div
              key={task.id}
              layout
              className={`card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                task.done ? 'bg-slate-50/70 border-slate-200 opacity-75' : 'hover:border-primary-200'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-primary-600 flex-shrink-0"
                >
                  {task.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-primary-500" />
                  )}
                </button>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${task.done ? 'line-through text-slate-400' : 'text-navy-900'}`}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="badge-blue text-[11px] font-medium">{task.subject}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      task.priority === 'high'
                        ? 'bg-rose-50 text-rose-700'
                        : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="text-[11px] text-slate-400">Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions & Pomodoro status */}
              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary-500" />
                  <span>{task.completedPomodoros}/{task.pomodoros} sessions</span>
                </div>

                {!task.done && (
                  <Link
                    to="/focus"
                    className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5 fill-primary-600" />
                    Focus
                  </Link>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
