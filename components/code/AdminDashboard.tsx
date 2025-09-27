"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Users,
  BarChart3,
  Search,
  Filter,
  Eye,
  UserCheck,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Brain,
  Heart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

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
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

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
      setShowResponseModal(true);
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
      setShowUserModal(true);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Monitor user activity and assessment results</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">Completed assessments</p>
          </CardContent>
        </Card>
      </div>
      {/* USERS SECTION */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
          <CardDescription>
            Manage registered users and their assessment attempts
          </CardDescription>
        </CardHeader>
          
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "quiz_attempt")
              }
            >
              <option value="name">Sort by Name</option>
              <option value="quiz_attempt">Sort by Quiz Attempts</option>
            </select>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((u) => (
                    <tr key={u.userid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{u.userid.slice(0, 8)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.phone_no || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">{u.quiz_attempt}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((u) => (
              <div key={u.userid} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{u.name}</h3>
                  <Badge variant="secondary">{u.quiz_attempt} attempts</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{u.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-gray-900">{u.phone_no || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID:</span>
                    <span className="text-gray-900 font-mono">{u.userid.slice(0, 8)}...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RESULTS SECTION */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Assessment Results</span>
          </CardTitle>
          <CardDescription>
            View and analyze user mental health assessment results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anxiety</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Depression</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getUserName(r.userid)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">
                          {r.anxiety_score} ({r.anxiety_severity})
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">
                          {r.stress_score} ({r.stress_severity})
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">
                          {r.depression_score} ({r.depression_severity})
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{r.primary_domain}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => viewResponse(r.responseid)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Response
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => viewUser(r.userid)}
                          >
                            <UserCheck className="w-3 h-3 mr-1" />
                            User
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {results.map((r) => (
              <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{getUserName(r.userid)}</h3>
                  <span className="text-xs text-gray-500">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="w-full">
                      A: {r.anxiety_score}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{r.anxiety_severity}</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="w-full">
                      S: {r.stress_score}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{r.stress_severity}</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="w-full">
                      D: {r.depression_score}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{r.depression_severity}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Primary: <strong className="capitalize">{r.primary_domain}</strong></span>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => viewResponse(r.responseid)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => viewUser(r.userid)}>
                      <UserCheck className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      
      {/* Response Modal */}
      <Modal
        open={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        title="Response Details"
        maxWidth="max-w-4xl"
      >
        {selectedResponse && (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((q) => {
                const ans = selectedResponse[q.queid];
                return (
                  <div key={q.queid} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Q{q.no} ({q.category})</span>
                      <Badge variant="secondary">
                        {answerLabels[ans]}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-900">{q.question_text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>

      {/* User Info Modal */}
      <Modal
        open={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Information"
      >
        {selectedUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">User ID</h4>
              <p className="text-sm text-gray-900 font-mono">{selectedUser.userid}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
              <p className="text-sm text-gray-900">{selectedUser.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
              <p className="text-sm text-gray-900">{selectedUser.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
              <p className="text-sm text-gray-900">{selectedUser.phone_no || "Not provided"}</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Quiz Attempts</h4>
              <Badge variant="secondary">{selectedUser.quiz_attempt}</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
