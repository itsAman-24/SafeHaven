import { useState } from 'react'
import { FaFilter, FaCheck } from 'react-icons/fa'

function MapFilters({ onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({ types: [] })

  const locationTypes = [
    { value: 'shelter', label: 'Shelters' },
    { value: 'bunker', label: 'Bunkers' },
    { value: 'medical', label: 'Medical Facilities' },
    { value: 'safe-zone', label: 'Safe Zones' },
    { value: 'evacuation', label: 'Evacuation Centers' },
    { value: 'food', label: 'Food Distribution' },
    { value: 'water', label: 'Water Supply' },
  ]

  const toggleFilter = () => setIsOpen(!isOpen)

  const toggleType = (type) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type]

    const newFilters = { ...filters, types: newTypes }
    setFilters(newFilters)
    onChange(newFilters)
  }

  const resetFilters = () => {
    const newFilters = { types: [] }
    setFilters(newFilters)
    onChange(newFilters)
  }

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={toggleFilter}
        className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between sm:justify-start gap-2 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <div className="flex items-center gap-2">
          <FaFilter />
          <span className="text-sm font-medium">Filters</span>
        </div>
        {filters.types.length > 0 && (
          <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {filters.types.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-full sm:w-72 md:w-80 bg-white rounded-lg shadow-lg z-[1001] p-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-3 text-sm">
              Location Types
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {locationTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <button
                    onClick={() => toggleType(type.value)}
                    className={`w-5 h-5 rounded border flex items-center justify-center mr-2 transition ${
                      filters.types.includes(type.value)
                        ? 'bg-primary border-primary text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {filters.types.includes(type.value) && (
                      <FaCheck className="text-xs" />
                    )}
                  </button>
                  <span className="text-sm text-gray-700">{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-3 mt-2">
            <button
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Reset
            </button>
            <button
              onClick={toggleFilter}
              className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapFilters
