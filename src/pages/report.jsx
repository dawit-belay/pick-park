import { useEffect, useState } from "react";

export default function Report() {
  const [report, setReport] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchReport = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/report`);
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
            Admin Reports
          </h1>
          <p className="text-gray-400 text-lg">Parking analytics and revenue metrics</p>
        </div>

        {/* Report Card */}
        {report.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-16 text-center shadow-2xl">
            <svg
              className="w-20 h-20 text-gray-600 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-gray-400 text-xl font-semibold">No report data available yet</p>
            <p className="text-gray-500 text-sm mt-2">Reports will appear here once parking transactions are recorded</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                <p className="text-purple-400 text-sm uppercase tracking-wide font-semibold">Total Records</p>
                <p className="text-4xl font-bold text-purple-300 mt-2">{report.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
                <p className="text-green-400 text-sm uppercase tracking-wide font-semibold">Total Vehicles</p>
                <p className="text-4xl font-bold text-green-300 mt-2">
                  {report.reduce((sum, r) => sum + r.total_cars, 0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
                <p className="text-orange-400 text-sm uppercase tracking-wide font-semibold">Total Revenue</p>
                <p className="text-3xl font-bold text-orange-300 mt-2">
                  {Number(report.reduce((sum, r) => sum + r.total_revenue, 0)).toFixed(2)} Birr
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-6">
                <p className="text-cyan-400 text-sm uppercase tracking-wide font-semibold">Avg. Stay</p>
                <p className="text-3xl font-bold text-cyan-300 mt-2">
                  {Math.round(
                    report.reduce((sum, r) => sum + r.avg_stay_minutes, 0) / report.length
                  )}{" "}
                  min
                </p>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="px-8 py-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Daily Report Breakdown</h2>
                <p className="text-gray-400 text-sm mt-1">{report.length} days of parking data</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Total Vehicles
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Revenue (Birr)
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Avg Stay (min)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {report.map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-white font-semibold">{row.date}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-semibold text-sm border border-purple-500/30">
                            {row.total_cars}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-green-400 font-bold text-lg">
                            {Number(row.total_revenue).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-300 font-semibold">
                            {Math.round(row.avg_stay_minutes)} min
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
