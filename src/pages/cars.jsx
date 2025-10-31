import { useState,useEffect } from "react";
export default function Cars() {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const BASE_URL = "https://parking-app-13ns.onrender.com";

  const handleCarsPage = async () => {
    try {
        const response = await fetch(`${BASE_URL}/cars`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

         if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    handleCarsPage();
  }, []);

    if (loading) return <p className="text-gray-600">Loading cars...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-20">
        <h1 className="text-2xl font-bold mb-4">
            Cars Currently Parked ({cars.length})
        </h1>
        <button 
            onClick={handleCarsPage}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">
            Refresh
        </button>
       {cars.length === 0 ? (
        <p className="text-gray-500">No cars are currently checked in.</p>
        ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100 border-b">
                    <tr>
                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Plate Number</th>
                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Start Time</th>
                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody>
                   {cars.map((car, index) => (
                        <tr
                         key={car.plate_number || index}
                         className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="px-6 py-3 text-gray-800">{car.plate_number}</td>
                            <td className="px-6 py-3 text-gray-600">
                                {new Date(car.start_time).toLocaleString()}
                            </td>
                            <td className="px-6 py-3">
                                <span
                                className={`px-2 py-1 rounded text-sm font-medium ${
                                    car.status === "in"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                                >
                                {car.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            )}
    </div>
  );
}