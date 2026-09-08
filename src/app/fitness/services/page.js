const services = [
  {
    id: "assessment",
    title: "Fitness Assessment",
    desc: "A one-on-one session to evaluate current fitness level, mobility, and goals, and build a starting plan.",
    price: "Free",
    cta: { label: "See open times", href: "/fitness/schedule" },
  },
  {
    id: "nutrition-consult",
    title: "Nutrition Focused Consultant",
    desc: "A one-on-one session with a nutrition coach to look at current eating patterns and set realistic next steps.",
    price: "$75 / session",
    cta: { label: "Book a consult", href: "/fitness/book?service=nutrition_consult" },
  },
  {
    id: "grocery-visit",
    title: "Guided Grocery Store Visit",
    desc: "A coach shops with you, walking the aisles together to build confidence picking healthier options on a real budget.",
    price: "$60 / visit",
    cta: { label: "Book a visit", href: "/fitness/book?service=grocery_visit" },
  },
  {
    id: "workout-plans",
    title: "Workout Plans",
    desc: "A written plan built around your goals, schedule, and available equipment, with regular check-ins to adjust it.",
    price: "$50 / plan",
    cta: { label: "Request a plan", href: "/fitness/book?service=workout_plan" },
  },
  {
    id: "meal-prep",
    title: "Meal Preparation",
    desc: "Choose either your first week of meals fully cooked and prepped for you, or a guided plan so you can prep them yourself.",
    price: "From $90 / week",
    cta: { label: "Request meal prep", href: "/fitness/book?service=meal_prep" },
  },
];

export default function ServicesPage() {
  return (
    <div className="section wrap">
      <p className="eyebrow">Fitness</p>
      <h1>Services</h1>
      <p className="muted" style={{ maxWidth: 640 }}>
        Not sure which of these fits best? Try the{" "}
        <a href="/fitness/nutrition">nutrition pathway questionnaire</a> first
        — it points you toward the right starting service.
      </p>

      <div className="grid grid-2" style={{ marginTop: 24 }}>
        {services.map((s) => (
          <div className="card" id={s.id} key={s.id}>
            <h2 style={{ marginBottom: 4 }}>{s.title}</h2>
            <p className="muted" style={{ fontWeight: 600 }}>{s.price}</p>
            <p>{s.desc}</p>
            <a className="btn" href={s.cta.href}>
              {s.cta.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
