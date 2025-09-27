import Link from "next/link";
import { Heart, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MindZen</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering your mental wellness journey with evidence-based tools
              for anxiety, depression, and stress management.
            </p>
            <div className="flex items-center space-x-1 text-red-500">
              <Heart size={16} className="fill-current" />
              <span className="text-sm">Made with care for your wellbeing</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/quiz"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Mental Health Assessment
              </Link>
              <Link
                href="/quiz/result"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                View Results
              </Link>
              <Link
                href="/quiz/dashboard"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Mental Health Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://www.mentalhealth.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Mental Health Information
              </a>
              <a
                href="https://www.nimh.nih.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                NIMH Resources
              </a>
              <a
                href="https://www.nami.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                NAMI Support
              </a>
            </div>
          </div>

          {/* Crisis Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 font-medium text-sm mb-2">
                  Crisis Support 24/7
                </p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-red-700">
                    <Phone size={14} />
                    <span className="text-sm">988 Lifeline</span>
                  </div>
                  <p className="text-xs text-red-600">
                    Call or text 988 for free, confidential support
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={14} />
                <a
                  href="mailto:support@mindzen.com"
                  className="text-sm hover:text-blue-600 transition-colors"
                >
                  support@mindzen.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 MindZen. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> MindZen provides educational tools and is not a substitute 
              for professional medical advice, diagnosis, or treatment. Always seek the advice of 
              qualified health providers with any questions about mental health conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
