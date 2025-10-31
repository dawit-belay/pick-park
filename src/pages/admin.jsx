import { useState,useEffect } from "react";
export default function Admin() {

    const [priceRange, setPriceRange] = useState([]);
    const [minMinutes, setMinMinutes] = useState("");
    const [maxMinutes, setMaxMinutes] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ min_minutes: "", max_minutes: "", price: "" });

    const BASE_URL = "https://parking-app-13ns.onrender.com";

    // Fetch all price ranges
    const handlePriceRange = async () =>{
        try {
      const response = await fetch(`${BASE_URL}/admin/price`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
        if (response.ok) setPriceRange(data);
        else console.error("Failed to fetch price range");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Add new price range
    const handleAddPriceRange = async (e) => {
        e.preventDefault();
        if (!minMinutes || !maxMinutes || !price) {
        alert("Please fill all fields");
        return;
        }

        setLoading(true);
        try {
        const response = await fetch(`${BASE_URL}/admin/price`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            min_minutes: Number(minMinutes),
            max_minutes: Number(maxMinutes),
            price: Number(price),
            }),
        });

        if (response.ok) {
            setMinMinutes("");
            setMaxMinutes("");
            setPrice("");
            handlePriceRange(); // Refresh table
        } else {
            console.error("Failed to add price range");
        }
        } catch (error) {
        console.error("Error:", error);
        } finally {
        setLoading(false);
        }
     };

       // Delete a price range
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this price range?")) return;

        try {
        const response = await fetch(`${BASE_URL}/admin/price/${id}`, {
            method: "DELETE",
        });

        if (response.ok) handlePriceRange();
        else console.error("Failed to delete");
        } catch (error) {
        console.error("Error:", error);
        }
    };

    // Start editing
    const handleEdit = (item) => {
        setEditId(item.id);
        setEditData({
        min_minutes: item.min_minutes,
        max_minutes: item.max_minutes,
        price: item.price,
        });
    };

    // Save edited data
    const handleSave = async (id) => {
        try {
        const response = await fetch(`${BASE_URL}/admin/price/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            min_minutes: Number(editData.min_minutes),
            max_minutes: Number(editData.max_minutes),
            price: Number(editData.price),
            }),
        });

        if (response.ok) {
            setEditId(null);
            handlePriceRange();
        } else {
            console.error("Failed to update");
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };

    useEffect(() => {
        handlePriceRange();
    }, []);

    return (
        <div className="flex flex-col items-center p-20">
            <div className="mb-8">
                <h1 className="text-5xl font-bold">Admin Dashboard</h1>
            </div>
            
        <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-6xl gap-8 px-4">
            {/* the add new price range goes here */}
            <form
                onSubmit={handleAddPriceRange}
                className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="text-xl font-bold mb-4">Add New Price Range</h2>
                <div className="flex flex-col space-y-3">
                <input
                    type="number"
                    placeholder="Min minutes"
                    value={minMinutes}
                    onChange={(e) => setMinMinutes(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                />
                <input
                    type="number"
                    placeholder="Max minutes"
                    value={maxMinutes}
                    onChange={(e) => setMaxMinutes(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Adding..." : "Add Price Range"}
                </button>
                </div>
            </form>


            {/* Table with edit/delete */}
            <div className="w-full lg:w-2/3 overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                {priceRange.length === 0 ? (
                <p className="text-gray-500">No price range set.</p>
                ) : (
                <>
                    <h1 className="text-xl font-bold mb-4">Current Price Ranges</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">min-minute</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">max-min</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceRange.map((p) => (
                            <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                                <td className="px-6 py-0 text-gray-800">
                                {editId === p.id ? (
                                    <input
                                    type="number"
                                    value={editData.min_minutes}
                                    onChange={(e) =>
                                        setEditData({ ...editData, min_minutes: e.target.value })
                                    }
                                    className="border rounded px-3 py-0 my-1 w-24"
                                    />
                                ) : (
                                    p.min_minutes
                                )}
                                </td>
                                <td className="px-6 py-0 text-gray-800">
                                {editId === p.id ? (
                                    <input
                                    type="number"
                                    value={editData.max_minutes}
                                    onChange={(e) =>
                                        setEditData({ ...editData, max_minutes: e.target.value })
                                    }
                                    className="border rounded px-3 py-0 my-1 w-24"
                                    />
                                ) : (
                                    p.max_minutes
                                )}
                                </td>
                                <td className="px-6 py-0 text-gray-800">
                                {editId === p.id ? (
                                    <input
                                    type="number"
                                    value={editData.price}
                                    onChange={(e) =>
                                        setEditData({ ...editData, price: e.target.value })
                                    }
                                    className="border rounded px-3 py-0 my-1 w-24"
                                    />
                                ) : (
                                    p.price
                                )}
                                </td>
                                <td className="px-6 py-0 flex space-x-3">
                                {editId === p.id ? (
                                    <>
                                    <button
                                        onClick={() => handleSave(p.id)}
                                        className="bg-green-600 text-white px-3 py-0 my-1 rounded hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditId(null)}
                                        className="bg-gray-400 text-white px-3 py-0 my-1 rounded hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    </>
                                ) : (
                                    <>
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="bg-yellow-100 text-black px-3 py-0 my-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="bg-red-100 text-black px-3 py-0 my-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    </>
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                
                )}
            </div>
        </div>
        
    </div>
    )
}