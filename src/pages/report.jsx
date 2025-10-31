import { useEffect, useState } from "react";

export default function Report() {
  const [report, setReport] = useState([]);

  const BASE_URL = "https://parking-app-13ns.onrender.com";

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
    <div className="p-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Report</h1>

      {report.length === 0 ? (
        <p>No data available yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Total Cars</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Revenue(birr)</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Avg Stay (min)</th>
            </tr>
          </thead>
          <tbody>
            {report.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-1 text-gray-800">{row.date}</td>
                <td className="px-6 py-1 text-gray-800">{row.total_cars}</td>
                <td className="px-6 py-1 text-gray-800">{Number(row.total_revenue).toFixed(2)} </td>
                <td className="px-6 py-1 text-gray-800">
                  {Math.round(row.avg_stay_minutes)} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
