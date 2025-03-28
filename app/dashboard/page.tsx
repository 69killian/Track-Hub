"use client"
import React, { useEffect, useState } from 'react';
import { useSession, } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BarChart2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';

interface Habit {
  id: string;
  name: string;
  frequency: string;
  goal: string;
  streak: number;
}

interface Progress {
  id: string;
  habit_id: string;
  completed: boolean;
  date: string;
}

function Dashboard() {
  const { status } = useSession();
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
      fetchTodayProgress();
    }
  }, [status]);

  const fetchHabits = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching habits:', error);
      return;
    }

    setHabits(data || []);
  };

  const fetchTodayProgress = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('date', today);

    if (error) {
      console.error('Error fetching progress:', error);
      return;
    }

    const progressMap = (data || []).reduce((acc: Record<string, boolean>, curr: Progress) => {
      acc[curr.habit_id] = curr.completed;
      return acc;
    }, {});

    setTodayProgress(progressMap);
  };

  const toggleHabitCompletion = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = !todayProgress[habitId];

    const { error } = await supabase
      .from('progress')
      .upsert({
        habit_id: habitId,
        date: today,
        completed: isCompleted
      });

    if (error) {
      console.error('Error updating progress:', error);
      return;
    }

    setTodayProgress(prev => ({
      ...prev,
      [habitId]: isCompleted
    }));
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <>
      <div className='absolute top-0 w-full'>
        <Navigation />
      </div>
      <div className="min-h-screen bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Your Habits Dashboard
            </h2>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {habits.map((habit) => (
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
                          {habit.frequency} • Goal: {habit.goal}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
                        <BarChart2 className="h-4 w-4 text-indigo-500 mr-1" />
                        <span className="text-sm font-medium text-indigo-800">
                          {habit.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
