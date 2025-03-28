import React from 'react';
import Link from 'next/link';
import { Activity} from 'lucide-react';

function NavigationLanding() {

  return (
    <nav className="bg-white shadow-lg z-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TrackHub</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-3 py-2 text-sm font-medium"
            ></Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
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