import { supabaseServer } from "@/lib/supabaseServer";
import { SAMPLE_CAMP_SESSIONS } from "@/lib/sampleData";
import { SPORTS } from "@/lib/camps";
import { formatMoney } from "@/lib/dates";

export const dynamic = "force-dynamic";

async function getSessions() {
  const supabase = supabaseServer();
  if (!supabase) return SAMPLE_CAMP_SESSIONS;

  const { data, error } = await supabase
    .from("camp_sessions")
    .select("*")
    .eq("is_active", true)
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Failed to load camp sessions:", error.message);
    return [];
  }
  return data || [];
}

function formatDateRange(start, end) {
  const opts = { month: "short", day: "numeric" };
  const s = new Date(start + "T00:00:00").toLocaleDateString("en-US", opts);
  const e = new Date(end + "T00:00:00").toLocaleDateString("en-US", opts);
  return `${s} - ${e}`;
}

export default async function CampsPage() {
  const sessions = await getSessions();

  const bySport = sessions.reduce((acc, s) => {
    acc[s.sport] = acc[s.sport] || [];
    acc[s.sport].push(s);
    return acc;
  }, {});

  return (
    <div className="section wrap">
      <p className="eyebrow">Youth Camps</p>
      <h1>Flag Football, Soccer &amp; Track camps</h1>
      <p className="muted" style={{ maxWidth: 640 }}>
        Coach-led camps for young athletes. Take a look at each sport below,
        then register for an upcoming session.
      </p>

      <div className="grid" style={{ marginTop: 30, gap: 34 }}>
        {Object.entries(SPORTS).map(([key, sport]) => (
          <div className="card" key={key} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${sport.videoId}`}
                title={sport.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
            <div style={{ padding: 22 }}>
              <h2 style={{ marginBottom: 4 }}>{sport.label}</h2>
              <p className="muted">{sport.description}</p>
              {sport.videoCredit && (
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 14 }}>
                  {sport.videoCredit}
                </p>
              )}

              {(bySport[key] || []).length === 0 ? (
                <p className="muted">No sessions posted yet -- check back soon.</p>
              ) : (
                <div className="grid grid-2">
                  {bySport[key].map((s) => (
                    <div
                      key={s.id}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        padding: 14,
                      }}
                    >
                      <strong>{s.title}</strong>
                      <div className="muted" style={{ fontSize: "0.9rem", margin: "4px 0 10px" }}>
                        {formatDateRange(s.start_date, s.end_date)} &middot;{" "}
                        {formatMoney(s.price_cents)}
                      </div>
                      <a className="btn" href={`/camps/register?session=${s.id}`}>
                        Register
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
