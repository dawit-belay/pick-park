import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { registerOfficer } from "../api/auth";

export default function OfficerRegister() {

  const BASE_URL = "https://parking-app-13ns.onrender.com";
// const BASE_URL = "http://localhost:8000";

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
    <div className="flex flex-col items-center p-20">
      <h1 className="text-5xl font-bold mb-8">Officer Management</h1>

      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}
      <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-6xl gap-8 px-4">
        {/* ===== Register Officer Form ===== */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-3">Register New Officer</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Register Officer
          </button>
        </form>

        {/* ===== Officers Table ===== */}
        <div className="w-full lg:w-2/3 overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">All Officers</h2>

          {officers.length === 0 ? (
            <p>No officers found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-300 p-2">#</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {officers.map((officer, index) => (
                  <tr key={officer.id}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{officer.name}</td>
                    <td className="border border-gray-300 p-2">{officer.email}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => handleDelete(officer.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
  );
}
