"use client"
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import NavigationWhite from '../components/NavigationWhite';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function HabitForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/');
      }
    }, [status, router]);

    useEffect(() => {
      if (session?.user?.id) {
        setFormData((prev) => ({ ...prev, userId: session.user.id }));
      }
    }, [session]);
    

  const [formData, setFormData] = useState({
    userId: session?.user?.id,
    name: '',
    frequency: '',
    goal: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }
  
    if (!formData.name.trim() || !formData.frequency || !formData.goal.trim()) {
      console.error("All fields are required");
      return;
    }

    try {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: session?.user?.id,
        name: formData.name.trim(),
        frequency: formData.frequency,
        goal: formData.goal.trim(),
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating habit:", errorData.message || "Unknown error");
      return;
    }

    console.log("Habit successfully created");
    router.push("/dashboard");
  } catch (error) {
    console.error("Network error:", error);
  }
  };

  return (
    <>
    <div className='absolute top-0 w-full'>
        <NavigationWhite/>
     </div>
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow sm:rounded-lg p-6 w-full max-w-lg">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 text-center`}>Create New Habit for {session?.user?.username}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Habit Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-900 focus:ring-indigo-900 sm:text-sm p-3 text-black text-lg"
              placeholder="e.g., Read a book"
            />
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-lg text-gray-900"
            >
              <option value="">Chose a Day</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
              Goal
            </label>
            <input
              type="text"
              name="goal"
              id="goal"
              required
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="mt-1 text-black block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-lg"
              placeholder="e.g., 30 minutes"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={` cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default HabitForm;