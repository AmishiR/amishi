import { BarChart3, TrendingUp, Calendar, PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-1">Detailed analytics for mental health assessments</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Trend Analysis</p>
              <p className="text-lg font-bold text-gray-900">Coming Soon</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progress Tracking</p>
              <p className="text-lg font-bold text-gray-900">Coming Soon</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Distribution</p>
              <p className="text-lg font-bold text-gray-900">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
          <BarChart3 className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Comprehensive analytics including trend analysis, progress tracking, and detailed insights 
          are being developed to help you better understand mental health patterns.
        </p>
      </div>
    </div>
  );
}
