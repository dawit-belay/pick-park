export default function FormInput({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
