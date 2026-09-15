import { supabaseServer } from "@/lib/supabaseServer";
import { SAMPLE_CAMP_SESSIONS } from "@/lib/sampleData";
import RegisterForm from "./RegisterForm";

export const dynamic = "force-dynamic";

async function getSession(id) {
  if (!id) return null;

  const supabase = supabaseServer();
  if (!supabase) {
    return SAMPLE_CAMP_SESSIONS.find((s) => s.id === id) || null;
  }

  const { data } = await supabase.from("camp_sessions").select("*").eq("id", id).single();
  return data || null;
}

export default async function CampRegisterPage({ searchParams }) {
  const session = await getSession(searchParams?.session);

  if (!session) {
    return (
      <div className="section wrap">
        <p className="eyebrow">Youth Camps</p>
        <h1>Session not found</h1>
        <p className="muted">
          That camp session couldn&apos;t be found -- it may have filled up or
          been removed.
        </p>
        <a className="btn btn-secondary" href="/camps">
          Back to Youth Camps
        </a>
      </div>
    );
  }

  return <RegisterForm session={session} />;
}
