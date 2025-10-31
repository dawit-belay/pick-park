import { Link } from "react-router-dom";  

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 p-2">
      <div className="flex justify-between items-center mx-4">
          <Link to="/" className="text-xl font-bold text-blue-600">Pick Park</Link>
          <div className="flex space-x-4">
            <Link to="/admin" className="hover:text-blue-500 transition-colors">admin</Link>
            <Link to="/report" className="hover:text-blue-500 transition-colors">report</Link>
          </div>
      </div>
    </nav>
  );
}
