import React from 'react'
import { FaShieldAlt, FaUsers, FaGlobe } from 'react-icons/fa'

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">About SafeHaven</h1>
        
        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-8 text-center">
            SafeHaven is a platform created to support Indian citizens during the ongoing conflict between India and Pakistan. 
            Our mission is to provide real-time access to verified safe locations and resources, ensuring that people can find shelter and safety in times of crisis.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaShieldAlt className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Safety First</h3>
              <p className="text-gray-600 dark:text-gray-200">
                We prioritize providing accurate, verified safety information, allowing citizens to make informed decisions about their safety.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaUsers className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Community Driven</h3>
              <p className="text-gray-600 dark:text-gray-200">
                The platform is driven by community contributions, allowing real-time updates and alerts from users across India.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FaGlobe className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Accessible Anytime</h3>
              <p className="text-gray-600 dark:text-gray-200">
                Available 24/7 with offline support, ensuring that safety information is always accessible when needed.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-100">
            SafeHaven was founded in 2025, inspired by the ongoing tensions between India and Pakistan. The platform was created with the goal of helping Indian citizens find verified safe locations and shelters in the event of emergencies or conflict.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Help</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-100">
            <li>Mapping verified safe locations and shelters across India</li>
            <li>Real-time emergency alerts and updates on safety measures</li>
            <li>Community-driven sharing of safety information</li>
            <li>Providing a directory of emergency contacts</li>
            <li>Offline access to critical safety information in case of network disruption</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Safe Locations</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-2">Coming Soon</div>
              <div className="text-gray-600 dark:text-gray-300">Users Helped</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-300">States Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
