import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Questionnaire from "@/components/code/Questionnaire";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return <Questionnaire userid={data.claims.sub} />;
}
