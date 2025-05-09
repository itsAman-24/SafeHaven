import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

function MapSearch({ onSearch }) {
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchText)
  }
  
  const clearSearch = () => {
    setSearchText('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex-grow max-w-lg">
      <div className="relative">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Search for locations, areas, or facilities..."
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaSearch />
        </div>
        
        {searchText && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </form>
  )
}

export default MapSearch