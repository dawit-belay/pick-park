import { Link } from "react-router-dom";
import ParkingBg from "../assets/parking-bg.jpg";

function Home() {
  return (
    <div className=" -full h-screen justify-center flex flex-col items-center pt-20  bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${ParkingBg})` }}>
      <div className="justify-center flex flex-col items-center text-white">
        <h1 className="text-4xl font-bold">Welcome to the Parking App</h1>
        <p className="mt-4 text-xl">Find and reserve your parking spot easily.</p>
        <div className="flex space-x-4 mt-6">
           <Link to="/checkin" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4">
              Check In
            </Link>
           <Link to="/checkout" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4">
              Check Out
            </Link>
            <Link to="/cars" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4">
              View Cars
            </Link>
        </div>
       
      </div>
      
      
    </div>
  )
}
export default Home;