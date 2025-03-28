"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Github, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { signIn } from 'next-auth/react';

function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false); // GDPR consent

  const handleGitHubLogin = async () => {
    const response = await signIn('github');
    
    if (response?.ok) {
      router.push('/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!consent) {
      setError('You must agree to the terms to proceed.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard'); // Redirection après connexion
  };

  return (
    <>
      <div className='absolute top-0 w-full'>
        <Navigation />
      </div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 flex-cols-2 justify-center items-center">
              <Link href="/" className="flex items-center">
                <Activity className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">TrackHub</span>
              </Link>
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="rounded-md -space-y-px">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="shadow-sm appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="shadow-sm appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* GDPR consent */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the <Link href="/gdpr-terms" className="text-indigo-600 hover:text-indigo-500">GDPR terms</Link>
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={!consent}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                Sign in
              </button>
            </div>

            {/* GitHub login */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleGitHubLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Github className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
                </span>
                Connect with GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
