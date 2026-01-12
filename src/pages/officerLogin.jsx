import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OfficerLogin() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If already logged in as officer, redirect to cars page
    if (user?.role === "officer") {
      navigate("/cars");
    } else {
      // Redirect to home - user will use the modal
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <p className="text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
}
