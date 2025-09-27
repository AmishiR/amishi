"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain,
  Heart,
  Shield,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { FeatureCard } from "./ui/feature-card";
import { Navigation } from "./ui/navigation";
import { Footer } from "./ui/footer";

export function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Brain,
      title: "Scientific Assessment",
      description: "Evidence-based questionnaires validated by mental health professionals to accurately assess anxiety, depression, and stress levels.",
    },
    {
      icon: BarChart3,
      title: "Personalized Insights",
      description: "Detailed analytics and visualizations help you understand your mental health patterns and track progress over time.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your mental health data is encrypted and secure. We prioritize your privacy with industry-leading security measures.",
    },
    {
      icon: Heart,
      title: "Holistic Wellbeing",
      description: "Comprehensive approach to mental wellness addressing anxiety, depression, stress, and overall emotional health.",
    },
    {
      icon: Clock,
      title: "Progress Tracking",
      description: "Monitor your mental health journey with detailed historical data and progress visualization tools.",
    },
    {
      icon: Users,
      title: "Professional Support",
      description: "Connect with mental health resources and professional support when you need it most.",
    },
  ];

  const benefits = [
    "Take control of your mental wellness",
    "Understand your anxiety and stress patterns",
    "Track depression symptoms over time",
    "Get personalized mental health insights",
    "Access professional resources and support",
    "Build healthier coping mechanisms",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Mental Wellness Platform
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your{" "}
              <span className="text-blue-600">
                Mental Wellbeing
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your mental health journey with our scientifically-backed assessments 
              for anxiety, depression, and stress. Get personalized insights and connect with 
              professional support when you need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push("/quiz")}
                className="group bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center"
              >
                Start Your Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-medium px-6 py-4 transition-colors"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Free & Confidential
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Evidence-Based
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MindZen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines scientific rigor with user-friendly design to provide 
              the most comprehensive mental health assessment experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Take Control of Your Mental Health
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Mental health is just as important as physical health. Our platform helps you 
                understand your emotional wellbeing, identify patterns, and take proactive steps 
                toward better mental health.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => router.push("/quiz")}
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Progress Tracking</h4>
                    <p className="text-sm text-gray-600">Monitor your improvements over time</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <Brain className="w-8 h-8 text-purple-600 mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Smart Insights</h4>
                    <p className="text-sm text-gray-600">AI-powered mental health analysis</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <Heart className="w-8 h-8 text-red-500 mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Holistic Care</h4>
                    <p className="text-sm text-gray-600">Complete wellbeing approach</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <Shield className="w-8 h-8 text-green-500 mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
                    <p className="text-sm text-gray-600">Your data is always protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Mental Wellness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands who have taken control of their mental health. 
            Start with a free, confidential assessment today.
          </p>
          
          <button
            onClick={() => router.push("/quiz")}
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center"
          >
            Take Free Assessment
            <ArrowRight className="w-6 h-6 ml-2" />
          </button>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Takes only 5 minutes
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              100% Confidential
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Instant Results
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mental Health Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access professional support and educational resources for your mental health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crisis Support</h3>
              <p className="text-gray-600 mb-4">
                Immediate help is available 24/7 if you're experiencing a mental health crisis.
              </p>
              <div className="text-red-600 font-semibold">
                Call or text 988 for free, confidential support
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Educational Resources</h3>
              <p className="text-gray-600 mb-4">
                Learn about mental health conditions, treatment options, and wellness strategies.
              </p>
              <a
                href="https://www.mentalhealth.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Explore resources →
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Support</h3>
              <p className="text-gray-600 mb-4">
                Connect with mental health professionals, support groups, and community resources.
              </p>
              <a
                href="https://www.nami.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Find support →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
