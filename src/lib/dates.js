// Small date helpers shared by the smoothie hours and fitness schedule pages.

export const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Returns the Monday (YYYY-MM-DD) of the week that contains `date`.
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday ... 6 = Saturday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

// Returns the Monday (YYYY-MM-DD) of the week that follows `date`.
export function getNextWeekStart(date = new Date()) {
  const thisWeek = new Date(getWeekStart(date));
  thisWeek.setDate(thisWeek.getDate() + 7);
  return thisWeek.toISOString().slice(0, 10);
}

// Formats a "HH:MM:SS" (or "HH:MM") time string as e.g. "9:00 AM".
export function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatWeekLabel(weekStartISO) {
  const start = new Date(weekStartISO + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const opts = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-US", opts)} - ${end.toLocaleDateString(
    "en-US",
    opts
  )}`;
}
