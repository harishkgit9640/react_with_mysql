import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
// import AddProject from './pages/admin/AddProject'
import DashboardOverview from './pages/admin/DashboardOverview';
import ContactManagement from './pages/admin/ContactManagement'

// Import pages
import AboutUs from './pages/user/AboutUs'
import Profile from './pages/user/Profile'
import Contacts from './pages/user/Contacts'
import Login from './pages/auth/Login'
import UserDashboard from './pages/admin/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <NavbarComponent />
        <main className="flex-grow-1 container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/home" element={<DashboardOverview />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/dashboard-overview" element={<DashboardOverview />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* Protected User Routes */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-management"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <ContactManagement />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App