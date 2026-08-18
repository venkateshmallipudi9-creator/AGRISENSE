import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppNav from '../components/AppNav';
import '../styles/About.css';

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 4C10 4 4 9 4 16c0 2.2 1.8 4 4 4 7 0 12-6 12-16Z" />
    <path d="M4 20c2.4-5 6-8 11-10" />
  </svg>
);

const ScanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 8V5a1 1 0 0 1 1-1h3" />
    <path d="M16 4h3a1 1 0 0 1 1 1v3" />
    <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
    <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
    <path d="M8 8h8v8H8z" />
  </svg>
);

const WeatherIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="8" cy="8" r="3" />
    <path d="M8 2v2M8 12v2M2 8h2M12 8h2" />
    <path d="M7 18h10a3 3 0 0 0 .3-6A5 5 0 0 0 8 11.5" />
  </svg>
);

const SoilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 18c3-2 5-2 8 0s5 2 8 0" />
    <path d="M4 14c3-2 5-2 8 0s5 2 8 0" />
    <path d="M5 10h14" />
    <path d="M7 6h10" />
  </svg>
);

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="app-page about-page">
      <AppNav />

      <main>

        {/* HERO */}
        <section className="about-hero-new">
          <div className="about-hero-glow glow-one"></div>
          <div className="about-hero-glow glow-two"></div>

          <div className="page-wrap about-hero-grid">

            <div className="about-hero-copy">
              <span className="about-label">
                <LeafIcon />
                AGRISENSE AI
              </span>

              <h1>
                Smarter farming.
                <span> Healthier crops.</span>
                <em> Better decisions.</em>
              </h1>

              <p>
                AGRISENSE AI brings plant disease detection, weather
                intelligence, soil insights and crop recommendations
                together in one intelligent agricultural platform.
              </p>

              <div className="about-hero-actions">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/pest-detection')}
                >
                  <ScanIcon />
                  Start AI Detection
                  <span>↗</span>
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigate('/farm-intelligence')}
                >
                  Explore Farm Intelligence
                </button>
              </div>

              <div className="about-trust">
                <span>✓ AI-assisted</span>
                <span>✓ Farmer focused</span>
                <span>✓ Data driven</span>
              </div>
            </div>

            <div className="about-hero-visual">

              <div className="field-shape field-one"></div>
              <div className="field-shape field-two"></div>
              <div className="field-shape field-three"></div>

              <div className="ai-orbit">
                <div className="orbit-dot dot-one"></div>
                <div className="orbit-dot dot-two"></div>
                <div className="orbit-dot dot-three"></div>

                <div className="ai-center">
                  <LeafIcon />
                  <strong>AI</strong>
                  <small>AGRICULTURE</small>
                </div>
              </div>

              <div className="floating-info info-top">
                <span>🌱</span>
                <div>
                  <b>Crop Health</b>
                  <small>AI-powered insights</small>
                </div>
              </div>

              <div className="floating-info info-bottom">
                <span>☁️</span>
                <div>
                  <b>Weather Intelligence</b>
                  <small>7-day forecast</small>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* MISSION */}
        <section className="about-section">
          <div className="page-wrap">

            <div className="about-section-heading">
              <span className="eyebrow">Our mission</span>

              <h2>
                Turning agricultural data into
                <span> practical decisions.</span>
              </h2>

              <p>
                Farmers shouldn't need multiple complicated tools to
                understand what is happening in their fields.
                AGRISENSE AI brings important information together
                into one simple experience.
              </p>
            </div>

            <div className="mission-grid">

              <div className="mission-card mission-main">
                <div className="mission-number">01</div>
                <h3>Observe</h3>
                <p>
                  Detect potential plant health problems using
                  images captured from a camera or uploaded from
                  your device.
                </p>
                <div className="mission-line"></div>
              </div>

              <div className="mission-card">
                <div className="mission-number">02</div>
                <h3>Understand</h3>
                <p>
                  Combine weather, soil and crop information
                  to understand the conditions affecting your farm.
                </p>
              </div>

              <div className="mission-card">
                <div className="mission-number">03</div>
                <h3>Act</h3>
                <p>
                  Get practical recommendations that help you
                  decide what to check and what action to consider next.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* FEATURES */}
        <section className="about-section feature-section">
          <div className="page-wrap">

            <div className="about-section-heading centered">
              <span className="eyebrow">One intelligent platform</span>

              <h2>
                Everything your farm needs
                <span> in one place.</span>
              </h2>

              <p>
                AGRISENSE AI is designed around the most important
                questions farmers ask about their crops and fields.
              </p>
            </div>

            <div className="about-feature-grid">

              <article className="about-feature-card feature-disease">
                <div className="feature-icon">
                  <ScanIcon />
                </div>

                <span className="feature-number">01</span>

                <h3>AI Plant Detection</h3>

                <p>
                  Upload a plant image and receive an AI-assisted
                  screening result with confidence and suggested
                  next actions.
                </p>

                <button
                  onClick={() => navigate('/pest-detection')}
                >
                  Try detection →
                </button>
              </article>


              <article className="about-feature-card feature-weather">
                <div className="feature-icon">
                  <WeatherIcon />
                </div>

                <span className="feature-number">02</span>

                <h3>Weather Intelligence</h3>

                <p>
                  Explore weather conditions and a seven-day
                  forecast for a selected location to support
                  better farm planning.
                </p>

                <button
                  onClick={() => navigate('/weather')}
                >
                  Check weather →
                </button>
              </article>


              <article className="about-feature-card feature-soil">
                <div className="feature-icon">
                  <SoilIcon />
                </div>

                <span className="feature-number">03</span>

                <h3>Soil Intelligence</h3>

                <p>
                  Understand soil characteristics, important
                  nutrients and potential crop suitability for
                  a selected geographical area.
                </p>

                <button
                  onClick={() => navigate('/farm-intelligence')}
                >
                  Explore soil →
                </button>
              </article>

            </div>

          </div>
        </section>


        {/* HOW IT WORKS */}
        <section className="about-process">
          <div className="page-wrap">

            <div className="about-section-heading centered light-heading">
              <span className="eyebrow">How AGRISENSE AI works</span>

              <h2>
                From information
                <span> to action.</span>
              </h2>
            </div>

            <div className="about-process-grid">

              <div className="process-step">
                <span>01</span>
                <div className="process-icon">📍</div>
                <h3>Select</h3>
                <p>
                  Select your farm location or provide the
                  information you want to analyze.
                </p>
              </div>

              <div className="process-connector"></div>

              <div className="process-step">
                <span>02</span>
                <div className="process-icon">🤖</div>
                <h3>Analyze</h3>
                <p>
                  AGRISENSE AI processes the available
                  information and presents useful insights.
                </p>
              </div>

              <div className="process-connector"></div>

              <div className="process-step">
                <span>03</span>
                <div className="process-icon">🌾</div>
                <h3>Decide</h3>
                <p>
                  Use the insights as a starting point for
                  informed agricultural decisions.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* CTA */}
        <section className="about-cta">
          <div className="page-wrap">

            <div className="cta-card">

              <div>
                <span className="eyebrow">Ready to explore?</span>

                <h2>
                  Give your farm
                  <span> an intelligent advantage.</span>
                </h2>

                <p>
                  Explore AGRISENSE AI and discover a simpler
                  way to understand plant health, weather and
                  farm conditions.
                </p>
              </div>

              <div className="cta-actions">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/home')}
                >
                  Open Dashboard →
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigate('/contact')}
                >
                  Contact Support
                </button>
              </div>

            </div>

          </div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="page-wrap">
          <b>AGRISENSE AI 🌿</b>
          <span>Intelligence for healthier agriculture.</span>
          <span>© 2026</span>
        </div>
      </footer>

    </div>
  );
}