// Placeholder content shown only when Supabase isn't configured (see
// src/lib/supabaseServer.js). This is what makes it possible to deploy a
// working preview link for a client before any real hours/menu/trainer
// data has been entered. Clearly labeled everywhere it's used so nobody
// mistakes it for real business info.

export const SAMPLE_HOURS = [
  { id: "s1", day_of_week: 0, open_time: "07:00:00", close_time: "18:00:00", is_closed: false },
  { id: "s2", day_of_week: 1, open_time: "07:00:00", close_time: "18:00:00", is_closed: false },
  { id: "s3", day_of_week: 2, open_time: "07:00:00", close_time: "18:00:00", is_closed: false },
  { id: "s4", day_of_week: 3, open_time: "07:00:00", close_time: "18:00:00", is_closed: false },
  { id: "s5", day_of_week: 4, open_time: "07:00:00", close_time: "20:00:00", is_closed: false },
  { id: "s6", day_of_week: 5, open_time: "08:00:00", close_time: "16:00:00", is_closed: false },
  { id: "s7", day_of_week: 6, open_time: "", close_time: "", is_closed: true },
];

export const SAMPLE_MENU = [
  { id: "m1", name: "Green Machine", description: "Spinach, mango, banana, oat milk", price_cents: 795, category: "Smoothies", is_available: true, sort_order: 1 },
  { id: "m2", name: "Berry Blast", description: "Mixed berries, banana, yogurt", price_cents: 795, category: "Smoothies", is_available: true, sort_order: 2 },
  { id: "m3", name: "Peanut Power", description: "Peanut butter, banana, cocoa, protein", price_cents: 895, category: "Smoothies", is_available: true, sort_order: 3 },
  { id: "m4", name: "Tropical Sunrise", description: "Pineapple, mango, orange juice", price_cents: 795, category: "Smoothies", is_available: true, sort_order: 4 },
  { id: "m5", name: "Extra protein boost", description: "Add a scoop to any smoothie", price_cents: 150, category: "Add-ons", is_available: true, sort_order: 1 },
  { id: "m6", name: "Chia seeds", description: "Add to any smoothie", price_cents: 100, category: "Add-ons", is_available: true, sort_order: 2 },
];

export const SAMPLE_TRAINERS = [
  {
    id: "t1",
    name: "Jordan Reyes",
    title: "Head Trainer",
    bio: "10 years coaching strength and conditioning, focused on sustainable habit change over quick fixes.",
    certifications: "NASM-CPT, Precision Nutrition Level 1",
    sort_order: 1,
  },
  {
    id: "t2",
    name: "Amara Chen",
    title: "Nutrition Coach",
    bio: "Works one-on-one with clients on nutrition pathways, grocery visits, and meal prep plans.",
    certifications: "Registered Dietitian, ACE Certified",
    sort_order: 2,
  },
];

export const SAMPLE_SLOTS = [
  { id: "sl1", day_of_week: 0, start_time: "09:00:00", end_time: "09:30:00", is_booked: false, trainers: { name: "Jordan Reyes" } },
  { id: "sl2", day_of_week: 0, start_time: "10:00:00", end_time: "10:30:00", is_booked: true, trainers: { name: "Jordan Reyes" } },
  { id: "sl3", day_of_week: 2, start_time: "09:00:00", end_time: "09:30:00", is_booked: false, trainers: { name: "Amara Chen" } },
  { id: "sl4", day_of_week: 4, start_time: "17:00:00", end_time: "17:30:00", is_booked: false, trainers: { name: "Jordan Reyes" } },
];
