"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bgImage from '@/public/images/gradient.png';

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
  <div 
    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
    style={{
    backgroundImage: `url(${bgImage.src})`,
    height: '1200px',   
    width: '100%',     
    backgroundSize: 'cover',    
    backgroundPosition: 'center', 
  }}
  >
    {/* Overlay for better readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-from))]/70 via-[hsl(var(--gradient-via))]/60 to-[hsl(var(--gradient-to))]/70 backdrop-blur-sm"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-top duration-700">
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-lg text-foreground text-sm font-semibold mb-8">
          <div className="w-2 h-2 rounded-full bg-primary mr-2.5 animate-pulse"></div>
          Mental Health Assessment
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
          How are you feeling?
        </h1>
        <p className="text-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Please answer honestly based on how you've been feeling recently
        </p>
      </div>

      {/* Question Card */}
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6 sm:p-10">
          {/* Progress Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Progress</span>
              <span className="text-sm font-bold text-foreground bg-secondary/50 px-3 py-1 rounded-full">
                {current + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ 
                  width: `${((current + 1) / questions.length) * 100}%`,
                  backgroundColor: '#C77855' 
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30 capitalize">
                {q.category}
              </span>
              <span className="text-sm text-muted-foreground font-medium">Question {current + 1}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-relaxed">
              {q.question_text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-10">
            {[0, 1, 2, 3].map((val, idx) => {
              const selected = answers[q.queid] === val;
              const id = `${q.queid}-${val}`;
              return (
                <label
                  key={val}
                  htmlFor={id}
                  className={`group relative flex cursor-pointer items-center rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 transform hover:scale-[1.02] ${
                    selected
                      ? "border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg shadow-primary/20"
                      : "border-border bg-white/50 hover:border-primary/50 hover:bg-quiz-hover/50 hover:shadow-md"
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
                    className={`mr-5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary shadow-md"
                        : "border-muted-foreground/40 group-hover:border-primary/50"
                    }`}
                  >
                    {selected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-white animate-in zoom-in duration-300"></div>
                    )}
                  </div>
                  
                  {/* Answer Text */}
                  <div className="flex-1">
                    <span className={`text-lg sm:text-xl font-semibold transition-colors ${
                      selected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                    }`}>
                      {valueLabels[val]}
                    </span>
                  </div>
                  
                  {/* Letter Badge */}
                  <span
                    className={`ml-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                      selected
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted/80 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    }`}
                  >
                    {letters[idx]}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={current === 0 || submitting}
              className="sm:flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-border rounded-2xl text-foreground bg-white hover:bg-muted/50 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-bold text-lg hover:border-primary/50"
            >
              ← Previous
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={!hasSelection || submitting}
              className="sm:flex-[2] inline-flex items-center justify-center px-10 py-4 border-2 border-transparent rounded-2xl text-white bg-black hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-black/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg transform hover:scale-[1.02]"
            >
              {current === questions.length - 1
                ? submitting
                  ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3"></div>
                        Submitting...
                      </>
                    )
                  : "Complete Assessment ✓"
                : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
