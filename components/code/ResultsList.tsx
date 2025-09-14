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

  if (loading) return <p>Loading results...</p>;
  if (!userId) return <p>Please log in to see your results.</p>;
  if (results.length === 0) return <p>No results found yet.</p>;

  const latest = results[0];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Latest Result</h2>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>Anxiety:</strong> {latest.anxiety_score} (
          {latest.anxiety_severity}) <br />
          <span className="text-gray-600 text-sm">
            {severityRanges[latest.anxiety_severity]}
          </span>
        </li>
        <li>
          <strong>Stress:</strong> {latest.stress_score} (
          {latest.stress_severity}) <br />
          <span className="text-gray-600 text-sm">
            {severityRanges[latest.stress_severity]}
          </span>
        </li>
        <li>
          <strong>Depression:</strong> {latest.depression_score} (
          {latest.depression_severity}) <br />
          <span className="text-gray-600 text-sm">
            {severityRanges[latest.depression_severity]}
          </span>
        </li>
        <li>
          <strong>Anxiety:</strong> {latest.anxiety_score} (
          {latest.anxiety_severity}) <br />
          <span className="text-gray-600 text-sm">
            {severityInfo[latest.anxiety_severity]}
          </span>
        </li>
        <li>
          <strong>Stress:</strong> {latest.stress_score} (
          {latest.stress_severity}) <br />
          <span className="text-gray-600 text-sm">
            {severityInfo[latest.stress_severity]}
          </span>
        </li>
        <li>
          <strong>Depression:</strong> {latest.depression_score} (
          {latest.depression_severity}) <br />
          <span className="text-gray-600 text-sm">
            {severityInfo[latest.depression_severity]}
          </span>
        </li>
        <li>
          Anxiety Score: {latest.anxiety_score} ({latest.anxiety_severity})
        </li>
        <li>
          Stress Score: {latest.stress_score} ({latest.stress_severity})
        </li>
        <li>
          Depression Score: {latest.depression_score} (
          {latest.depression_severity})
        </li>
        <li>Anxiety %: {latest.anxiety_pct}%</li>
        <li>Stress %: {latest.stress_pct}%</li>
        <li>Depression %: {latest.depression_pct}%</li>
        <li>Anxiety Ratio: {latest.anxiety_ratio}%</li>
        <li>Stress Ratio: {latest.stress_ratio}%</li>
        <li>Depression Ratio: {latest.depression_ratio}%</li>
        <li>Primary Domain: {latest.primary_domain}</li>
        <li>Taken on: {new Date(latest.created_at).toLocaleString()}</li>
      </ul>

      <button
        onClick={() => setShowTable((prev) => !prev)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        {showTable ? "Hide All Results" : "Show All Results"}
      </button>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Anxiety</th>
                <th className="border px-2 py-1">Stress</th>
                <th className="border px-2 py-1">Depression</th>
                <th className="border px-2 py-1">Primary</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td className="border px-2 py-1">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">
                    {r.anxiety_score} ({r.anxiety_severity})
                  </td>
                  <td className="border px-2 py-1">
                    {r.stress_score} ({r.stress_severity})
                  </td>
                  <td className="border px-2 py-1">
                    {r.depression_score} ({r.depression_severity})
                  </td>
                  <td className="border px-2 py-1">{r.primary_domain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
