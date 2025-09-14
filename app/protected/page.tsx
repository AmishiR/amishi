import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Questionnaire from "@/components/code/Questionnaire";
// import { InfoIcon } from "lucide-react";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        {/* <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon
            size="16"
            strokeWidth={2}
          />
          This is a protected page that you can only see as an authenticated
          user
        </div> */}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className=" text-md mb-4">Your user details</h2>
        <ul className="list-disc list-inside">
          <li>User ID: {data.claims.sub}</li>
          <li>Email: {data.claims.email}</li>
          <li>Role: {data.claims.role}</li>
          <li>Name : {data.claims.user_metadata.name}</li>
          {/* <li> Data : {JSON.stringify(data.claims, null, 2)}</li> */}
        </ul>
      </div>
      <Questionnaire userid={data.claims.sub} />
    </div>
  );
}
