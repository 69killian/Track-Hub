"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../lib/supabase';

interface HabitProgress {
  date: string;
  completed: number;
  total: number;
}

function History() {
  const [progressData, setProgressData] = useState<HabitProgress[]>([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const { data: habits } = await supabase
      .from('habits')
      .select('id');

    const { data: progress } = await supabase
      .from('progress')
      .select('*')
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0]);

    if (!habits || !progress) return;

    const dailyProgress: HabitProgress[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayProgress = progress.filter(p => p.date === dateStr);
      
      dailyProgress.push({
        date: dateStr,
        completed: dayProgress.filter(p => p.completed).length,
        total: habits.length
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setProgressData(dailyProgress);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Your Progress History
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
                <span className="text-sm font-medium text-indigo-900">Current Streak</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {progressData[progressData.length - 1]?.completed || 0} days
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-green-900">Completion Rate</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-green-900">
                {Math.round((progressData.reduce((acc, curr) => acc + curr.completed, 0) / 
                  (progressData.reduce((acc, curr) => acc + curr.total, 0) || 1)) * 100)}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm font-medium text-purple-900">Total Habits</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-purple-900">
                {progressData[0]?.total || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;