import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import AddLocationPage from './pages/AddLocationPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/layout/Footer'
import SafetyAlerts from './components/common/SafetyAlerts'
import { useSafeLocations } from './contexts/SafeLocationsContext'
import LoadingScreen from './components/common/LoadingScreen'

function App() {
  const { currentUser, initializing } = useAuth()
  const { fetchLocations } = useSafeLocations()
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    fetchLocations()
    
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [fetchLocations])

  if (initializing) {
    return <LoadingScreen />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-16">
        {isOffline && (
          <div className="bg-yellow-500 text-white text-center py-2 font-medium">
            You are currently offline. Some features may be limited.
          </div>
        )}
        
        <SafetyAlerts />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/post/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/add-location" 
              element={currentUser ? <AddLocationPage /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/profile" 
              element={currentUser ? <ProfilePage /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/auth" 
              element={!currentUser ? <AuthPage /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default App