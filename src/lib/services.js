// Single source of truth for what a booking of each service type costs.
// The booking API route re-reads this on the server, so a client can never
// submit its own price. Edit these numbers here (and to match, on the
// /fitness/services page copy) when prices change -- a future step is to
// move this into Supabase and edit it from /admin like the menu.

export const SERVICES = {
  assessment: { label: "Fitness Assessment", amountCents: 0 },
  nutrition_consult: { label: "Nutrition Focused Consultant", amountCents: 7500 },
  grocery_visit: { label: "Guided Grocery Store Visit", amountCents: 6000 },
  workout_plan: { label: "Workout Plan", amountCents: 5000 },
  meal_prep: { label: "Meal Preparation (first week)", amountCents: 9000 },
};

export function getService(serviceType) {
  return SERVICES[serviceType] || null;
}
