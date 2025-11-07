import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function OfficerLogin() {
  const { handleOfficerLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await handleOfficerLogin(email, password);
      setMessage("✅ Officer login successful");

      navigate("/cars");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 pt-20">
      <h2 className="text-2xl font-semibold mb-4 text-center">Officer Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" className="border p-2 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
