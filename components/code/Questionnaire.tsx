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
      <p className="grid min-h-[50vh] place-items-center">
        Loading questions...
      </p>
    );
  const q = questions[current];
  const hasSelection = q && answers[q.queid] !== undefined;

  const letters = ["A", "B", "C", "D"];
  const valueLabels = ["Never", "Sometimes", "Often", "Almost always"];

  return (
    <div className="min-h-screen grid place-items-center">
      {/* <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md"> */}
      <div className="w-full max-w-xl rounded-2xl ">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl ">Quiz</h1>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Question {current + 1} of {questions.length}
            </span>
          </div>
        </div>

        <p className="mb-4 text-lg font-medium">{q.question_text}</p>

        <div className="space-y-3">
          {[0, 1, 2, 3].map((val, idx) => {
            const selected = answers[q.queid] === val;
            const id = `${q.queid}-${val}`;
            return (
              <label
                key={val}
                htmlFor={id}
                className={`relative flex cursor-pointer items-center rounded-xl border p-4 pr-12 transition ${
                  selected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
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
                <span
                  className={`mr-3 grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 text-slate-600"
                  }`}
                >
                  {letters[idx]}
                </span>
                <span className="text-slate-700">{valueLabels[val]}</span>
                <span
                  className={`absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${
                    selected
                      ? "bg-blue-600 ring-2 ring-blue-600"
                      : "ring-2 ring-slate-300"
                  }`}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={current === 0 || submitting}
            className="rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasSelection || submitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {current === questions.length - 1
              ? submitting
                ? "Submitting..."
                : "Submit"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
