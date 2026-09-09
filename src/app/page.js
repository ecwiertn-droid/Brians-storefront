import PhotoOrPlaceholder from "./PhotoOrPlaceholder";
import ScrollReveal from "./ScrollReveal";
import { DumbbellIcon, SmoothieIcon, PulseIcon, CameraIcon } from "./icons";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-icons" aria-hidden="true">
          <DumbbellIcon className="hero-icon" style={{ top: "14%", left: "6%", width: 54, height: 54, animationDelay: "0s" }} />
          <SmoothieIcon className="hero-icon" style={{ top: "60%", left: "14%", width: 40, height: 40, animationDelay: "1.5s" }} />
          <PulseIcon className="hero-icon" style={{ top: "22%", right: "10%", width: 70, height: 70, animationDelay: "0.8s" }} />
          <DumbbellIcon className="hero-icon" style={{ bottom: "10%", right: "20%", width: 36, height: 36, animationDelay: "2.4s" }} />
        </div>

        <div className="wrap">
          <p className="eyebrow animate-fade-up" style={{ color: "#ffd9ae" }}>
            Fresh smoothies. Real coaching.
          </p>
          <h1 className="animate-fade-up delay-1">
            One stop for your smoothie fix and your fitness goals.
          </h1>
          <p className="animate-fade-up delay-2">
            Check this week&apos;s hours and menu, meet the training team,
            book a fitness assessment, and start a short nutrition pathway
            built around what actually fits your life.
          </p>
          <div className="hero-links animate-fade-up delay-3">
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

      <section className="section wrap">
        <div className="photo-strip">
          <PhotoOrPlaceholder
            src="hero-training.jpg"
            alt="Training session at Brian's"
            icon={<DumbbellIcon />}
            label="Add a training photo"
          />
          <PhotoOrPlaceholder
            src="hero-smoothie.jpg"
            alt="Fresh smoothie at Brian's"
            icon={<SmoothieIcon />}
            label="Add a smoothie photo"
          />
          <PhotoOrPlaceholder
            src="hero-coaching.jpg"
            alt="Coaching session at Brian's"
            icon={<CameraIcon />}
            label="Add a coaching photo"
          />
        </div>
      </section>

      <section className="section wrap">
        <div className="grid grid-2">
          <ScrollReveal>
            <a className="card" href="/smoothie" style={{ textDecoration: "none", display: "block" }}>
              <p className="eyebrow">Smoothie Bar</p>
              <h2>This week&apos;s hours &amp; menu</h2>
              <p className="muted">
                Hours and menu items are updated weekly by staff, so what you
                see is always current.
              </p>
              <span className="btn btn-secondary">View menu &amp; hours</span>
            </a>
          </ScrollReveal>
          <ScrollReveal>
            <a className="card" href="/fitness" style={{ textDecoration: "none", display: "block" }}>
              <p className="eyebrow">Fitness</p>
              <h2>Trainers, assessments &amp; nutrition</h2>
              <p className="muted">
                Meet the trainers, grab an open assessment slot, and try the
                nutrition pathway questionnaire to see what support fits you.
              </p>
              <span className="btn btn-secondary">Explore fitness section</span>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
