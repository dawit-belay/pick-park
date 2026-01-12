import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { registerOfficer } from "../api/auth";

export default function OfficerRegister() {

  // const BASE_URL = "https://parking-app-13ns.onrender.com";
const BASE_URL = "http://localhost:8000";

  const { token } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [officers, setOfficers] = useState([]);



  // ✅ Fetch officers
  async function fetchOfficers() {
    try {
      const res = await fetch(`${BASE_URL}/admin/officers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch officers");
      const data = await res.json();
      setOfficers(data.officers);
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not load officers");
    }
  }

  useEffect(() => {
    fetchOfficers();
  }, []);


   // ✅ Delete officer
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this officer?")) return;

    try {
      const res = await fetch(`${BASE_URL}/admin/officer/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");

      setMessage("✅ Officer deleted successfully!");
      setOfficers((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
  }



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = { name, email, password }; // ✅ create object
      await registerOfficer(data, token);
      fetchOfficers();
      setMessage("✅ Officer registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
            Officer Management
          </h1>
          <p className="text-gray-400 text-lg">Register and manage parking officers</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-8 p-4 rounded-lg border ${
            message.includes("✅")
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Register Form */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Add Officer</h2>
                <p className="text-gray-400 text-sm">Create a new parking officer account</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="officer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Register Officer
              </button>
            </form>
          </div>

          {/* Officers List */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="px-8 py-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white mb-1">Officers Directory</h2>
                <p className="text-gray-400 text-sm">
                  {officers.length} {officers.length === 1 ? "officer" : "officers"} registered
                </p>
              </div>

              <div className="overflow-x-auto">
                {officers.length === 0 ? (
                  <div className="text-center py-16 px-8">
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <p className="text-gray-400 text-lg">No officers registered yet</p>
                    <p className="text-gray-500 text-sm mt-2">Add your first officer using the form</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {officers.map((officer, index) => (
                        <tr
                          key={officer.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{officer.name}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{officer.email}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDelete(officer.id)}
                              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors font-medium text-sm border border-red-500/30 hover:border-red-500/50"
                            >
                              Delete
                            </button>
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
    </div>
  );
}
