import { createContext, useContext, useState, useCallback } from 'react'
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  Timestamp,
  GeoPoint,
  onSnapshot
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from './AuthContext'

const SafeLocationsContext = createContext()

export function useSafeLocations() {
  return useContext(SafeLocationsContext)
}

export function SafeLocationsProvider({ children }) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { currentUser } = useAuth()

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      // Create a query to get locations ordered by creation time
      const q = query(collection(db, 'locations'), orderBy('createdAt', 'desc'))
      
      // Set up real-time listener
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const locationData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to ISO string
          createdAt: doc.data().createdAt.toDate().toISOString(),
          // Convert Firestore GeoPoint to lat/lng object
          coordinates: {
            lat: doc.data().coordinates.latitude,
            lng: doc.data().coordinates.longitude
          }
        }))
        setLocations(locationData)
        setLoading(false)
      }, (err) => {
        console.error('Error fetching locations:', err)
        setError('Failed to load safe locations. Please try again later.')
        setLoading(false)
      })
      
      // Return unsubscribe function for cleanup
      return unsubscribe
      
    } catch (err) {
      setError('Failed to load safe locations. Please try again later.')
      console.error(err)
      setLoading(false)
    }
  }, [])

  const addLocation = async (locationData) => {
    try {
      setLoading(true)
      setError('')
      
      if (!currentUser) {
        throw new Error('You must be logged in to add a location')
      }
      
      const newLocation = {
        ...locationData,
        createdAt: Timestamp.now(),
        createdBy: currentUser.displayName || currentUser.email,
        userId: currentUser.uid,
        verified: false,
        // Convert coordinates to GeoPoint for Firestore
        coordinates: new GeoPoint(
          parseFloat(locationData.coordinates.lat), 
          parseFloat(locationData.coordinates.lng)
        )
      }
      
      // Add location to Firestore
      const docRef = await addDoc(collection(db, 'locations'), newLocation)
      
      // Return the added location with proper formatting
      const addedLocation = {
        id: docRef.id,
        ...locationData,
        createdAt: newLocation.createdAt.toDate().toISOString(),
        createdBy: currentUser.displayName || currentUser.email,
        verified: false
      }
      
      return addedLocation
      
    } catch (err) {
      setError(err.message || 'Failed to add location')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = {
    locations,
    loading,
    error,
    fetchLocations,
    addLocation
  }

  return (
    <SafeLocationsContext.Provider value={value}>
      {children}
    </SafeLocationsContext.Provider>
  )
}