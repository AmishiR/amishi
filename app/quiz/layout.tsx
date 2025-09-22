import { LogoutButton } from "@/components/auth/logout-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      <div className="flex-1 w-full flex flex-col gap-8 items-center">
        {/* HEADER */}
        <nav className="w-full border-b border-b-foreground/10 h-16 flex items-center justify-center">
          <div className="w-full max-w-5xl flex items-center justify-between px-4 py-2 text-sm">
            <span className="font-bold text-lg">MindZen Quiz</span>
            <span className="text-right truncate max-w-[150px] sm:max-w-xs">
              {data.claims.email}
              <LogoutButton />
            </span>
          </div>
        </nav>
        <div className="flex-1 flex flex-col w-full max-w-5xl p-4 sm:p-5">
          {children}
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-8 sm:py-16 px-2">
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
        </footer>
      </div>
    </main>
  );
}
