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



    // const BASE_URL = "https://parking-app-13ns.onrender.com";
    const BASE_URL = "http://localhost:8000";


 useEffect(() => {
    handleCarsPage();
  }, []);

    if (loading) return <p className="text-gray-600">Loading cars...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

  return (

    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 px-4 pb-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800 tracking-tight">
        Cars Currently Parked <span className="text-blue-600">({cars.length})</span>
      </h1>

      {/* --- Check-In Card --- */}
      <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 w-full max-w-2xl mb-10 transition hover:shadow-2xl">
        <label
          htmlFor="plate"
          className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg text-gray-700 mb-6"
        >
          <span className="font-medium">Enter plate number:</span>
          <input
            type="text"
            id="plate"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="e.g. AB12345"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </label>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={async () => {
              await handleCheckIn();
              handleCarsPage();
            }}
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Check-In
          </button>

          <button
            onClick={async () => {
              await handleCheckOut();
              handleCarsPage();
            }}
            className="px-5 py-2.5 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition"
          >
            Check-Out
          </button>

          <button
            onClick={() => {
              handleCarsPage();
              setMessage("");
              setInfo(null);
            }}
            className="px-5 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* --- Message / Info Modal --- */}
      {(message || info) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative border border-gray-100 animate-fade-in">
            {message && (
              <p className="text-lg font-semibold text-center text-gray-800 mb-4">
                {message}
              </p>
            )}

            {info && (
              <div className="text-base border-t border-gray-200 pt-4 space-y-2 text-gray-700">
                {info.start_time && (
                  <p>🕒 <span className="font-medium">Start:</span> {formatTime(info.start_time)}</p>
                )}
                {info.end_time && (
                  <p>🏁 <span className="font-medium">End:</span> {formatTime(info.end_time)}</p>
                )}
                {info.duration_minutes !== null && (
                  <p>⏳ <span className="font-medium">Duration:</span> {info.duration_minutes} min</p>
                )}
                {info.price !== null && (
                  <p>💰 <span className="font-medium">Price:</span> {info.price} Birr</p>
                )}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setMessage("");
                  setInfo(null);
                }}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Cars Table --- */}
      {cars.length === 0 ? (
        <p className="text-gray-500 mt-8">No cars are currently checked in.</p>
      ) : (
        <div className="w-full max-w-5xl overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Plate Number</th>
                <th className="px-6 py-3 text-left font-semibold">Start Time</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Checkout</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr
                  key={car.plate_number || index}
                  className="hover:bg-gray-50 transition border-t border-gray-100"
                >
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {car.plate_number}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(car.start_time).toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        car.status === "in"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-yellow-600 transition"
                      onClick={async () => {
                        await handleCheckOut(car.plate_number);
                        handleCarsPage();
                      }}
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}