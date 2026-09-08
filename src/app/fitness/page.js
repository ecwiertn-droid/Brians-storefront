export default function FitnessPage() {
  const services = [
    {
      title: "Fitness Assessment",
      desc: "A one-on-one session to evaluate where you're starting from and set a plan.",
      href: "/fitness/schedule",
      cta: "See open times",
    },
    {
      title: "Nutrition Pathway",
      desc: "A short, conversational questionnaire that points you toward the right support.",
      href: "/fitness/nutrition",
      cta: "Start the questionnaire",
    },
    {
      title: "Nutrition Consultant",
      desc: "One-on-one nutrition coaching focused on your goals and routine.",
      href: "/fitness/services#nutrition-consult",
      cta: "Learn more",
    },
    {
      title: "Guided Grocery Store Visit",
      desc: "Shop with a coach who helps you build confidence making healthier picks.",
      href: "/fitness/services#grocery-visit",
      cta: "Learn more",
    },
    {
      title: "Workout Plans",
      desc: "A plan built around your goals, schedule, and equipment access.",
      href: "/fitness/services#workout-plans",
      cta: "Learn more",
    },
    {
      title: "Meal Preparation",
      desc: "Your first week of meals prepped for you, or a guided plan to prep your own.",
      href: "/fitness/services#meal-prep",
      cta: "Learn more",
    },
  ];

  return (
    <div className="section wrap">
      <p className="eyebrow">Fitness</p>
      <h1>Coaching, assessments &amp; nutrition support</h1>
      <p className="muted" style={{ maxWidth: 640 }}>
        Meet the training team, grab an open assessment slot, and use the
        nutrition pathway to figure out which kind of support actually fits
        where you are right now.
      </p>

      <div className="grid grid-2" style={{ marginTop: 24, marginBottom: 34 }}>
        <a
          className="card"
          href="/fitness/trainers"
          style={{ textDecoration: "none" }}
        >
          <p className="eyebrow">Meet the team</p>
          <h2>Trainer Portfolios</h2>
          <p className="muted">
            Certifications, specialties, and background for each trainer.
          </p>
        </a>
        <a
          className="card"
          href="/fitness/schedule"
          style={{ textDecoration: "none" }}
        >
          <p className="eyebrow">This week</p>
          <h2>Assessment Schedule</h2>
          <p className="muted">
            Open times for fitness assessments this week.
          </p>
        </a>
      </div>

      <h2>Services</h2>
      <div className="grid grid-3">
        {services.map((s) => (
          <div className="card" key={s.title}>
            <h3 style={{ marginTop: 0 }}>{s.title}</h3>
            <p className="muted" style={{ fontSize: "0.95rem" }}>
              {s.desc}
            </p>
            <a className="btn btn-secondary" href={s.href}>
              {s.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
