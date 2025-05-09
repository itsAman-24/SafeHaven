import { useState, useEffect } from 'react'
import { FaExclamationCircle, FaTimes } from 'react-icons/fa'
import DEMO_ALERTS from '../../../Util/Alert'

function SafetyAlerts() {
  const [alerts, setAlerts] = useState([])
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    const saved = localStorage.getItem('dismissedAlerts')
    return saved ? JSON.parse(saved) : []
  })
  
  useEffect(() => {
    const activeAlerts = DEMO_ALERTS.filter(
      alert => !dismissedAlerts.includes(alert.id)
    )
    setAlerts(activeAlerts)
  }, [dismissedAlerts])
  
  const dismissAlert = (alertId) => {
    const newDismissedAlerts = [...dismissedAlerts, alertId]
    setDismissedAlerts(newDismissedAlerts)
    localStorage.setItem('dismissedAlerts', JSON.stringify(newDismissedAlerts))
  }
  
  if (alerts.length === 0) return null
  
  return (
    <div className="fixed bottom-4 right-4 z-[999] max-w-md">
      {alerts.map(alert => (
        <div 
          key={alert.id}
          className={`p-4 mb-2 rounded-lg shadow-lg animate-pulse-slow ${
            alert.type === 'danger' 
              ? 'bg-red-600 text-white' 
              : 'bg-yellow-500 text-white'
          }`}
        >
          <button 
            onClick={() => dismissAlert(alert.id)}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
            aria-label="Dismiss alert"
          >
            <FaTimes />
          </button>
          
          <div className="flex items-start">
            <FaExclamationCircle className="text-xl mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold">{alert.title}</h3>
              <p className="text-sm">{alert.message}</p>
              <div className="mt-1 text-xs opacity-80">
                {new Date(alert.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SafetyAlerts