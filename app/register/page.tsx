"use client"
import React, { useState } from 'react';
import { UserPlus, Activity, Github } from 'lucide-react';
import Link from 'next/link';
import NavigationWhite from '../components/NavigationWhite';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    // Block the refresh of the page
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("/api/auth/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    })
    

    if (response.ok) {
      router.push('/register');
    } else {
      setError("Registration failed.");
    }
    
  };

  const handleGitHubRegister = async () => {
    await signIn('github', { callbackUrl: '/register' });
  };
  

  return (
    <>
     <div className='absolute top-0 w-full'>
        <NavigationWhite/>
     </div>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 flex-cols-2 justify-center items-center">
            <Link href="/" className="flex items-center">
                <Activity className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">TrackHub</span>
              </Link>
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md -space-y-px">
          <div className='mb-4'>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="shadow-sm appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
            />
          </div>
            <div className='mb-4'>
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
            <div className='mb-4'>
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
            <div className='mb-4'>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="shadow-sm appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
              />
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
          </div>

          <div>
            <button
              type="submit"
              disabled={!consent}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Sign up
            </button>
          </div>

          {/* GitHub login */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleGitHubRegister}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Github className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              </span>
              Register with GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;