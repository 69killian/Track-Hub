"use client";
import React, { useEffect, useState } from 'react';
import { Calendar, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavigationWhite from '../components/NavigationWhite';
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface HabitProgress {
  date: string;
  completed: number;
  total: number;
}

interface Habit {
  id: string;
  name: string;
  frequency: string;
  goal: string;
  streak: number;
}

function History() {
  const [progressData, setProgressData] = useState<HabitProgress[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProgressData();
      fetchHabits()
    }
  }, [session]);

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

  const fetchProgressData = async () => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(1); // first day of the month
    endDate.setMonth(endDate.getMonth() + 1); // last day
    endDate.setDate(0);
  
    try {
      
      const response = await fetch(`/api/progresses/${session?.user?.id}`);
      if (!response.ok) throw new Error('Failed to fetch progress');
  
      const data = await response.json();
  
      // progressMap
      const dailyProgress: HabitProgress[] = [];
      const currentDate = new Date(startDate);
  
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
        const dayProgress = data.filter((p: { createdAt: string }) => {
          const createdAtDate = new Date(p.createdAt);
          return createdAtDate.toISOString().split('T')[0] === dateStr;
        });
  
        dailyProgress.push({
          date: dateStr,
          completed: dayProgress.filter((p: { completed: boolean }) => p.completed).length,
          total: data.length // Assuming the total is based on the length of the data,
        });
  
        currentDate.setDate(currentDate.getDate() + 1);
      }

      
  
      setProgressData(dailyProgress);
  
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };
  

  // Calcul du nombre total de jours où des progrès ont été réalisés
  const totalProgress = progressData.reduce((acc, curr) => acc + curr.completed, 0);
  
  // Calcul du nombre de jours où des progrès ont été réalisés (total)
  const totalDays = progressData.length;

  // Calcul du taux de complétion
  const completionRate = Math.round(
    (totalProgress / (totalDays * (progressData[0]?.completed || 1))) * 100
  );

  const calculateStreak = () => {
    let streak = 0;
    let maxStreak = 0;
  
    // Traverse les données de progressData
    for (let i = progressData.length - 1; i >= 0; i--) {
      if (progressData[i].completed > 0) {  // Si des progrès ont été réalisés ce jour-là
        streak += 1;  // Incrémente la streak
        maxStreak = Math.max(maxStreak, streak);  // Garder la meilleure streak
      } else {
        if (streak > 0) {
          // Si on rencontre un jour sans progrès après une streak, on arrête
          break;
        }
      }
    }
  
    return maxStreak;
  };
  

  

  return (
    <>
      <div className='absolute top-0 w-full'>
        <NavigationWhite />
      </div>
      <div className="bg-gray-50 min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className={`${bricolage.className} text-2xl font-bold text-gray-900 sm:text-3xl sm:truncate`}>
              {session?.user.username}&rsquo;s Progress History
            </h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">30-Day Progress</h3>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  interval={6}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completed"
                  fill="#4F46E5"
                  name="Completed Habits"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className={`${bricolage.className} text-sm font-medium text-indigo-900 text-[20px]`}>Current Streak of {session?.user.username}</span>
                </div>
                <p className={`${bricolage.className} mt-2 text-2xl font-bold text-indigo-900`}>
                {calculateStreak()} days
              </p>

              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className={`${bricolage.className} text-sm font-medium text-[20px] text-green-900`}>Completion Rate</span>
                </div>
                <p className={`${bricolage.className} mt-2 text-2xl font-bold text-green-900`}>
                  {completionRate}%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
                  <span className={`${bricolage.className} text-[20px] text-sm font-medium text-purple-900`}>Total Habits</span>
                </div>
                <p className={`${bricolage.className} mt-2 text-2xl font-bold text-purple-900`}>
                  {habits.length} Habits
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-indigo-800">
                Total Progress: {totalProgress} days
              </span>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-indigo-800">
                Total Days: {totalDays} days
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
