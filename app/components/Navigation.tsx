"use client";

import React from "react";
import Link from "next/link";
import { Activity, BarChart2, Calendar, Plus, Home } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

function Navigation() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: `${window.location.origin}/` });
  };

  return (
    <nav className="bg-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className={` ml-2 text-xl font-bold text-white`}>TrackHub</span>
            </Link>
          </div>

          {session?.user && ( // 🔹 Vérification correcte de la session
            <div className="flex space-x-4 text-white">
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium  hover:text-indigo-600"
              >
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-3 py-2 text-sm font-medium  hover:text-indigo-600"
              >
                <BarChart2 className="h-5 w-5 mr-1" />
                Dashboard
              </Link>
              <Link
                href="/addhabit"
                className="inline-flex items-center px-3 py-2 text-sm font-medium  hover:text-indigo-600"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Habit
              </Link>
              <Link
                href="/history"
                className="inline-flex items-center px-3 py-2 text-sm font-medium hover:text-indigo-600"
              >
                <Calendar className="h-5 w-5 mr-1" />
                History
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!session?.user ? ( 
              <>
                <Link href="/login" className={` text-[16px] text-white px-4 py-2 text-sm font-medium hover:text-indigo-200`}>
                  Login
                </Link>
                <Link
                  href="/register"
                  className={` bg-indigo-600 text-[16px] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700`}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className={` bg-indigo-600 text-[16px] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700`}
              >
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
