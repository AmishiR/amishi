"use client";
import React from 'react';
import { Heart, Shield, Users, Zap, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "A Safe Space",
      description: "A secure, confidential environment created specifically for your mental wellness journey.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Zap,
      title: "One-Stop Solution", 
      description: "Everything you need for mental health support in one comprehensive platform.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Heart,
      title: "Affordable Care",
      description: "Quality mental wellness support that doesn't break the bank - accessible to everyone.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with qualified mental health professionals and supportive community members.",
      color: "bg-green-100 text-green-600"
    }
  ];

  const stats = [
    { number: "10K+", label: "Users Supported" },
    { number: "500+", label: "Mental Health Professionals" },
    { number: "95%", label: "User Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    "Confidential and secure platform",
    "Evidence-based therapeutic approaches", 
    "Personalized treatment plans",
    "Affordable pricing options",
    "Professional and peer support",
    "Progress tracking tools"
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50 ">


        {/* Header */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-5xl font-thin mb-4">About MindZen</h2>

        </div>
        <div className="flex items-center justify-center gap-64 max-w-6xl mx-auto px-4">
          <div className="flex-1 flex justify-center">
            <Image 
              src="/gif/mind.gif" 
              alt="MindZen Animation" 
              width={500} 
              height={300} 
              unoptimized
            />
          </div>
          <div className="flex">
            <div className="p-8 max-w-lg">
              <p className="text-lg font-light text-black mb-6">
                Your trusted partner in mental wellness. We provide a safe, affordable, and comprehensive platform to support your mental health journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Licensed professionals available 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">HIPAA compliant and fully encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-gray-700">Personalized care plans for every individual</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-gray-700">Rated 4.9/5 by thousands of users</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-black">
                <p className="text-sm text-gray-600 italic">
                  "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
                </p>
              </div>
            </div>
          </div>
          
        </div>
    </section>
  );
};

export default AboutSection;