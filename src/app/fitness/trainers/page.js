import { supabaseServer } from "@/lib/supabaseServer";
import { SAMPLE_TRAINERS } from "@/lib/sampleData";

export const dynamic = "force-dynamic";

async function getTrainers() {
  const supabase = supabaseServer();
  if (!supabase) return SAMPLE_TRAINERS;

  const { data, error } = await supabase
    .from("trainers")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load trainers:", error.message);
    return [];
  }
  return data || [];
}

export default async function TrainersPage() {
  const trainers = await getTrainers();

  return (
    <div className="section wrap">
      <p className="eyebrow">Fitness</p>
      <h1>Trainer Portfolios</h1>

      {trainers.length === 0 ? (
        <p className="muted">Trainer profiles are being added. Check back soon.</p>
      ) : (
        <div className="grid grid-2" style={{ marginTop: 20 }}>
          {trainers.map((t) => (
            <div className="card" key={t.id}>
              <h2 style={{ marginBottom: 2 }}>{t.name}</h2>
              {t.title && <p className="muted">{t.title}</p>}
              {t.bio && <p>{t.bio}</p>}
              {t.certifications && (
                <p style={{ fontSize: "0.9rem" }}>
                  <strong>Certifications:</strong> {t.certifications}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
