"use client";

import { useRouter } from "next/navigation";
import { EnvVarWarning } from "@/components/env-var-warning";
// import { AuthButton } from "@/components/auth/auth-button";
import { Hero } from "@/components/hero";
import { hasEnvVars } from "@/lib/utils";

function Quiz() {
  const router = useRouter();

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      type="button"
      onClick={() => router.push("/quiz")}
    >
      Go to Quiz
    </button>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
            <div className="flex items-center space-x-4">
              {/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />} */}
              {!hasEnvVars ? <EnvVarWarning /> : <Quiz />}
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
        </div>

        {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://gdgrbu.tech"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              GDG RBU
            </a>
          </p>
        </footer> */}
      </div>
    </main>
  );
}
