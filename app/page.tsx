"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import HabitForm from './pages/HabitForm';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import NavigationLanding from './components/NavigationLanding';
import GDPRTerms from './pages/gdpr-terms';
import Footer from './components/Footer';

function Page() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavigationLanding />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habit" element={<HabitForm />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gdpr-terms" element={<GDPRTerms />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Page;
