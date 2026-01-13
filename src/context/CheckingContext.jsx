  import { createContext, useContext, useState } from "react";

  // 1️⃣ Create Context
  const CheckingContext = createContext();

  // 2️⃣ Provider Component
  export function CheckingProvider({ children }) {

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [plateNumber, setPlateNumber] = useState("");
    const [message, setMessage] = useState("");
    const [info, setInfo] = useState(null);

    // Helper to format time
    const formatTime = (isoString) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      return date.toLocaleString(); // local date & time
    };


    // Check-in handler
    const handleCheckIn = async () => {
      if (!plateNumber.trim()) {
        setMessage("❌ Please enter a plate number.");
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/cars/checkin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ plate_number: plateNumber }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(`✅ ${data.message || "Car checked in successfully!"}`);
          setInfo({
            start_time: data.start_time,
            end_time: null,
            duration_minutes: null,
            price: null,
          });
          setPlateNumber(""); // Clear input field
        } else {
          setMessage(`❌ ${data.error || "Check-in failed."}`);
          setInfo(null);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("❌ Server error during check-in.");
        setInfo(null);
      }
    };

    // Check-out handler
    const handleCheckOut = async (plateNumberParam) => {
      const plate = plateNumberParam || plateNumber; // use passed value if available
      if (!plate.trim()) {
        setMessage("❌ Please enter a plate number.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        
        const response = await fetch(`${BASE_URL}/cars/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ plate_number: plate }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(`✅ ${data.message || "Car checked out successfully!"}`);
          setInfo({
            start_time: data.start_time,
            end_time: data.end_time,
            duration_minutes: data.duration_minutes,
            price: data.price,
          });
          setPlateNumber(""); // Clear input field
        } else {
          setMessage(`❌ ${data.error || "Check-out failed."}`);
          setInfo(null);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("❌ Server error during check-out.");
        setInfo(null);
      }
    };

    const handleCarsPage = async () => {
        try {
            const token = localStorage.getItem("token");
            // console.log("Token from localStorage:", token);
            const response = await fetch(`${BASE_URL}/cars`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
    
             if (!response.ok) {
                throw new Error("Failed to fetch cars");
            }
    
            const data = await response.json();
            setCars(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    

    return (
      <CheckingContext.Provider value={{
        plateNumber,
        setPlateNumber,
        message,
        setMessage,
        setInfo,
        info,
        handleCheckIn,
        handleCheckOut,
        // isCheckin,
        // isCheckout,
        formatTime,
        handleCarsPage,
        cars,
        setCars,
        loading,
        error,
        setError,
        setLoading
      }}>
        {children}
      </CheckingContext.Provider>
    );
  }

  // 3️⃣ Custom Hook for Easy Access
  export function useChecking() { 
    return useContext(CheckingContext);
  }
