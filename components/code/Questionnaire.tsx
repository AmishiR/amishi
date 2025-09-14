"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

type Question = {
  queid: string; // e.g., "q1"
  no: number;
  question_text: string;
  category: "anxiety" | "stress" | "depression";
};
type ResponseInsert = {
  userid: string;
  // dynamic question fields like q1, q2 ... with numeric answers
  [queid: string]: string | number;
};

export default function Questionnaire({ userid }: { userid: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1. Load questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("no");
      if (error) {
        console.error(error);
      } else {
        setQuestions((data as Question[]) || []);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [supabase]);

  // 2. Handle answer selection
  const handleAnswer = (queid: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [queid]: value }));
  };

  // 3. Submit answers
  const handleSubmit = async () => {
    if (!userid) {
      alert("You must be logged in to submit responses.");
      return;
    }
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);

    const payload: ResponseInsert = { userid, ...answers };
    const { error } = await supabase.from("responses").insert(payload);

    if (error) {
      console.error(error);
      alert("Error saving responses: " + error.message);
    } else {
      alert("✅ Responses saved! Your results will be computed.");
      redirect("/protected/result");
    }

    setSubmitting(false);
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mental Health Questionnaire</h1>
      <p className="text-gray-600 mb-6">
        Please answer each question (0 = Never, 1 = Sometimes, 2 = Often, 3 =
        Almost always).
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {questions.map((q) => (
          <div
            key={q.queid}
            className="p-4 border rounded-lg shadow-sm"
          >
            <p className="mb-2 font-medium">
              {q.queid.toUpperCase()} ({q.category}): {q.question_text}
            </p>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((val) => (
                <label
                  key={val}
                  className="flex items-center gap-1"
                >
                  <input
                    type="radio"
                    name={q.queid}
                    value={val}
                    checked={answers[q.queid] === val}
                    onChange={() => handleAnswer(q.queid, val)}
                  />
                  {val}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Responses"}
        </button>
      </form>
    </div>
  );
}
