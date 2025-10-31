import { useState } from "react";
import { useLocation } from "react-router-dom";

function checking() {

  const location = useLocation();

  const BASE_URL = "https://parking-app-13ns.onrender.com";

  // detect which route
  const isCheckin = location.pathname === "/checkin";
  const isCheckout = location.pathname === "/checkout";
 
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
      const response = await fetch(`${BASE_URL}/cars/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  const handleCheckOut = async () => {
    if (!plateNumber.trim()) {
      setMessage("❌ Please enter a plate number.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/cars/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plate_number: plateNumber }),
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


  return (
    <div>
      <div className="container mx-auto flex justify-center items-center pt-20">
        <div className="mx-4">
            <label htmlFor="plate" className="text-lg">
              Enter plate number for {isCheckin ? "check-in" : "check-out"} :
            </label>
            <input
              type="text"
              id="plate"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              className="ml-3 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="">
            {isCheckin && (
            <button
              onClick={handleCheckIn}
              className="mr-3 p-2 bg-blue-500 text-white rounded"
            >
              Check-in
            </button>)}
            {isCheckout && (

            <button
              onClick={handleCheckOut}
              className="p-2 bg-green-500 text-white rounded"
            >
              Check-out
            </button>)}
          </div>
      </div>
        {message && <p className="mt-6 text-lg font-semibold">{message}</p>}
        
        {info && (
          <div className="mt-4 text-lg border-t pt-4">
            {info.start_time && <p>🕒 Start Time: {formatTime(info.start_time)}</p>}
            {info.end_time && <p>🏁 End Time: {formatTime(info.end_time)}</p>}
            {info.duration_minutes !== null && (
              <p>⏳ Duration: {info.duration_minutes} minutes</p>
            )}
            {info.price !== null && <p>💰 Price: {info.price} Birr</p>}
          </div>
        )}
    </div>
  )
}

export default checking;