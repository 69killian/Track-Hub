"use client"
import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './home/page';

function Page() {
  return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex-1">
          <Home></Home>
        </div>
        <Footer />
      </div>
  );
}

export default Page;
