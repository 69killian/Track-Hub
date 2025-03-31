"use client";

import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './home/page';

function Page() {
  useEffect(() => {
    // Si tu veux activer manuellement le thème sombre, tu peux ajouter une logique ici
    document.body.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-600 via-indigo-700 to-indigo-600">
      <Navigation />
      <div className="flex-1">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
