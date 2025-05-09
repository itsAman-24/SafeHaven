import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useSafeLocations } from '../contexts/SafeLocationsContext'
import { useAuth } from '../contexts/AuthContext'
import MapLocationDetails from '../components/map/MapLocationDetails'
import MapFilters from '../components/map/MapFilters'
import MapSearch from '../components/map/MapSearch'
import { FaLocationArrow } from 'react-icons/fa'
import { divIcon } from 'leaflet'

const getCustomIcon = (type, verified) => {
  let iconHtml = '📌'
let iconColor = ''

switch (type.toLowerCase()) {
  case 'shelter':
    iconColor = 'blue' 
    iconHtml = '🏠'
    break
  case 'bunker':
    iconColor = 'green'
    iconHtml = '🛡️'
    break
  case 'medical facility':
    iconColor = 'red' 
    iconHtml = '🩺'
    break
  case 'safe-zone':
    iconColor = 'orange' 
    iconHtml = '🛟'
    break
  case 'evacuation center':
    iconColor = 'purple' 
    iconHtml = '🏃‍♂️'
    break
  case 'food distribution':
    iconColor = 'Yellow' 
    iconHtml = '🍽️'
    break
  case 'water supply':
    iconColor = 'skyblue' 
    iconHtml = '🚰'
    break
  case 'other':
    iconColor = 'gray' 
    iconHtml = '📍'
    break
  default:
    iconColor = 'black'
    iconHtml = '📌'
}


  return divIcon({
    html: `<div class="marker-icon ${verified ? 'verified' : ''}" style="background-color: ${iconColor};">${iconHtml}</div>`,
    className: 'custom-marker-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  })
}

// Component to center map to user's location
function LocateUser() {
  const map = useMap()

  const centerToUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          map.flyTo([latitude, longitude], 14)
        },
        error => {
          console.error('Error getting location:', error.message)
        },
        { enableHighAccuracy: true }
      )
    }
  }

  return (
    <button 
      onClick={centerToUserLocation}
      className="absolute z-[1000] bottom-24 right-4 bg-white p-2 rounded-full shadow-lg"
      title="Center to your location"
    >
      <FaLocationArrow className="text-primary" />
    </button>
  )
}


function MapPage() {
  const { locations, loading } = useSafeLocations()
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filteredLocations, setFilteredLocations] = useState([])
  const [filters, setFilters] = useState({
    types: [],
    verifiedOnly: false,
    searchText: ''
  })
  const mapRef = useRef(null)

  // useEffect(() => {
  //   console.log("All locations from context:", locations)
  // }, [locations])
  

  const defaultCenter = [20.5937, 78.9629]
  const defaultZoom = 5

  useEffect(() => {
    let filtered = [...locations]
    
    if (filters.types.length > 0) {
      filtered = filtered.filter(loc => filters.types.includes(loc.type))
    }
    
    if (filters.verifiedOnly) {
      filtered = filtered.filter(loc => loc.verified)
    }
    
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase()
      filtered = filtered.filter(loc => 
        loc.title.toLowerCase().includes(searchLower) || 
        loc.address.toLowerCase().includes(searchLower) ||
        loc.description.toLowerCase().includes(searchLower)
      )
    }
    
    setFilteredLocations(filtered)
  }, [locations, filters])

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    if (mapRef.current) {
      mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], 15)
    }
  }

  const clearSelectedLocation = () => {
    setSelectedLocation(null)
  }
  
  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }))
  }

  return (
    <div className="h-[calc(100vh-64px)] relative">
      <div className="z-[1000] px-4 pt-6 flex flex-col md:flex-row gap-3 mb-4">
        <MapSearch onSearch={(searchText) => handleFilterChange({ searchText })} />
        <MapFilters onChange={handleFilterChange} />
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: "80%", width: "100%" }}
        whenCreated={map => { mapRef.current = map }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
                
        {filteredLocations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={getCustomIcon(location.type, location.verified)}
            eventHandlers={{
              click: () => handleLocationSelect(location)
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{location.title}</h3>
                <p className="text-sm">{location.address}</p>
                <button 
                  className="text-xs text-primary mt-1 hover:underline" 
                  onClick={() => handleLocationSelect(location)}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {selectedLocation && (
        <MapLocationDetails 
          location={selectedLocation} 
          onClose={clearSelectedLocation} 
        />
      )}
      
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-[999]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}

export default MapPage