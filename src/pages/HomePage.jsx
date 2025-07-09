import { useState } from "react";
import { Link } from "react-router-dom";
import { useSafeLocations } from "../contexts/SafeLocationsContext";
import LocationCard from "../components/locations/LocationCard";
import { FaMapMarkedAlt, FaPlus } from "react-icons/fa";

function HomePage() {
  const { locations, loading } = useSafeLocations();
  const [selectedType, setSelectedType] = useState("all");
  const [pageNumber, setPageNumber] = useState(0);

  const LOCATIONS_PER_PAGE = 3;
  
  const filteredLocations =
  selectedType === "all"
  ? locations
  : locations.filter((location) => location.type === selectedType);
  
  const totalPages = Math.ceil(filteredLocations.length / LOCATIONS_PER_PAGE);

  const paginatedLocations = filteredLocations.slice(
    pageNumber * LOCATIONS_PER_PAGE,
    (pageNumber + 1) * LOCATIONS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Find Safety During Crisis
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          SafeHaven helps you locate and share safe spaces, shelters, and
          important safety information during emergencies.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/map" className="btn btn-primary flex items-center gap-2">
            <FaMapMarkedAlt /> View Safety Map
          </Link>
          <Link
            to="/add-location"
            className="btn btn-success flex items-center gap-2"
          >
            <FaPlus /> Add Safe Location
          </Link>
        </div>
      </section>
      <section className="mb-12 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
            Recent Safety Locations
          </h2>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2 max-w-full overflow-x-auto">
            {["all", "shelter", "bunker", "medical", "safe-zone"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedType === type
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {type === "all"
                    ? "All"
                    : type.charAt(0).toUpperCase() +
                      type.slice(1).replace("-", " ")}
                </button>
              )
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.length > 0 ? (
              paginatedLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))
            ) : (
              <div className="col-span-full py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No locations found for the selected filter.
                </p>
              </div>
            )}
          </div>
        )}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            className="btn btn-secondary"
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
            disabled={pageNumber === 0}
          >
            Prev
          </button>
          <span className="text-gray-800 dark:text-gray-200">
            Page {pageNumber + 1} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={pageNumber >= totalPages - 1}
          >
            Next
          </button>
        </div>
        <div className="mt-8 text-center">
          <Link to="/map" className="btn btn-secondary">
            View All on Map
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Safety Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-primary mb-2">
              Emergency Contacts
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex justify-between">
                <span>National Emergency:</span>
                <a href="tel:112" className="text-primary font-medium">
                  112
                </a>
              </li>
              <li className="flex justify-between">
                <span>Ambulance:</span>
                <a href="tel:108" className="text-primary font-medium">
                  108
                </a>
              </li>
              <li className="flex justify-between">
                <span>Police:</span>
                <a href="tel:100" className="text-primary font-medium">
                  100
                </a>
              </li>
              <li className="flex justify-between">
                <span>Fire:</span>
                <a href="tel:101" className="text-primary font-medium">
                  101
                </a>
              </li>
              <li className="flex justify-between">
                <span>Disaster Management:</span>
                <a href="tel:1078" className="text-primary font-medium">
                  1078
                </a>
              </li>
            </ul>
          </div>

          <div className="card p-6 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-primary mb-2">
              Safety Guidelines
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Stay informed through official channels</li>
              <li>Keep emergency supplies ready</li>
              <li>Follow evacuation orders immediately</li>
              <li>Help vulnerable neighbors if possible</li>
              <li>Conserve phone battery for emergencies</li>
              <li>Avoid unnecessary travel during alerts</li>
            </ul>
          </div>

          <div className="card p-6 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-primary mb-2">
              Emergency Kit
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Water (3-day supply)</li>
              <li>Non-perishable food</li>
              <li>First aid supplies</li>
              <li>Medications</li>
              <li>Battery-powered radio</li>
              <li>Flashlight and batteries</li>
              <li>Important documents</li>
              <li>Emergency contact information</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
