import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'

import { auth } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const [error, setError] = useState('')

  async function signup(email, password, displayName) {
    try {
      setError('')
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // updating the user profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      })
      
      return userCredential.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function login(email, password) {
    try {
      setError('')
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function logout() {
    try {
      setError('')
      await signOut(auth)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setInitializing(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    initializing,
    error,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}