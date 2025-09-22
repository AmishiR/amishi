"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

type Result = {
  id: string;
  responseid: string;
  anxiety_score: number;
  stress_score: number;
  depression_score: number;
  anxiety_pct: number;
  stress_pct: number;
  depression_pct: number;
  anxiety_ratio: number;
  stress_ratio: number;
  depression_ratio: number;
  anxiety_severity: string;
  stress_severity: string;
  depression_severity: string;
  primary_domain: string;
  created_at: string;
};

const severityInfo: Record<string, string> = {
  None: "No significant symptoms detected.",
  Mild: "Mild symptoms are present but usually manageable in daily life.",
  Moderate:
    "Moderate symptoms may interfere with daily activities and should be monitored.",
  Severe:
    "Severe symptoms strongly impact daily life. Professional support is recommended.",
};

const severityRanges: Record<string, string> = {
  None: "Score 0–4 → No symptoms detected.",
  Mild: "Score 5–9 → Mild symptoms, usually manageable.",
  Moderate: "Score 10–14 → Moderate symptoms, may interfere with daily life.",
  Severe: "Score 15+ → Severe symptoms, professional support is recommended.",
};

const severityColors: Record<string, string> = {
  None: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Mild: "bg-amber-50 text-amber-700 border border-amber-200",
  Moderate: "bg-orange-50 text-orange-700 border border-orange-200",
  Severe: "bg-red-50 text-red-700 border border-red-200",
};

const severityBadgeColors: Record<string, string> = {
  None: "bg-emerald-100 text-emerald-800",
  Mild: "bg-amber-100 text-amber-800",
  Moderate: "bg-orange-100 text-orange-800",
  Severe: "bg-red-100 text-red-800",
};

const severityIconColors: Record<string, string> = {
  None: "text-emerald-600",
  Mild: "text-amber-600",
  Moderate: "text-orange-600",
  Severe: "text-red-600",
};

export default function ResultsList() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUserId(user.id);

      const { data, error } = await supabase
        .from("results")
        .select("*")
        .eq("userid", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setResults(data || []);

      setLoading(false);
    };

    fetchResults();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 text-lg">Loading your results...</p>
      </div>
    );

  if (!userId)
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-red-50 rounded-xl border border-red-200">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Authentication Required
          </h3>
          <p className="text-red-700">Please log in to view your results.</p>
        </div>
      </div>
    );

  if (results.length === 0)
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Results Yet
          </h3>
          <p className="text-gray-600">
            Complete an assessment to see your results here.
          </p>
        </div>
      </div>
    );

  const latest = results[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 px-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Mental Health Dashboard
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Track your mental wellness journey with detailed insights and
            progress over time.
          </p>
        </div>

        {/* Latest Result Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
              Latest Assessment
            </h2>
            <div className="text-sm sm:text-base text-gray-500">
              <span className="block sm:inline">
                {formatDate(latest.created_at).date}
              </span>
              <span className="block sm:inline sm:ml-2">
                at {formatDate(latest.created_at).time}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Anxiety Card */}
            <div
              className={`rounded-xl p-4 sm:p-6 shadow-md transition-all duration-200 hover:shadow-lg ${
                severityColors[latest.anxiety_severity]
              }`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-bold text-lg sm:text-xl">Anxiety</h3>
                <div
                  className={`w-3 h-3 rounded-full ${
                    severityIconColors[latest.anxiety_severity]
                  } bg-current`}
                ></div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {latest.anxiety_score}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      severityBadgeColors[latest.anxiety_severity]
                    }`}
                  >
                    {latest.anxiety_severity}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium opacity-80">
                  {severityRanges[latest.anxiety_severity]}
                </p>
                <p className="text-xs opacity-70 leading-relaxed">
                  {severityInfo[latest.anxiety_severity]}
                </p>
              </div>
            </div>

            {/* Stress Card */}
            <div
              className={`rounded-xl p-4 sm:p-6 shadow-md transition-all duration-200 hover:shadow-lg ${
                severityColors[latest.stress_severity]
              }`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-bold text-lg sm:text-xl">Stress</h3>
                <div
                  className={`w-3 h-3 rounded-full ${
                    severityIconColors[latest.stress_severity]
                  } bg-current`}
                ></div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {latest.stress_score}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      severityBadgeColors[latest.stress_severity]
                    }`}
                  >
                    {latest.stress_severity}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium opacity-80">
                  {severityRanges[latest.stress_severity]}
                </p>
                <p className="text-xs opacity-70 leading-relaxed">
                  {severityInfo[latest.stress_severity]}
                </p>
              </div>
            </div>

            {/* Depression Card */}
            <div
              className={`rounded-xl p-4 sm:p-6 shadow-md transition-all duration-200 hover:shadow-lg ${
                severityColors[latest.depression_severity]
              }`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-bold text-lg sm:text-xl">Depression</h3>
                <div
                  className={`w-3 h-3 rounded-full ${
                    severityIconColors[latest.depression_severity]
                  } bg-current`}
                ></div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {latest.depression_score}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      severityBadgeColors[latest.depression_severity]
                    }`}
                  >
                    {latest.depression_severity}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium opacity-80">
                  {severityRanges[latest.depression_severity]}
                </p>
                <p className="text-xs opacity-70 leading-relaxed">
                  {severityInfo[latest.depression_severity]}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Detailed Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Anxiety Percentage
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">
                  {latest.anxiety_pct}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Stress Percentage
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">
                  {latest.stress_pct}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Depression Percentage
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">
                  {latest.depression_pct}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Primary Domain
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
                  {latest.primary_domain}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Anxiety Ratio
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">
                  {latest.anxiety_ratio}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Stress Ratio
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">
                  {latest.stress_ratio}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">
                  Depression Ratio
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">
                  {latest.depression_ratio}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowTable((prev) => !prev)}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span className="flex items-center">
              {showTable ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Hide History
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  View History ({results.length - 1} more)
                </>
              )}
            </span>
          </button>
        </div>

        {/* Results Table */}
        {showTable && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Assessment History
              </h3>
              <p className="text-gray-600 mt-1">
                All your previous mental health assessments
              </p>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden">
              {results.map((r, index) => (
                <div
                  key={r.id}
                  className="p-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-medium text-gray-900">
                      Assessment #{results.length - index}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(r.created_at).date}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg text-center ${
                        severityColors[r.anxiety_severity]
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">Anxiety</div>
                      <div className="font-bold">{r.anxiety_score}</div>
                      <div className="text-xs">{r.anxiety_severity}</div>
                    </div>
                    <div
                      className={`p-2 rounded-lg text-center ${
                        severityColors[r.stress_severity]
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">Stress</div>
                      <div className="font-bold">{r.stress_score}</div>
                      <div className="text-xs">{r.stress_severity}</div>
                    </div>
                    <div
                      className={`p-2 rounded-lg text-center ${
                        severityColors[r.depression_severity]
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">Depression</div>
                      <div className="font-bold">{r.depression_score}</div>
                      <div className="text-xs">{r.depression_severity}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Primary Domain</div>
                    <div className="font-medium capitalize">
                      {r.primary_domain}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anxiety
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stress
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Depression
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Primary Domain
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{formatDate(r.created_at).date}</div>
                        <div className="text-gray-500">
                          {formatDate(r.created_at).time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            severityBadgeColors[r.anxiety_severity]
                          }`}
                        >
                          <span className="font-bold mr-2">
                            {r.anxiety_score}
                          </span>
                          <span className="text-xs">
                            ({r.anxiety_severity})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            severityBadgeColors[r.stress_severity]
                          }`}
                        >
                          <span className="font-bold mr-2">
                            {r.stress_score}
                          </span>
                          <span className="text-xs">({r.stress_severity})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            severityBadgeColors[r.depression_severity]
                          }`}
                        >
                          <span className="font-bold mr-2">
                            {r.depression_score}
                          </span>
                          <span className="text-xs">
                            ({r.depression_severity})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-medium">
                        {r.primary_domain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
