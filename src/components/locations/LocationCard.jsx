import { format } from "date-fns";
import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";

const getLocationTypeLabel = (type) => {
  switch (type) {
    case "shelter":
      return "Shelter";
    case "bunker":
      return "Bunker";
    case "medical":
      return "Medical Facility";
    case "safe-zone":
      return "Safe Zone";
    case "evacuation":
      return "Evacuation Center";
    case "food":
      return "Food Distribution";
    case "water":
      return "Water Supply";
    default:
      return "Other";
  }
};

const getLocationTypeColor = (type) => {
  switch (type) {
    case "shelter":
      return "bg-blue-100 text-blue-800";
    case "bunker":
      return "bg-green-100 text-green-800";
    case "medical":
      return "bg-red-100 text-red-800";
    case "safe-zone":
      return "bg-yellow-100 text-yellow-800";
    case "evacuation":
      return "bg-purple-100 text-purple-800";
    case "food":
      return "bg-orange-100 text-orange-800";
    case "water":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

function LocationCard({ location }) {
  const getDirections = () => {
    const coordinates = location.coordinates;
    if (!coordinates || !coordinates.lat || !coordinates.lng) {
      console.error("Invalid coordinates for location:", location);
      return;
    }
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`,
      "_blank"
    );
  };

  return (
    <div className="card overflow-hidden transition-all duration-300 hover:shadow-elevation-2">
      <div className="relative">
        <div className="h-40 bg-gray-200 flex items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(https://source.unsplash.com/500x300/?${
                location.type === "shelter"
                  ? "shelter"
                  : location.type === "bunker"
                  ? "bunker"
                  : "safety"
              })`,
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold px-4 text-center">
                {location.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getLocationTypeColor(
              location.type
            )}`}
          >
            {getLocationTypeLabel(location.type)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start mb-2">
          <FaMapMarkerAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-600">{location.address}</p>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {location.description}
        </p>

        {location.facilities && location.facilities.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {location.facilities.map((facility) => (
                <span
                  key={facility}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
          <span>Added by: {location.createdBy}</span>
          {location.createdAt && (
            <span>{format(new Date(location.createdAt), "MMM d, h:mm a")}</span>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
          {/* Directions Button */}
          <button
            onClick={getDirections}
            className="flex items-center justify-center gap-2 rounded-md bg-blue-200 text-blue-800 px-4 py-2 text-sm font-semibold shadow hover:bg-blue-300 dark:bg-blue-600 dark:text-blue-100 dark:hover:bg-blue-500"
          >
            <FaDirections className="text-base" />
            Get Directions
          </button>

          {/* Contact Button */}
          <a
            href={`tel:${location.contact}`}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white shadow ${
              location.contact
                ? "bg-teal-200 text-teal-800 hover:bg-teal-300 dark:bg-teal-600 dark:text-teal-100 dark:hover:bg-teal-500"
                : "bg-primary-light hover:bg-primary dark:bg-primary-dark dark:hover:bg-primary"
            }`}
          >
            <FaMapMarkerAlt className="text-base" />
            {location.contact || "Contact"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
