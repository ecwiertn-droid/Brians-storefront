"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    key: "goal_alignment",
    text: "Would improving your nutrition help you get closer to your goals?",
    options: ["Yes, a lot", "Somewhat", "Not sure"],
  },
  {
    key: "grocery_support",
    text: "Would hands-on grocery shopping support (someone walking the aisles with you) help you make healthier choices?",
    options: ["Yes", "Maybe", "No, I'm fine shopping on my own"],
  },
  {
    key: "meal_prep_momentum",
    text: "Would having your first week of meals cooked and prepped for you help build momentum?",
    options: ["Yes, prep it for me", "I'd rather learn to prep it myself", "Not needed right now"],
  },
  {
    key: "biggest_barrier",
    text: "What's the biggest barrier to eating well right now?",
    options: ["Time", "Cost", "Knowing what to cook", "Motivation / consistency"],
  },
  {
    key: "cooking_comfort",
    text: "How comfortable are you cooking for yourself day to day?",
    options: ["Very comfortable", "Somewhat comfortable", "Not comfortable yet"],
  },
  {
    key: "support_style",
    text: "Would you rather work one-on-one with a coach, or follow a self-guided plan?",
    options: ["One-on-one coaching", "Self-guided plan", "A mix of both"],
  },
  {
    key: "weekly_time",
    text: "Realistically, how much time can you commit to meal prep each week?",
    options: ["Under 1 hour", "1-3 hours", "3+ hours"],
  },
];

function recommend(answers) {
  const picks = [];

  if (answers.meal_prep_momentum === "Yes, prep it for me") {
    picks.push({
      title: "Meal Preparation (done for you)",
      href: "/fitness/book?service=meal_prep",
    });
  } else if (answers.meal_prep_momentum === "I'd rather learn to prep it myself") {
    picks.push({
      title: "Meal Preparation (guided plan)",
      href: "/fitness/book?service=meal_prep",
    });
  }

  if (answers.grocery_support === "Yes" || answers.grocery_support === "Maybe") {
    picks.push({
      title: "Guided Grocery Store Visit",
      href: "/fitness/book?service=grocery_visit",
    });
  }

  if (
    answers.biggest_barrier === "Knowing what to cook" ||
    answers.biggest_barrier === "Motivation / consistency" ||
    answers.support_style === "One-on-one coaching"
  ) {
    picks.push({
      title: "Nutrition Focused Consultant",
      href: "/fitness/book?service=nutrition_consult",
    });
  }

  picks.push({
    title: "Fitness Assessment",
    href: "/fitness/schedule",
  });

  // De-dupe by title, cap at 3 suggestions.
  const seen = new Set();
  return picks.filter((p) => {
    if (seen.has(p.title)) return false;
    seen.add(p.title);
    return true;
  }).slice(0, 3);
}

export default function NutritionPathwayPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = QUESTIONS.length;
  const done = step >= totalSteps;

  function answer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  async function submitContact(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: contact.name,
          client_email: contact.email,
          answers,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSubmitted(true);
    } catch (err) {
      setError("Couldn't save your answers, but here are your results anyway.");
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const results = done ? recommend(answers) : [];

  return (
    <div className="section wrap">
      <p className="eyebrow">Fitness</p>
      <h1>Nutrition Pathway</h1>
      <p className="muted" style={{ maxWidth: 560 }}>
        A few quick questions to figure out which kind of support fits you
        best right now.
      </p>

      <div className="chat" style={{ marginTop: 24 }}>
        {QUESTIONS.slice(0, step).map((q) => (
          <div key={q.key}>
            <div className="chat-bubble asked">{q.text}</div>
            <div className="chat-bubble" style={{ marginTop: -8, marginBottom: 18 }}>
              {answers[q.key]}
            </div>
          </div>
        ))}

        {!done && (
          <div className="chat-bubble asked">
            {QUESTIONS[step].text}
            <div className="chat-options">
              {QUESTIONS[step].options.map((opt) => (
                <button key={opt} onClick={() => answer(QUESTIONS[step].key, opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {done && !submitted && (
          <div className="card">
            <h2>Almost done</h2>
            <p className="muted">
              Leave your name and email so we can save your answers and
              follow up.
            </p>
            <form onSubmit={submitContact}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                />
              </div>
              {error && <p style={{ color: "#8a2f2f" }}>{error}</p>}
              <button className="btn btn-block" type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "See my recommendations"}
              </button>
            </form>
          </div>
        )}

        {done && submitted && (
          <div className="card">
            <h2>Here's where to start</h2>
            <p className="muted">Based on your answers:</p>
            <div className="grid" style={{ gap: 10 }}>
              {results.map((r) => (
                <a key={r.title} className="btn" href={r.href}>
                  {r.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
