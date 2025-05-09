import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSafeLocations } from "../contexts/SafeLocationsContext";
import LocationCard from "../components/locations/LocationCard";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const { locations } = useSafeLocations();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userLocations = locations.filter(
    (location) =>
      location.createdBy === (currentUser?.displayName || currentUser?.email)
  );

  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out. Please try again.");
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-800 dark:text-gray-200">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <button
          onClick={handleLogout}
          className="btn btn-secondary flex items-center gap-2"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Profile Info & Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
              <FaUser className="text-3xl" />
            </div>
            <h2 className="mb-4 text-center text-xl font-semibold">
              {currentUser.displayName || "User"}
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Account Created
                </p>
                <p className="font-medium">
                  {currentUser.metadata?.creationTime
                    ? new Date(
                        currentUser.metadata.creationTime
                      ).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Locations Added
                </p>
                <p className="font-medium">{userLocations.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Locations */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Your Safe Locations</h2>
            {userLocations.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {userLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  You haven't added any safe locations yet.
                </p>
                <button
                  onClick={() => navigate("/add-location")}
                  className="btn btn-primary"
                >
                  Add First Location
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Volunteer Info */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900 p-6">
        <h3 className="mb-2 text-lg font-medium text-blue-800 dark:text-blue-200">
          Volunteer Information
        </h3>
        <p className="mb-4 text-blue-700 dark:text-blue-300">
          Thank you for being part of our emergency response network. Your
          contributions help keep others safe during crisis situations.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Add Safe Locations",
              desc: "Share information about shelters, bunkers, and other safe areas.",
            },
            {
              title: "Verify Information",
              desc: "Help ensure the accuracy of information shared on the platform.",
            },
            {
              title: "Spread Awareness",
              desc: "Share this platform with others to build a stronger safety network.",
            },
          ].map(({ title, desc }, idx) => (
            <div
              key={idx}
              className="rounded-md bg-white dark:bg-gray-800 p-4 shadow-sm"
            >
              <h4 className="mb-1 font-medium text-primary">{title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
