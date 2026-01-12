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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 mb-12">
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                    Pricing Dashboard
                </h1>
                <p className="text-gray-400 text-lg">Manage parking pricing tiers and rates</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Price Range Form */}
                <form
                    onSubmit={handleAddPriceRange}
                    className="lg:col-span-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-8 shadow-2xl hover:border-purple-500/50 transition-all"
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Add Pricing Tier</h2>
                        <p className="text-gray-400 text-sm">Create a new parking rate configuration</p>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Min Minutes
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                value={minMinutes}
                                onChange={(e) => setMinMinutes(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Max Minutes
                            </label>
                            <input
                                type="number"
                                placeholder="30"
                                value={maxMinutes}
                                onChange={(e) => setMaxMinutes(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Price (Birr)
                            </label>
                            <input
                                type="number"
                                placeholder="10.00"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                loading ? "opacity-50" : ""
                            }`}
                        >
                            {loading ? "Adding..." : "Add Pricing Tier"}
                        </button>
                    </div>
                </form>

                {/* Table with edit/delete */}
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="px-8 py-6 border-b border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-1">Current Price Ranges</h2>
                        <p className="text-gray-400 text-sm">
                            {priceRange.length} {priceRange.length === 1 ? "tier" : "tiers"} configured
                        </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {priceRange.length === 0 ? (
                            <div className="text-center py-16 px-8">
                                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-400 text-lg font-semibold">No pricing tiers configured</p>
                                <p className="text-gray-500 text-sm mt-2">Add your first pricing tier to get started</p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Min Minutes
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Max Minutes
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Price (Birr)
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {priceRange.map((p) => (
                                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editId === p.id ? (
                                                    <input
                                                        type="number"
                                                        value={editData.min_minutes}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, min_minutes: e.target.value })
                                                        }
                                                        className="border border-white/20 bg-white/5 rounded px-3 py-1.5 w-24 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                    />
                                                ) : (
                                                    <span className="text-white font-semibold">{p.min_minutes}</span>
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
                                                        className="border border-white/20 bg-white/5 rounded px-3 py-1.5 w-24 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                    />
                                                ) : (
                                                    <span className="text-white font-semibold">{p.max_minutes}</span>
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
                                                        className="border border-white/20 bg-white/5 rounded px-3 py-1.5 w-24 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                    />
                                                ) : (
                                                    <span className="text-white font-semibold">{Number(p.price).toFixed(2)}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    {editId === p.id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleSave(p.id)}
                                                                className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-4 py-1.5 rounded-lg transition font-medium text-sm"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditId(null)}
                                                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 px-4 py-1.5 rounded-lg transition font-medium text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEdit(p)}
                                                                className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-400 px-4 py-1.5 rounded-lg transition font-medium text-sm"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(p.id)}
                                                                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-1.5 rounded-lg transition font-medium text-sm"
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