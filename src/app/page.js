export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#ffd9ae" }}>
            Fresh smoothies. Real coaching.
          </p>
          <h1>One stop for your smoothie fix and your fitness goals.</h1>
          <p>
            Check this week&apos;s hours and menu, meet the training team,
            book a fitness assessment, and start a short nutrition pathway
            built around what actually fits your life.
          </p>
          <div className="hero-links">
            <a className="btn" href="/smoothie">
              See smoothie menu &amp; hours
            </a>
            <a
              className="btn"
              style={{ background: "white", color: "#204b28" }}
              href="/fitness"
            >
              Explore fitness &amp; nutrition
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid grid-2">
          <div className="card">
            <p className="eyebrow">Smoothie Bar</p>
            <h2>This week&apos;s hours &amp; menu</h2>
            <p className="muted">
              Hours and menu items are updated weekly by staff, so what you
              see is always current.
            </p>
            <a className="btn btn-secondary" href="/smoothie">
              View menu &amp; hours
            </a>
          </div>
          <div className="card">
            <p className="eyebrow">Fitness</p>
            <h2>Trainers, assessments &amp; nutrition</h2>
            <p className="muted">
              Meet the trainers, grab an open assessment slot, and try the
              nutrition pathway questionnaire to see what support fits you.
            </p>
            <a className="btn btn-secondary" href="/fitness">
              Explore fitness section
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
