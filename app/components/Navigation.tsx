"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, BarChart2, Calendar, Plus, Home } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

function Navigation() {
  const { data: session } = useSession();
  const router = useRouter(); // Utilise useRouter de 'next/navigation'

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/'); // Redirection après déconnexion
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TrackHub</span>
            </Link>
          </div>

          {session && (
            <div className="flex space-x-4">
              <Link href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link href="/dashboard" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                <BarChart2 className="h-5 w-5 mr-1" />
                Dashboard
              </Link>
              <Link href="/addhabit" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                <Plus className="h-5 w-5 mr-1" />
                Add Habit
              </Link>
              <Link href="/history" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                <Calendar className="h-5 w-5 mr-1" />
                History
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!session ? (
              <>
                <Link href="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleSignOut} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
