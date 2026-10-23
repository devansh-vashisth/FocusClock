import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Video, Users, Plus, Volume2, Sparkles, Headphones,
  BookOpen, ShieldCheck, ArrowRight, Lock
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'

const initialRooms = [
  {
    id: 'deep-work',
    name: 'Silent Library — Deep Work Only',
    description: 'Zero talking, mic off, camera optional. Strict 50/10 Pomodoro cadence for maximum flow.',
    category: 'Silent',
    participants: 18,
    maxParticipants: 30,
    tags: ['Silent', '50/10 Pomodoro', 'No Chat'],
    soundTrack: 'Quiet Ambient',
    isLocked: false,
    color: 'blue',
  },
  {
    id: 'lofi-beats',
    name: 'Late Night Lofi Lounge',
    description: 'Chilled beats, friendly study vibes. Join peers from around the world burning the midnight oil.',
    category: 'Lofi',
    participants: 24,
    maxParticipants: 40,
    tags: ['Lofi Music', '25/5 Pomodoro', 'All Subjects'],
    soundTrack: 'Chillhop Beats',
    isLocked: false,
    color: 'purple',
  },
  {
    id: 'cs-algorithms',
    name: 'CS & Algorithms Prep Hub',
    description: 'LeetCode practice, data structures, systems, and interview preparation study sessions.',
    category: 'STEM',
    participants: 12,
    maxParticipants: 20,
    tags: ['Coding', 'Algorithms', 'STEM'],
    soundTrack: 'Binaural Focus',
    isLocked: false,
    color: 'green',
  },
  {
    id: 'exam-cram',
    name: 'Finals Countdown & Exam Sprint',
    description: 'High-energy accountability for crunch time. Timed sprints with quick water breaks.',
    category: 'Exam',
    participants: 15,
    maxParticipants: 25,
    tags: ['Exam Prep', 'High Intensity', 'Sprint'],
    soundTrack: 'White Noise',
    isLocked: false,
    color: 'orange',
  },
]

export default function Rooms() {
  const [rooms, setRooms] = useState(initialRooms)
  const [filter, setFilter] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [newCategory, setNewCategory] = useState('Silent')

  const categories = ['All', 'Silent', 'Lofi', 'STEM', 'Exam']

  const filteredRooms = filter === 'All'
    ? rooms
    : rooms.filter(r => r.category === filter)

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newRoomName.trim()) return
    const newRoom = {
      id: newRoomName.toLowerCase().replace(/\s+/g, '-'),
      name: newRoomName.trim(),
      description: 'Community study room created by you. Invite friends to study together.',
      category: newCategory,
      participants: 1,
      maxParticipants: 25,
      tags: [newCategory, '25/5 Pomodoro'],
      soundTrack: 'Rain Sounds',
      isLocked: false,
      color: 'blue',
    }
    setRooms([newRoom, ...rooms])
    setNewRoomName('')
    setShowCreateModal(false)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Virtual Study Rooms"
        subtitle="Study alongside students worldwide in live, quiet accountability spaces."
      >
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary text-sm shadow-button"
        >
          <Plus className="w-4 h-4" />
          Create Room
        </button>
      </PageHeader>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === c
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Create Room Form Modal */}
      {showCreateModal && (
        <div className="card bg-white border-2 border-primary-200 shadow-card p-6">
          <h2 className="text-base font-bold text-navy-900 mb-4">Host a New Study Room</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="form-label text-xs">Room Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sunday Morning Reading Club..."
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="form-input text-sm"
                autoFocus
              />
            </div>
            <div>
              <label className="form-label text-xs">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="form-input text-xs"
              >
                <option value="Silent">Silent Focus</option>
                <option value="Lofi">Lofi & Chill</option>
                <option value="STEM">STEM & Coding</option>
                <option value="Exam">Exam Cram</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="btn-ghost text-xs"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs">
                Launch Room
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRooms.map(room => (
          <div
            key={room.id}
            className="card p-6 flex flex-col justify-between hover:border-primary-300 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`badge ${
                  room.color === 'blue' ? 'badge-blue' :
                  room.color === 'purple' ? 'badge-purple' :
                  room.color === 'green' ? 'badge-green' : 'badge-orange'
                }`}>
                  {room.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{room.participants} / {room.maxParticipants} studying</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-primary-600 transition-colors">
                {room.name}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {room.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Headphones className="w-3.5 h-3.5" />
                <span>{room.soundTrack}</span>
              </div>

              <Link
                to={`/rooms/${room.id}`}
                className="btn-primary text-xs py-2 px-4 shadow-sm"
              >
                Join Room
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
