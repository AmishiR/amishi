"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ResultCard from "./ResultCard";
import ScoreVisualization from "./ScoreVisualization";
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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your results...</p>
        </div>
      </div>
    );

  if (!userId)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">Please log in to view your results.</p>
        </div>
      </div>
    );

  if (results.length === 0)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            No Results Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Complete an assessment to see your results here.
          </p>
          <a
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Take Assessment
          </a>
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
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Mental Health Dashboard
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Track your mental wellness journey with detailed insights and
            progress over time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Latest Result Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
              Latest Assessment Results
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
            <ResultCard
              title="Anxiety"
              score={latest.anxiety_score}
              severity={latest.anxiety_severity}
              severityColors={severityColors}
              severityBadgeColors={severityBadgeColors}
              severityIconColors={severityIconColors}
              severityRanges={severityRanges}
              severityInfo={severityInfo}
            />
            <ResultCard
              title="Stress"
              score={latest.stress_score}
              severity={latest.stress_severity}
              severityColors={severityColors}
              severityBadgeColors={severityBadgeColors}
              severityIconColors={severityIconColors}
              severityRanges={severityRanges}
              severityInfo={severityInfo}
            />
            <ResultCard
              title="Depression"
              score={latest.depression_score}
              severity={latest.depression_severity}
              severityColors={severityColors}
              severityBadgeColors={severityBadgeColors}
              severityIconColors={severityIconColors}
              severityRanges={severityRanges}
              severityInfo={severityInfo}
            />
          </div>

          {/* Score Visualization */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Score Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ScoreVisualization
                score={latest.anxiety_score}
                percentage={latest.anxiety_pct}
                label="Anxiety"
                color="text-blue-600"
              />
              <ScoreVisualization
                score={latest.stress_score}
                percentage={latest.stress_pct}
                label="Stress"
                color="text-orange-600"
              />
              <ScoreVisualization
                score={latest.depression_score}
                percentage={latest.depression_pct}
                label="Depression"
                color="text-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div
            className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex justify-between items-center cursor-pointer"
            onClick={() => setShowTable((prev) => !prev)}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Assessment History
              </h3>
              <p className="text-gray-600 mt-2">
                Track your progress and view all previous mental health
                assessments
              </p>
            </div>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
                    Hide
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
                    View
                  </>
                )}
              </span>
            </button>
          </div>
          {showTable && (
            <>
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
                        <div className="text-xs font-medium mb-1">
                          Depression
                        </div>
                        <div className="font-bold">{r.depression_score}</div>
                        <div className="text-xs">{r.depression_severity}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-500">
                        Primary Domain
                      </div>
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
                            <span className="text-xs">
                              ({r.stress_severity})
                            </span>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
