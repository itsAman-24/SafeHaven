import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaBars, FaTimes, FaUser, FaMap, FaPlus, FaHome, FaInfoCircle, FaBlog, FaEnvelope } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const { currentUser } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  
  const navLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-primary text-white dark:bg-primary-dark'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
    }`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md transform translate-y-0' 
        : 'bg-white dark:bg-gray-800 transform translate-y-0'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <span className="text-2xl font-bold text-primary dark:text-primary-light">SafeHaven</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={navLinkClass} end>
              <FaHome className="mr-1" /> Home
            </NavLink>
            <NavLink to="/map" className={navLinkClass}>
              <FaMap className="mr-1" /> Safety Map
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              <FaInfoCircle className="mr-1" /> About
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              <FaBlog className="mr-1" /> Blog
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              <FaEnvelope className="mr-1" /> Contact
            </NavLink>
            {currentUser && (
              <NavLink to="/add-location" className={navLinkClass}>
                <FaPlus className="mr-1" /> Add Location
              </NavLink>
            )}
            
            {currentUser ? (
              <NavLink to="/profile" className={navLinkClass}>
                <FaUser className="mr-1" /> Profile
              </NavLink>
            ) : (
              <NavLink to="/auth" className="btn btn-primary dark:bg-primary-dark">
                Sign In
              </NavLink>
            )}
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pt-2 pb-3 space-y-1">
          <NavLink to="/" className={navLinkClass} onClick={closeMenu} end>
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink to="/map" className={navLinkClass} onClick={closeMenu}>
            <FaMap className="mr-2" /> Safety Map
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
            <FaInfoCircle className="mr-2" /> About
          </NavLink>
          <NavLink to="/blog" className={navLinkClass} onClick={closeMenu}>
            <FaBlog className="mr-2" /> Blog
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>
            <FaEnvelope className="mr-2" /> Contact
          </NavLink>
          {currentUser && (
            <NavLink to="/add-location" className={navLinkClass} onClick={closeMenu}>
              <FaPlus className="mr-2" /> Add Location
            </NavLink>
          )}
          
          {currentUser ? (
            <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
              <FaUser className="mr-2" /> Profile
            </NavLink>
          ) : (
            <NavLink 
              to="/auth" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-primary dark:bg-primary-dark text-white"
              onClick={closeMenu}
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar