"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [current, setCurrent] = useState(0); // new: single-question paging

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
      router.push("/quiz/result");
    }

    setSubmitting(false);
  };

  const handleNext = async () => {
    if (current === questions.length - 1) {
      await handleSubmit();
    } else {
      setCurrent((i) => i + 1);
    }
  };

  const handlePrev = () => setCurrent((i) => Math.max(0, i - 1));

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your assessment...</p>
        </div>
      </div>
    );
  const q = questions[current];
  const hasSelection = q && answers[q.queid] !== undefined;

  const letters = ["A", "B", "C", "D"];
  const valueLabels = ["Never", "Sometimes", "Often", "Almost always"];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium mb-6">
            Mental Health Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How are you feeling?</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Please answer each question honestly based on how you've been feeling recently. Your responses help us understand your mental wellness.
          </p>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">Question Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {current + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mr-3 capitalize">
                  {q.category}
                </span>
                <span className="text-sm text-gray-500">Question {current + 1}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed">{q.question_text}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {[0, 1, 2, 3].map((val, idx) => {
                const selected = answers[q.queid] === val;
                const id = `${q.queid}-${val}`;
                return (
                  <label
                    key={val}
                    htmlFor={id}
                    className={`group relative flex cursor-pointer items-center rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${
                      selected
                        ? "border-gray-900 bg-gray-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={q.queid}
                      value={val}
                      checked={selected}
                      onChange={() => handleAnswer(q.queid, val)}
                      className="sr-only"
                    />
                    
                    {/* Radio Button */}
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                        selected
                          ? "border-gray-900 bg-gray-900"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {selected && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    
                    {/* Answer Text */}
                    <div className="flex-1">
                      <span className={`text-base sm:text-lg font-medium ${
                        selected ? "text-gray-900" : "text-gray-700"
                      }`}>
                        {valueLabels[val]}
                      </span>
                    </div>
                    
                    {/* Letter Badge */}
                    <span
                      className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        selected
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                    >
                      {letters[idx]}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={current === 0 || submitting}
                className="order-2 sm:order-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Previous
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSelection || submitting}
                className="order-1 sm:order-2 inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
              >
                {current === questions.length - 1
                  ? submitting
                    ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      )
                    : "Complete Assessment"
                  : "Next Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
