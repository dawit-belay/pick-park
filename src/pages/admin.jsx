import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth();
  const isDemo = user?.role === "demo";
  const [rates, setRates] = useState({
    gracePeriodMins: 15,
    shortStayMaxMins: 120,
    shortStayRate: 50,
    midStayMaxMins: 240,
    midStayRate: 100,
    dailyFlatRate: 200,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Get token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Fetch current parking rates
  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/rates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Parse the rates (remove " ETB" suffix from rate values)
        setRates({
          gracePeriodMins: data.rates.gracePeriodMins,
          shortStayMaxMins: data.rates.shortStayMaxMins,
          shortStayRate: parseFloat(data.rates.shortStayRate),
          midStayMaxMins: data.rates.midStayMaxMins,
          midStayRate: parseFloat(data.rates.midStayRate),
          dailyFlatRate: parseFloat(data.rates.dailyFlatRate),
        });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to fetch rates" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Failed to connect to server" });
    } finally {
      setLoading(false);
    }
  };

  // Update parking rates
  const handleSaveRates = async (e) => {
    e.preventDefault();
    
    // Block demo users
    if (isDemo) {
      setMessage({ type: "error", text: "Demo account cannot make changes. Please login with an admin account." });
      return;
    }
    
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${BASE_URL}/admin/rates`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          gracePeriodMins: Number(rates.gracePeriodMins),
          shortStayMaxMins: Number(rates.shortStayMaxMins),
          shortStayRate: Number(rates.shortStayRate),
          midStayMaxMins: Number(rates.midStayMaxMins),
          midStayRate: Number(rates.midStayRate),
          dailyFlatRate: Number(rates.dailyFlatRate),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Parking rates updated successfully!" });
        fetchRates(); // Refresh
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update rates" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Failed to save rates" });
    } finally {
      setSaving(false);
    }
  };

  // Reset to default rates
  const handleResetRates = async () => {
    // Block demo users
    if (isDemo) {
      setMessage({ type: "error", text: "Demo account cannot make changes. Please login with an admin account." });
      return;
    }
    
    if (!window.confirm("Are you sure you want to reset all rates to defaults?")) return;

    setResetting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${BASE_URL}/admin/rates/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Rates reset to defaults!" });
        fetchRates(); // Refresh
      } else {
        setMessage({ type: "error", text: data.message || "Failed to reset rates" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Failed to reset rates" });
    } finally {
      setResetting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setRates((prev) => ({ ...prev, [field]: Number(value) || 0 }));
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
            Pricing Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Configure parking rates and tiers</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div>
              <p className="text-yellow-400 font-semibold">Demo Mode - View Only</p>
              <p className="text-yellow-400/70 text-sm">Login with an admin account to make changes</p>
            </div>
          </div>
        )}

        {/* Message Alert */}
        {message.text && (
          <div
            className={`p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-500/20 border-green-500/50 text-green-400"
                : "bg-red-500/20 border-red-500/50 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSaveRates} className="space-y-8">
            {/* Pricing Tiers Overview */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Pricing Tiers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                  <div className="text-green-400 text-sm font-medium mb-1">Grace Period</div>
                  <div className="text-white text-2xl font-bold">FREE</div>
                  <div className="text-gray-400 text-xs mt-1">0 - {rates.gracePeriodMins} mins</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                  <div className="text-blue-400 text-sm font-medium mb-1">Short Stay</div>
                  <div className="text-white text-2xl font-bold">{rates.shortStayRate} ETB</div>
                  <div className="text-gray-400 text-xs mt-1">{rates.gracePeriodMins + 1} - {rates.shortStayMaxMins} mins</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                  <div className="text-purple-400 text-sm font-medium mb-1">Mid Stay</div>
                  <div className="text-white text-2xl font-bold">{rates.midStayRate} ETB</div>
                  <div className="text-gray-400 text-xs mt-1">{rates.shortStayMaxMins + 1} - {rates.midStayMaxMins} mins</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
                  <div className="text-orange-400 text-sm font-medium mb-1">Daily Rate</div>
                  <div className="text-white text-2xl font-bold">{rates.dailyFlatRate} ETB</div>
                  <div className="text-gray-400 text-xs mt-1">{rates.midStayMaxMins}+ mins</div>
                </div>
              </div>
            </div>

            {/* Configuration Form */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Configure Rates</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grace Period */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Grace Period (minutes)
                  </label>
                  <p className="text-xs text-gray-500">Free parking duration</p>
                  <input
                    type="number"
                    min="0"
                    value={rates.gracePeriodMins}
                    onChange={(e) => handleInputChange("gracePeriodMins", e.target.value)}
                    disabled={isDemo}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition ${isDemo ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                {/* Short Stay Max */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Short Stay Max (minutes)
                  </label>
                  <p className="text-xs text-gray-500">Upper limit for short stay tier</p>
                  <input
                    type="number"
                    min="0"
                    value={rates.shortStayMaxMins}
                    onChange={(e) => handleInputChange("shortStayMaxMins", e.target.value)}
                    disabled={isDemo}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition ${isDemo ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                {/* Short Stay Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Short Stay Rate (ETB)
                  </label>
                  <p className="text-xs text-gray-500">Price for short stay parking</p>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={rates.shortStayRate}
                    onChange={(e) => handleInputChange("shortStayRate", e.target.value)}
                    disabled={isDemo}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition ${isDemo ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                {/* Mid Stay Max */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Mid Stay Max (minutes)
                  </label>
                  <p className="text-xs text-gray-500">Upper limit for mid stay tier</p>
                  <input
                    type="number"
                    min="0"
                    value={rates.midStayMaxMins}
                    onChange={(e) => handleInputChange("midStayMaxMins", e.target.value)}
                    disabled={isDemo}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition ${isDemo ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                {/* Mid Stay Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Mid Stay Rate (ETB)
                  </label>
                  <p className="text-xs text-gray-500">Price for mid stay parking</p>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={rates.midStayRate}
                    onChange={(e) => handleInputChange("midStayRate", e.target.value)}
                    disabled={isDemo}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition ${isDemo ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                {/* Daily Flat Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Daily Flat Rate (ETB)
                  </label>
                  <p className="text-xs text-gray-500">Price for all-day parking</p>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={rates.dailyFlatRate}
                    onChange={(e) => handleInputChange("dailyFlatRate", e.target.value)}
                    disabled={isDemo}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition ${isDemo ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="submit"
                  disabled={saving || isDemo}
                  className={`flex-1 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isDemo ? 'opacity-50' : ''}`}
                >
                  {saving && <LoadingSpinner />}
                  {isDemo ? "Login Required" : saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleResetRates}
                  disabled={resetting || isDemo}
                  className={`px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isDemo ? 'opacity-50' : ''}`}
                >
                  {resetting && <LoadingSpinner />}
                  {isDemo ? "Login Required" : resetting ? "Resetting..." : "Reset to Defaults"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Info Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">How Pricing Works</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span><strong>Grace Period:</strong> Vehicles parked within this time are free</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong>Short Stay:</strong> Applied when parked longer than grace period but within short stay max</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span><strong>Mid Stay:</strong> Applied when parked longer than short stay max but within mid stay max</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">•</span>
              <span><strong>Daily Rate:</strong> Applied when parked longer than mid stay max</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
