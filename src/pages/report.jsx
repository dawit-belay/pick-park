import { useEffect, useState } from "react";

export default function Report() {
  const [report, setReport] = useState([]);

  // const BASE_URL = "https://parking-app-13ns.onrender.com";
  const BASE_URL = "http://localhost:8000";

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
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
           Admin Report
        </h1>

        {report.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No data available yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Total Cars</th>
                  <th className="px-6 py-3 text-left font-semibold">Revenue (Birr)</th>
                  <th className="px-6 py-3 text-left font-semibold">Avg Stay (min)</th>
                </tr>
              </thead>
              <tbody>
                {report.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-3 text-gray-800 font-medium">{row.date}</td>
                    <td className="px-6 py-3 text-gray-700">{row.total_cars}</td>
                    <td className="px-6 py-3 text-green-700 font-semibold">
                      {Number(row.total_revenue).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {Math.round(row.avg_stay_minutes)} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
