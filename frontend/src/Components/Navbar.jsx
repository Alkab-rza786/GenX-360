import React, { useState } from 'react';
import { Menu, X, User, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // 🧭 Import Link for routing

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to='/' className="text-2xl font-bold text-blue-600">MediWallet</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/disease-history" className="text-gray-700 hover:text-blue-600">
            Disease History
          </Link>
          <Link to="/medical-record" className="text-gray-700 hover:text-blue-600">
            Add Record
          </Link>

          {/* Emergency Button */}
          <Link
            to="/emergency"
            className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <AlertCircle size={18} />
            Emergency
          </Link>

          {/* Profile */}
          <Link to="/profile" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
            <User size={20} />
            Profile
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          <Link to="/disease-history" className="block text-gray-700 hover:text-blue-600">
            Disease History
          </Link>
          <Link to="/medical-record" className="block text-gray-700 hover:text-blue-600">
            Add Record
          </Link>
          <Link
            to="/emergency"
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-1"
          >
            <AlertCircle size={18} />
            Emergency
          </Link>
          <Link
            to="/profile"
            className="w-full flex items-center justify-center gap-1 text-gray-700 hover:text-blue-600"
          >
            <User size={20} />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
