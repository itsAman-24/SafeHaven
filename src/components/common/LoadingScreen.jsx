function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">SafeHaven</h2>
      <p className="text-gray-600">Loading safety information...</p>
    </div>
  )
}

export default LoadingScreen