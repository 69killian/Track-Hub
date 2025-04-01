"use client"
import React, { useEffect, useState } from 'react';
import { useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BarChart2, CheckCircle, XCircle } from 'lucide-react';
import NavigationWhite from '../components/NavigationWhite';

interface Habit {
  id: string;
  name: string;
  frequency: string;
  goal: string;
  streak: number;
}

interface Progress {
  id: string;
  habitId: string;
  completed: boolean;
  date: string;
}

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [todayProgress, setTodayProgress] = useState<Record<string, boolean>>({});


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHabits();
    }
  }, [status]);

  
  useEffect(() => {
    if (habits.length > 0) {
      fetchTodayProgress();
    }
  }, [habits])

  const fetchHabits = async () => {
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch(`/api/dashboard/${session?.user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        console.error('Error fetching habits:', await response.text());
        return;
      }
  
      const data = await response.json();
      setHabits(data); // ✅ Stocke les habitudes dans ton état
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  

  const fetchTodayProgress = async () => {
    console.log("Fetching progress for user:", session?.user?.id); // ✅ Debug

    try {
        const response = await fetch(`/api/progresses/${session?.user?.id}`);
        if (!response.ok) throw new Error("Failed to fetch progress");

        const data = await response.json();
        console.log("Fetched progress:", data); // ✅ Debug

        // Calculer le nombre de progrès pour chaque habitude
        const progressMap: Record<string, number> = habits.reduce((acc, habit) => {
            acc[habit.id] = 0; // Initialiser chaque habitude avec 0
            return acc;
        }, {});

        // Maintenant, on compte les progrès réalisés pour chaque habitude
        data.forEach((progress: Progress) => {
            if (progress.completed) {
                progressMap[progress.habitId] = (progressMap[progress.habitId] || 0) + 1;
            }
        });

        setTodayProgress(progressMap); // Stocker les résultats dans l'état
    } catch (error) {
        console.error("Error fetching progress:", error);
    }
};

  
  


  const toggleHabitCompletion = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = !todayProgress[habitId];

    try {
        // Mise à jour du progrès de l'habitude
        const response = await fetch("/api/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                habitId,
                date: today,
                completed: isCompleted
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update progress");
        }

        const data = await response.json();
        console.log("Progress updated:", data);

        setTodayProgress(prev => ({
            ...prev,
            [habitId]: isCompleted
        }));
    } catch (error) {
        console.error("Error updating progress:", error);
    }
};



  if (status === 'loading') return <p>Loading...</p>;

  return (
    <>
      <div className='absolute top-0 w-full'>
        <NavigationWhite />
      </div>
      <div className="min-h-screen bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {session?.user?.username}&apos;s Habits Dashboard
            </h2>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
          {habits.length === 0 ? (
  <p className="p-4 text-gray-500">No habits found.</p>
) : (
  habits.map((habit) => (
    <li key={habit.id}>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => toggleHabitCompletion(habit.id)}
              className="mr-4 focus:outline-none"
            >
              {todayProgress[habit.id] ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-gray-300 hover:text-gray-400" />
              )}
            </button>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{habit.name}</h3>
              <p className="text-sm text-gray-500">
                {habit.frequency} • Goal : {habit.goal}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
              <BarChart2 className="h-4 w-4 text-indigo-500 mr-1" />
              <span className="text-sm font-medium text-indigo-800">
                Completed : {todayProgress[habit.id] || 0} times
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  ))
)}

          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;