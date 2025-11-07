import { Link } from "react-router-dom";
// import ParkingBg from "../assets/parking-bg.jpg";

function Home() {
  return (
    <div className=" -full h-screen justify-center flex flex-col items-center pt-20  bg-cover bg-center"
      // style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${ParkingBg})` }}>
        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
          url('https://images.unsplash.com/photo-1616363088386-31c4a8414858?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070')`
   }}>
      <div className="justify-center flex flex-col items-center text-white">
        <h1 className="text-4xl font-bold">Welcome to the Parking App</h1>
        <p className="mt-4 text-xl">Find and reserve your parking spot easily.</p>
      </div>
    </div>
  )
}
export default Home;