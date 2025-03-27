import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity} from 'lucide-react';

function NavigationLanding() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TrackHub</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            ></Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}

export default NavigationLanding;