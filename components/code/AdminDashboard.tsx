"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type User = {
  userid: string;
  name: string;
  phone_no: string | null;
  quiz_attempt: number;
  email: string;
};

type Result = {
  id: string;
  userid: string;
  responseid: string;
  anxiety_score: number;
  stress_score: number;
  depression_score: number;
  anxiety_severity: string;
  stress_severity: string;
  depression_severity: string;
  primary_domain: string;
  created_at: string;
};

type Question = {
  queid: string; // q1, q2...
  no: number;
  question_text: string;
  category: string;
};

// Answer scale mapping
const answerLabels: Record<number, string> = {
  0: "Never",
  1: "Sometimes",
  2: "Often",
  3: "Almost always",
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "quiz_attempt">("name");
  const [loading, setLoading] = useState(true);

  const [selectedResponse, setSelectedResponse] = useState<Record<
    string,
    number
  > | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase
        .from("users")
        .select("userid, name, phone_no, quiz_attempt, email");

      const { data: resultData } = await supabase
        .from("results")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: questionData } = await supabase
        .from("questions")
        .select("*")
        .order("no");

      setUsers(userData || []);
      setResults(resultData || []);
      setQuestions(questionData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.quiz_attempt - a.quiz_attempt;
    });

  const getUserName = (userid: string) => {
    const u = users.find((x) => x.userid === userid);
    return u ? u.name : userid;
  };

  const viewResponse = async (responseid: string) => {
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .eq("id", responseid)
      .single();

    if (error) {
      console.error(error);
      alert("Failed to fetch response.");
    } else {
      setSelectedResponse(data);
    }
  };

  const viewUser = async (userid: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("userid", userid)
      .single();

    if (error) {
      console.error(error);
      alert("Failed to fetch user.");
    } else {
      setSelectedUser(data);
    }
  };

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* USERS TABLE */}
      <div>
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            className="border px-3 py-2 rounded w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "quiz_attempt")
            }
          >
            <option value="name">Sort by Name</option>
            <option value="quiz_attempt">Sort by Quiz Attempts</option>
          </select>
        </div>

        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Quiz Attempts</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.userid}>
                <td className="border px-2 py-1">{u.userid}</td>
                <td className="border px-2 py-1">{u.name}</td>
                <td className="border px-2 py-1">{u.phone_no || "-"}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.quiz_attempt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESULTS TABLE */}
      <div>
        <h2 className="text-xl font-bold mb-4">Results</h2>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Anxiety</th>
              <th className="border px-2 py-1">Stress</th>
              <th className="border px-2 py-1">Depression</th>
              <th className="border px-2 py-1">Primary</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td className="border px-2 py-1">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="border px-2 py-1">{getUserName(r.userid)}</td>
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
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => viewResponse(r.responseid)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    View Response
                  </button>
                  <button
                    onClick={() => viewUser(r.userid)}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    User Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESPONSE DETAILS */}
      {selectedResponse && (
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Response Details</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            {questions.map((q) => {
              const ans = selectedResponse[q.queid];
              return (
                <li key={q.queid}>
                  <strong>
                    {q.no}. ({q.category}) {q.question_text} →
                  </strong>{" "}
                  {ans} ({answerLabels[ans]})
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* USER INFO */}
      {selectedUser && (
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">User Info</h3>
          <ul className="list-disc pl-6">
            <li>ID: {selectedUser.userid}</li>
            <li>Name: {selectedUser.name}</li>
            <li>Email: {selectedUser.email}</li>
            <li>Phone: {selectedUser.phone_no || "-"}</li>
            <li>Quiz Attempts: {selectedUser.quiz_attempt}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
