"use client";
import Image from 'next/image';
import React from 'react';

const MentalHealthLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="px-5 max-w-7xl mx-auto pt-8">

        <div className="flex items-start">
          <Image src="/images/top.png" alt="MindZen Logo" width={600} height={300} />
        </div>

        {/* Main content section - exact layout as image */}
        <div className="flex items-start justify-between">
          {/* Left side - Text content */}
          <div className="w-1/3 pt-20">
            <div className="space-y-6 mx-6">
              <h1 className="text-3xl text-light leading-tight">
                You <span className="text-black font-bold">don't</span> have<br />
                to <span className="text-black font-bold">struggle</span> in<br />
                silence!
              </h1>
              
              <button className="px-6 py-2 text-gray-600 border-b-2 border-gray-400 font-medium text-sm tracking-wider hover:border-gray-600 transition-colors">
                LEARN MORE
              </button>
            </div>

            {/* Audio player section - positioned below text */}
            <div className="flex items-center space-x-4">
             <Image src="/images/audio-wave.png" alt="Audio Wave" width={300} height={300} />
            </div>
          </div>

          

          {/* Right side - Floating card and motivational content */}
          <div className="-mt-36">
            <div className="">
            <Image src="/images/landing.png" alt="Mind Image" width={450} height={600} />
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentalHealthLanding;