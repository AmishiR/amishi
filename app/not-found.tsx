import Link from "next/link";
import { Home, Search, ArrowLeft, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* MindZen Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">MindZen</span>
          </div>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-6">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to your mental wellness journey.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>
          
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
          >
            <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Take Assessment
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/quiz"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Mental Health Assessment
            </Link>
            <Link
              href="/quiz/result"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View Results
            </Link>
            <Link
              href="/quiz/dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Crisis Support */}
        <div className="mt-12 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800 font-semibold text-sm">Need Immediate Help?</span>
          </div>
          <p className="text-red-700 text-sm">
            Crisis support is available 24/7. Call or text <strong>988</strong> for free, confidential support.
          </p>
        </div>
      </div>
    </div>
  );
}
