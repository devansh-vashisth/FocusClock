import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Clock from './pages/Clock'
import Focus from './pages/Focus'
import Analytics from './pages/Analytics'
import Planner from './pages/Planner'
import Friends from './pages/Friends'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* Public / marketing routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* App routes with sidebar */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
