import PhotoOrPlaceholder from "./PhotoOrPlaceholder";
import ScrollReveal from "./ScrollReveal";
import {
  DumbbellIcon,
  SmoothieIcon,
  PulseIcon,
  CameraIcon,
  LeafIcon,
  CalendarIcon,
  SparkleIcon,
  ArrowRightIcon,
} from "./icons";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-blobs" aria-hidden="true">
          <div className="hero-blob b1" />
          <div className="hero-blob b2" />
          <div className="hero-blob b3" />
        </div>

        <div className="hero-icons" aria-hidden="true">
          <DumbbellIcon className="hero-icon" style={{ top: "14%", left: "6%", width: 54, height: 54, animationDelay: "0s" }} />
          <SmoothieIcon className="hero-icon" style={{ top: "60%", left: "14%", width: 40, height: 40, animationDelay: "1.5s" }} />
          <PulseIcon className="hero-icon" style={{ top: "22%", right: "10%", width: 70, height: 70, animationDelay: "0.8s" }} />
          <DumbbellIcon className="hero-icon" style={{ bottom: "10%", right: "20%", width: 36, height: 36, animationDelay: "2.4s" }} />
        </div>

        <div className="wrap">
          <span className="eyebrow-pill animate-fade-up">
            <SparkleIcon style={{ width: 14, height: 14 }} />
            Fresh smoothies. Real coaching.
          </span>
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
              style={{ background: "white", color: "#204b28", boxShadow: "none" }}
              href="/fitness"
            >
              Explore fitness &amp; nutrition
            </a>
          </div>

          <div className="benefit-row animate-fade-up delay-4">
            <span className="benefit-pill"><LeafIcon /> Fresh, weekly menu</span>
            <span className="benefit-pill"><DumbbellIcon /> Certified trainers</span>
            <span className="benefit-pill"><CalendarIcon /> Free assessments</span>
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
        <ScrollReveal>
          <p className="eyebrow">How it works</p>
          <h2 style={{ fontSize: "1.9rem", marginBottom: 26 }}>
            Three steps to feeling good in your routine
          </h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3 style={{ margin: "0 0 6px" }}>Browse</h3>
              <p className="muted">
                See this week&apos;s smoothie hours and menu, plus trainer
                bios and open assessment times.
              </p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3 style={{ margin: "0 0 6px" }}>Book or answer a few questions</h3>
              <p className="muted">
                Grab a free assessment slot, or take the nutrition pathway
                questionnaire to see what fits your goals.
              </p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3 style={{ margin: "0 0 6px" }}>Get moving</h3>
              <p className="muted">
                Start with a coach, a plan, or just a great smoothie — your
                call on how far you want to take it.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="section wrap">
        <div className="grid grid-3">
          <ScrollReveal>
            <a className="feature-card" href="/smoothie">
              <span className="feature-icon"><SmoothieIcon /></span>
              <p className="eyebrow">Smoothie Bar</p>
              <h2 style={{ fontSize: "1.3rem" }}>This week&apos;s hours &amp; menu</h2>
              <p className="muted">
                Hours and menu items are updated weekly, so what you see is
                always current.
              </p>
              <span className="btn btn-secondary" style={{ marginTop: 10 }}>
                View menu &amp; hours <ArrowRightIcon style={{ width: 16, height: 16 }} />
              </span>
            </a>
          </ScrollReveal>
          <ScrollReveal>
            <a className="feature-card" href="/fitness">
              <span className="feature-icon"><DumbbellIcon /></span>
              <p className="eyebrow">Fitness</p>
              <h2 style={{ fontSize: "1.3rem" }}>Trainers &amp; assessments</h2>
              <p className="muted">
                Meet the trainers and grab an open assessment slot this
                week — no cost to get started.
              </p>
              <span className="btn btn-secondary" style={{ marginTop: 10 }}>
                Explore fitness <ArrowRightIcon style={{ width: 16, height: 16 }} />
              </span>
            </a>
          </ScrollReveal>
          <ScrollReveal>
            <a className="feature-card" href="/fitness/nutrition">
              <span className="feature-icon"><LeafIcon /></span>
              <p className="eyebrow">Nutrition</p>
              <h2 style={{ fontSize: "1.3rem" }}>Find your pathway</h2>
              <p className="muted">
                A few quick questions point you toward coaching, grocery
                support, or meal prep — whatever fits.
              </p>
              <span className="btn btn-secondary" style={{ marginTop: 10 }}>
                Take the questionnaire <ArrowRightIcon style={{ width: 16, height: 16 }} />
              </span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <section className="section wrap">
        <ScrollReveal>
          <div className="cta-banner">
            <h2>Ready to get started?</h2>
            <p>
              Book a free fitness assessment this week, or swing by for a
              smoothie — either way, we&apos;d love to have you in.
            </p>
            <div className="hero-links">
              <a
                className="btn"
                style={{ background: "white", color: "#b23a68", boxShadow: "none" }}
                href="/fitness/schedule"
              >
                Book a free assessment
              </a>
              <a
                className="btn"
                style={{ background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.5)" }}
                href="/smoothie"
              >
                See the smoothie menu
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
