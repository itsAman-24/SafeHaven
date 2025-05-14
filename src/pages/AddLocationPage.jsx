import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useSafeLocations } from "../contexts/SafeLocationsContext";
import { useAuth } from "../contexts/AuthContext";
import { FaSave, FaTimes, FaMapMarkerAlt } from "react-icons/fa";

// Location type options
const LOCATION_TYPES = [
  { value: "shelter", label: "Shelter" },
  { value: "bunker", label: "Bunker" },
  { value: "medical", label: "Medical Facility" },
  { value: "safe-zone", label: "Safe Zone" },
  { value: "evacuation", label: "Evacuation Center" },
  { value: "food", label: "Food Distribution" },
  { value: "water", label: "Water Supply" },
  { value: "other", label: "Other" },
];

// Facility options
const FACILITY_OPTIONS = [
  { value: "water", label: "Water" },
  { value: "food", label: "Food" },
  { value: "medical", label: "Medical Aid" },
  { value: "electricity", label: "Electricity" },
  { value: "shelter", label: "Shelter" },
  { value: "toilet", label: "Toilets" },
  { value: "charging", label: "Phone Charging" },
  { value: "wifi", label: "WiFi" },
  { value: "sleeping", label: "Sleeping Area" },
  { value: "ambulance", label: "Ambulance" },
];

// Map marker selector component
function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? <Marker position={position} /> : null;
}

function AddLocationPage() {
  const navigate = useNavigate();
  const { addLocation } = useSafeLocations();
  const { currentUser } = useAuth();
  const [mapPosition, setMapPosition] = useState(null);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");

  // setting thed Default map center (India)
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "shelter",
    description: "",
    address: "",
    capacity: "",
    facilities: [],
    contact: "",
    coordinates: { lat: "", lng: "" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility];

      return {
        ...prev,
        facilities,
      };
    });
  };

  const handlePositionChange = (position) => {
    setMapPosition(position);
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        lat: position.lat,
        lng: position.lng,
      },
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchAddress.trim()) {
      const newDelhi = { lat: 28.6139, lng: 77.209 };
      handlePositionChange(newDelhi);
      setFormData((prev) => ({
        ...prev,
        address: searchAddress,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.address.trim()) return "Address is required";
    if (!formData.contact.trim()) return "Contact information is required";
    if (!mapPosition) return "Please select a location on the map";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    try {
      setLoading(true);
      await addLocation(formData);
      navigate("/map");
    } catch (error) {
      setFormError(error.message || "Failed to add location");
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPos = { lat: latitude, lng: longitude };
          handlePositionChange(currentPos);
        },
        (error) => {
          setFormError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setFormError("Geolocation is not supported by your browser");
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">You must be logged in to add a safe location.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Safe Location
        </h1>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <FaTimes className="mr-1" /> Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {formError}
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="label text-gray-700 dark:text-gray-200"
              >
                Location Name*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Government Shelter, Community Bunker"
                required
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="label text-gray-700 dark:text-gray-200"
              >
                Location Type*
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="input bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
                required
              >
                {LOCATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="label text-gray-700 dark:text-gray-200"
              >
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
                placeholder="Provide details about this location, access information, and any special instructions"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="label text-gray-700 dark:text-gray-200"
              >
                Address*
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
                placeholder="Detailed address or landmark information"
                required
              />
            </div>

            <div>
              <label
                htmlFor="capacity"
                className="label text-gray-700 dark:text-gray-200"
              >
                Capacity (if known)
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="input bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
                placeholder="Approximate number of people"
                min="0"
              />
            </div>

            <div>
              <label className="label text-gray-700 dark:text-gray-200">
                Available Facilities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FACILITY_OPTIONS.map((facility) => (
                  <div key={facility.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`facility-${facility.value}`}
                      checked={formData.facilities.includes(facility.value)}
                      onChange={() => handleFacilityChange(facility.value)}
                      className="mr-2 h-4 w-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400"
                    />
                    <label
                      htmlFor={`facility-${facility.value}`}
                      className="text-sm text-gray-800 dark:text-gray-200"
                    >
                      {facility.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact"
                className="label text-gray-700 dark:text-gray-200"
              >
                Contact Number*
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="input bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              ) : (
                <FaSave />
              )}
              Save Location
            </button>
          </form>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-4">
            <label className="label text-gray-700 dark:text-gray-200">
              Select Location on Map*
            </label>
            <div className="flex gap-2 mb-2">
              <div className="flex-grow">
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="input w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder="Search for an address"
                />
              </div>
              <button
                onClick={handleSearch}
                className="btn btn-secondary bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Search
              </button>
              <button
                type="button"
                onClick={useCurrentLocation}
                className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                title="Use my current location"
              >
                <FaMapMarkerAlt />
              </button>
            </div>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden border border-gray-300">
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker
                position={mapPosition}
                setPosition={handlePositionChange}
              />
            </MapContainer>
          </div>

          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Click on the map to set the location precisely. This will help
            others find this safe location.
          </div>

          {mapPosition && (
            <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded-md text-sm">
              <div className="font-medium text-green-800">
                Location Selected:
              </div>
              <div className="text-green-700">
                Latitude: {mapPosition.lat.toFixed(6)}, Longitude:{" "}
                {mapPosition.lng.toFixed(6)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLocationPage;
