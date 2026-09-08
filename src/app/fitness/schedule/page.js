import { supabaseServer } from "@/lib/supabaseServer";
import { SAMPLE_SLOTS } from "@/lib/sampleData";
import {
  DAY_NAMES,
  getNextWeekStart,
  formatTime,
  formatWeekLabel,
} from "@/lib/dates";

export const dynamic = "force-dynamic";

async function getSlots() {
  const weekStart = getNextWeekStart();
  const supabase = supabaseServer();
  if (!supabase) return { weekStart, slots: SAMPLE_SLOTS };

  const { data, error } = await supabase
    .from("schedule_slots")
    .select("*, trainers(name)")
    .eq("week_start_date", weekStart)
    .eq("service_type", "assessment")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Failed to load schedule:", error.message);
    return { weekStart, slots: [] };
  }
  return { weekStart, slots: data || [] };
}

export default async function SchedulePage() {
  const { weekStart, slots } = await getSlots();

  const byDay = slots.reduce((acc, slot) => {
    acc[slot.day_of_week] = acc[slot.day_of_week] || [];
    acc[slot.day_of_week].push(slot);
    return acc;
  }, {});

  return (
    <div className="section wrap">
      <p className="eyebrow">Fitness</p>
      <h1>Assessment Schedule</h1>
      <p className="muted">Week of {formatWeekLabel(weekStart)}</p>

      {slots.length === 0 ? (
        <p className="muted" style={{ marginTop: 20 }}>
          No assessment times are posted for this week yet. Check back soon,
          or head to the{" "}
          <a href="/fitness/book">booking page</a> to request a time.
        </p>
      ) : (
        <div className="grid grid-2" style={{ marginTop: 20 }}>
          {DAY_NAMES.map((dayName, idx) =>
            byDay[idx] ? (
              <div className="card" key={dayName}>
                <h2>{dayName}</h2>
                <table>
                  <tbody>
                    {byDay[idx].map((slot) => (
                      <tr key={slot.id}>
                        <td>
                          {formatTime(slot.start_time)} -{" "}
                          {formatTime(slot.end_time)}
                          {slot.trainers?.name && (
                            <div className="muted" style={{ fontSize: "0.85rem" }}>
                              with {slot.trainers.name}
                            </div>
                          )}
                        </td>
                        <td>
                          {slot.is_booked ? (
                            <span className="badge badge-booked">Booked</span>
                          ) : (
                            <a
                              className="btn btn-secondary"
                              href={`/fitness/book?slot=${slot.id}`}
                            >
                              Book
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
