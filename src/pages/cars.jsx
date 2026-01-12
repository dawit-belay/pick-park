import { useState,useEffect } from "react";
import { useChecking } from "../context/CheckingContext.jsx";

export default function Cars() {
        const { handleCheckOut,
                plateNumber,
                setPlateNumber,
                message,
                info,
                handleCheckIn,
                formatTime,
                cars,
                setCars,
                handleCarsPage,
                loading,
                error,
                setError,
                setMessage,
                setInfo,
                setLoading
            } = useChecking();



    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


 useEffect(() => {
    handleCarsPage();
  }, []);

    if (loading) return <p className="text-gray-600">Loading cars...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
            Parking Management
          </h1>
          <p className="text-gray-400 text-lg">
            Total Vehicles Parked: <span className="text-white font-bold">{cars.length}</span>
          </p>
        </div>

        {/* Check-In/Out Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Vehicle Check-In / Check-Out</h2>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter License Plate
              </label>
              <div className="flex gap-4 flex-col sm:flex-row">
                <input
                  type="text"
                  id="plate"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="e.g., AB-12-345"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition uppercase font-semibold"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  await handleCheckIn();
                  handleCarsPage();
                }}
                className="flex-1 sm:flex-initial px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 hover:border-green-500/70 text-green-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Check-In
              </button>

              <button
                onClick={async () => {
                  await handleCheckOut();
                  handleCarsPage();
                }}
                className="flex-1 sm:flex-initial px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500/70 text-red-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Check-Out
              </button>

              <button
                onClick={() => {
                  handleCarsPage();
                  setMessage("");
                  setInfo(null);
                }}
                className="flex-1 sm:flex-initial px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Message / Info Modal */}
        {(message || info) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-md border border-white/10 overflow-hidden animate-fade-in">
              <div className="px-6 py-8">
                {message && (
                  <div className={`text-center mb-4 p-4 rounded-lg ${
                    message.includes("✅")
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}>
                    <p className={`text-lg font-semibold ${
                      message.includes("✅") ? "text-green-400" : "text-red-400"
                    }`}>
                      {message}
                    </p>
                  </div>
                )}

                {info && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3 mb-6">
                    {info.start_time && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Check-In:</span>
                        <span className="text-white font-semibold">{formatTime(info.start_time)}</span>
                      </div>
                    )}
                    {info.end_time && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Check-Out:</span>
                        <span className="text-white font-semibold">{formatTime(info.end_time)}</span>
                      </div>
                    )}
                    {info.duration_minutes !== null && (
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white font-semibold">{info.duration_minutes} min</span>
                      </div>
                    )}
                    {info.price !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-green-400 font-bold text-lg">{info.price} Birr</span>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => {
                    setMessage("");
                    setInfo(null);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Table */}
        {cars.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.3 4H3.5C2.67157 4 2 4.67157 2 5.5V9.5H22V5.5C22 4.67157 21.3284 4 20.5 4H19.7M2 9.5V18.5C2 19.3284 2.67157 20 3.5 20H8.5C9.32843 20 10 19.3284 10 18.5V16H14V18.5C14 19.3284 14.6716 20 15.5 20H20.5C21.3284 20 22 19.3284 22 18.5V9.5M6 16C5.44772 16 5 15.5523 5 15C5 14.4477 5.44772 14 6 14C6.55228 14 7 14.4477 7 15C7 15.5523 6.55228 16 6 16ZM18 16C17.4477 16 17 15.5523 17 15C17 14.4477 17.4477 14 18 14C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16Z"
              />
            </svg>
            <p className="text-gray-400 text-lg font-semibold">No vehicles checked in</p>
            <p className="text-gray-500 text-sm mt-2">Check in a vehicle to get started</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      License Plate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Check-In Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cars.map((car) => (
                    <tr key={car.plate_number} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold text-lg">
                          {car.plate_number}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(car.start_time).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                            car.status === "in"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {car.status === "in" ? "🟢 Parked" : "🔴 Checked Out"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {car.status === "in" && (
                          <button
                            onClick={async () => {
                              await handleCheckOut(car.plate_number);
                              handleCarsPage();
                            }}
                            className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 hover:border-orange-500/70 text-orange-400 font-semibold rounded-lg transition-all text-sm"
                          >
                            Check-Out
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}