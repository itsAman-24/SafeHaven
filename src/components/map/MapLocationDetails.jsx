import { FaTimesCircle, FaPhone, FaDirections } from 'react-icons/fa'
import { format } from 'date-fns'

function MapLocationDetails({ location, onClose }) {
  const getDirections = () => {
    const { lat, lng } = location.coordinates
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank')
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl overflow-hidden z-[1000] max-h-[70vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold truncate pr-6">{location.title}</h2>
        <button 
          onClick={onClose}
          className="btn btn-secondary p-2 rounded-full"
          aria-label="Close details"
        >
          <FaTimesCircle />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4 flex items-start gap-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            location.type === 'shelter' ? 'bg-blue-100 text-blue-800' :
            location.type === 'bunker' ? 'bg-green-100 text-green-800' :
            location.type === 'medical' ? 'bg-red-100 text-red-800' :
            location.type === 'safe-zone' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {location.type === 'shelter' ? 'Shelter' :
             location.type === 'bunker' ? 'Bunker' :
             location.type === 'medical' ? 'Medical Facility' :
             location.type === 'safe-zone' ? 'Safe Zone' :
             'Other'}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
          <p className="text-gray-800">{location.address}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
          <p className="text-gray-800">{location.description}</p>
        </div>
        
        {location.capacity && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Capacity</h3>
            <p className="text-gray-800">Approximately {location.capacity} people</p>
          </div>
        )}
        
        {location.facilities && location.facilities.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Available Facilities</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {location.facilities.map(facility => (
                <span key={facility} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {facility}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {location.contact && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contact</h3>
            <a 
              href={`tel:${location.contact}`} 
              className="text-primary flex items-center"
            >
              <FaPhone className="mr-2" /> {location.contact}
            </a>
          </div>
        )}
        
        <div className="mt-6">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={getDirections}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaDirections /> Get Directions
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t text-xs text-gray-500 flex justify-between">
          <span>Added by: {location.createdBy}</span>
          <span>{format(new Date(location.createdAt), 'MMM d, yyyy')}</span>
        </div>
      </div>
    </div>
  )
}

export default MapLocationDetails