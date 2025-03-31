"use client"
import React from 'react';
import Link from 'next/link';
import { Activity, Target, TrendingUp, Star } from 'lucide-react';
import Marquee from "react-fast-marquee";

const reviews = [
  {
    name: "Alice Dupont",
    review: "This app helped me a lot staying motivated to track my progress !",
    rating: 5,
  },
  {
    name: "Jean Morel",
    review: "Simple, usefull, this is perfect to follow step by step my daily habits.",
    rating: 4,
  },
  {
    name: "Sophie Bernard",
    review: "I love the following functionnality of my goals, so motivating !",
    rating: 5,
  },
  {
    name: "Marc Lefevre",
    review: "Beautiful interface, very simple to use, a must-have !",
    rating: 4,
  },
];

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-white">Track Your Habits,</span>
          <span className="block text-violet-900">Achieve Your Goals</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-white/50 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Build better habits, track your progress, and achieve your personal goals with our simple but powerful habit tracking system.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href="/register"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              href="/login"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Track Daily Habits</h3>
                <p className="mt-5 text-base text-gray-500">
                  Keep track of your daily habits and build consistency in your routine.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Set Goals</h3>
                <p className="mt-5 text-base text-gray-500">
                  Define clear goals and track your progress towards achieving them.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">View Progress</h3>
                <p className="mt-5 text-base text-gray-500">
                  Visualize your progress with detailed statistics and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewMarquee/>
    </div>
  );
}

export default Home;

function ReviewMarquee() {
  return (
    <div className="py-20 pb-0">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
          <span className="block text-white">This is What they say</span>
          <span className="block text-violet-600">About TrackHub</span>
        </h1>
      <Marquee gradient={false} speed={50} className='h-[250px]'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-80 bg-white rounded-lg shadow-lg p-8 h-[180px] mx-4"
          >
            <div className="flex items-center mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-indigo-600" />
              ))}
            </div>
            <p className="text-gray-700 italic">&quot;{review.review}&quot;</p>
            <h4 className="mt-4 font-semibold text-gray-900">- {review.name}</h4>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

