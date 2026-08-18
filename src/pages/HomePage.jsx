import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import AppNav from '../components/AppNav';
import '../styles/Home.css';
import heroImage from '../assets/hero.png';

const Arrow = () => <span aria-hidden="true">↗</span>;

const ScanIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <path d="M8 8h8v8H8z" />
  </svg>
);

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const name = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="app-page home-page">

      <AppNav />

      <main>

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="page-wrap dashboard-grid">

            <div className="hero-copy">

              <span className="eyebrow">
                {t.welcome}
              </span>

              <h1>
                {t.smartFarmingTitle}
              </h1>

              <p>
                {t.welcomeFarmer}, {name}. {t.homeDescription}
              </p>

              <div className="hero-actions">

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/pest-detection')}
                >
                  <ScanIcon />
                  {t.scanPlant}
                  <Arrow />
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigate('/weather')}
                >
                  {t.viewWeather}
                </button>

              </div>

              <div className="trust-row">
                <span>✓ {t.fastAnalysis}</span>
                <span>✓ {t.simpleRecommendations}</span>
                <span>✓ {t.builtForFarmers}</span>
              </div>

            </div>

            {/* HERO IMAGE */}
            <div className="hero-art">

              <div className="orb orb-one"></div>
              <div className="orb orb-two"></div>

              <div className="plant-visual">
                <img
                  src={heroImage}
                  alt="Agriculture"
                />
              </div>

              <div className="floating-card confidence">
                <span className="pulse"></span>

                <div>
                  <b>{t.aiReady}</b>
                  <small>{t.cameraUpload}</small>
                </div>
              </div>

              <div className="floating-card scan-tip">
                <span>✦</span>

                <div>
                  <b>{t.smartGuidance}</b>
                  <small>{t.actionableCare}</small>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* WORKSPACE */}
        <section className="section">

          <div className="page-wrap">

            <div className="section-heading">

              <div>

                <span className="eyebrow">
                  {t.workspace}
                </span>

                <h2 className="section-title">
                  {t.everythingYouNeed}
                </h2>

              </div>

              <p className="section-copy">
                {t.dashboardDescription}
              </p>

            </div>


            <div className="quick-grid">

              {/* PLANT SCAN */}
              <button
                className="quick-card featured"
                onClick={() => navigate('/pest-detection')}
              >

                <span className="quick-icon">
                  <ScanIcon />
                </span>

                <span>
                  <b>{t.newPlantScan}</b>
                  <small>{t.cameraOrUpload}</small>
                </span>

                <Arrow />

              </button>


              {/* WEATHER */}
              <button
                className="quick-card"
                onClick={() => navigate('/weather')}
              >

                <span className="quick-icon">
                  🌦️
                </span>

                <span>
                  <b>{t.weather}</b>
                  <small>{t.checkWeatherDescription}</small>
                </span>

                <Arrow />

              </button>


              {/* FARM INTELLIGENCE */}
              <button
                className="quick-card"
                onClick={() => navigate('/farm-intelligence')}
              >

                <span className="quick-icon">
                  🌾
                </span>

                <span>
                  <b>{t.farmIntelligence}</b>
                  <small>{t.soilCropDescription}</small>
                </span>

                <Arrow />

              </button>


              {/* PROFILE */}
              <button
                className="quick-card"
                onClick={() => navigate('/profile')}
              >

                <span className="quick-icon">
                  ◎
                </span>

                <span>
                  <b>{t.profile}</b>
                  <small>{t.accountPreferences}</small>
                </span>

                <Arrow />

              </button>

            </div>

          </div>

        </section>


        {/* THREE STEPS */}
        <section className="section process-section">

          <div className="page-wrap">

            <div className="section-heading centered">

              <div>

                <span className="eyebrow">
                  {t.threeSimpleSteps}
                </span>

                <h2 className="section-title">
                  {t.fromLeafToInsight}
                </h2>

              </div>

            </div>


            <div className="process-grid">

              <div className="process-card">
                <span>01</span>
                <h3>{t.capture}</h3>
                <p>{t.captureDescription}</p>
              </div>

              <div className="process-card">
                <span>02</span>
                <h3>{t.analyze}</h3>
                <p>{t.analyzeDescription}</p>
              </div>

              <div className="process-card">
                <span>03</span>
                <h3>{t.act}</h3>
                <p>{t.actDescription}</p>
              </div>

            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="site-footer">

        <div className="page-wrap">

          <b>AGRISENSE AI 🌿</b>

          <span>
            {t.plantHealthMadeClearer}
          </span>

          <span>
            © 2026
          </span>

        </div>

      </footer>

    </div>
  );
}
