"use client"
import React from 'react';
import Link from 'next/link';
import { Activity, Target, TrendingUp, Star } from 'lucide-react';
import Marquee from "react-fast-marquee";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
        <div className="mb-[50px] mt-[10px]">
        <h1 className={`text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-8xl ${bricolage.className}`}>
      <span className="block text-white">Track Your Habits,</span>
      <span className="block text-violet-900">Achieve Your Goals</span>
    </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Build better habits, track your progress, and achieve your personal goals with our simple but powerful habit tracking system.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className={`${bricolage.className} text-[20px]`}>
            <Link
              href="/register"
              className="tracking-tight font-extrabold relative z-10 block w-full py-4 px-20 bg-gray-900 hover:bg-gray-900/90 text-center transition-all duration-200 rounded-[10px] p-1 shadow-md hover:shadow-lg shadow-[#101010]/50 border-t-4 border-indigo-300/10"
            >
              Get Started
            </Link>
          </div>
        </div>
        </div>
        <div className="mt-8">
          <HeroVideoDialogDemo />
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={<Activity />} title="Track Daily Habits" description="Keep track of your daily habits and build consistency in your routine." />
          <FeatureCard icon={<Target />} title="Set Goals" description="Define clear goals and track your progress towards achieving them." />
          <FeatureCard icon={<TrendingUp />} title="View Progress" description="Visualize your progress with detailed statistics and insights." />
        </div>
      </div>
      <ReviewMarquee/>
    </div>
  );
}

export default Home;

function HeroVideoDialogDemo() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/0jbvnu0nkxw"
        thumbnailSrc="https://i.ytimg.com/vi/0jbvnu0nkxw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBggEyh_MA8=&rs=AOn4CLAkRcGkaczTMeZMMlPOjdzKWDGqew"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/0jbvnu0nkxw"
        thumbnailSrc="https://i.ytimg.com/vi/0jbvnu0nkxw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBggEyh_MA8=&rs=AOn4CLAkRcGkaczTMeZMMlPOjdzKWDGqew"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}


function FeatureCard({ icon, title, description }) {
  return (
    <div className="pt-6">
      <div className="flow-root bg-white rounded-lg px-6 pb-8">
        <div className="-mt-6">
          <div>
            <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
              {icon}
            </span>
          </div>
          <h3 className={`${bricolage.className} mt-8 text-lg font-bold text-[30px] text-gray-900 tracking-tight`}>{title}</h3>
          <p className={`${bricolage.className} mt-5 text-base text-gray-500 text-[18px]`}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewMarquee() {
  return (
    <div className="py-50">
      <h1 className={`${bricolage.className} text-4xl tracking-tight font-semibold text-gray-900 sm:text-5xl md:text-7xl`}>
        <span className="block text-white">This is What they say</span>
        <span className="block text-violet-600 pb-20">About TrackHub</span>
      </h1>
      <Marquee gradient={false} speed={50} className='h-[250px]'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-80 bg-white rounded-lg shadow-lg p-8 h-[240px] mx-4"
          >
            <div className="flex items-center mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-indigo-600" />
              ))}
            </div>
            <p className={`text-gray-700 italic text-[20px] ${bricolage.className}`}>&quot;{review.review}&quot;</p>
            <h4 className={`${bricolage.className} mt-4 font-semibold text-gray-900 text-[30px]`}>- {review.name}</h4>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
