import { useState,useEffect } from "react";
export default function Admin() {

const [priceRange, setPriceRange] = useState([]);
const [minMinutes, setMinMinutes] = useState("");
const [maxMinutes, setMaxMinutes] = useState("");
const [price, setPrice] = useState("");
const [loading, setLoading] = useState(false);
const [editId, setEditId] = useState(null);
const [editData, setEditData] = useState({ min_minutes: "", max_minutes: "", price: "" });

// const BASE_URL = "https://parking-app-13ns.onrender.com";
const BASE_URL = "http://localhost:8000";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8 pt-20">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h1>
                <p className="text-slate-600 text-lg">Manage your pricing structure</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Add New Price Range Form */}
                <form
                    onSubmit={handleAddPriceRange}
                    className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-slate-200 p-6 space-y-5"
                >
                    <div className="border-b border-slate-200 pb-4">
                        <h2 className="text-xl font-bold text-slate-800">Add New Price Range</h2>
                        <p className="text-sm text-slate-500 mt-1">Create a new pricing tier</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Min Minutes
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                value={minMinutes}
                                onChange={(e) => setMinMinutes(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Max Minutes
                            </label>
                            <input
                                type="number"
                                placeholder="30"
                                value={maxMinutes}
                                onChange={(e) => setMaxMinutes(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Price (Birr)
                            </label>
                            <input
                                type="number"
                                placeholder="10.00"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-200 ${
                                loading ? "opacity-50 cursor-not-allowed" : "shadow-md hover:shadow-lg"
                            }`}
                        >
                            {loading ? "Adding..." : "Add Price Range"}
                        </button>
                    </div>
                </form>

                {/* Table with edit/delete */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="border-b border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-slate-800">Current Price Ranges</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {priceRange.length} {priceRange.length === 1 ? "range" : "ranges"} configured
                        </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {priceRange.length === 0 ? (
                            <div className="text-center py-16 px-4">
                                <p className="text-slate-400 text-lg">No price ranges configured yet.</p>
                                <p className="text-slate-400 text-sm mt-2">Add your first pricing tier to get started.</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                            Min Minutes
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                            Max Minutes
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                            Price (Birr)
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {priceRange.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editId === p.id ? (
                                                    <input
                                                        type="number"
                                                        value={editData.min_minutes}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, min_minutes: e.target.value })
                                                        }
                                                        className="border border-slate-300 rounded px-3 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <span className="text-slate-800 font-medium">{p.min_minutes}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editId === p.id ? (
                                                    <input
                                                        type="number"
                                                        value={editData.max_minutes}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, max_minutes: e.target.value })
                                                        }
                                                        className="border border-slate-300 rounded px-3 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <span className="text-slate-800 font-medium">{p.max_minutes}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editId === p.id ? (
                                                    <input
                                                        type="number"
                                                        value={editData.price}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, price: e.target.value })
                                                        }
                                                        className="border border-slate-300 rounded px-3 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <span className="text-slate-800 font-medium">{Number(p.price).toFixed(2)}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    {editId === p.id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleSave(p.id)}
                                                                className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition font-medium text-sm"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditId(null)}
                                                                className="bg-slate-400 text-white px-4 py-1.5 rounded-md hover:bg-slate-500 transition font-medium text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEdit(p)}
                                                                className="bg-amber-500 text-white px-4 py-1.5 rounded-md hover:bg-amber-600 transition font-medium text-sm"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(p.id)}
                                                                className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition font-medium text-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}