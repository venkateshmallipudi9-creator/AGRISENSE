import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';

const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M20 4C10 4 4 9 4 16c0 2.2 1.8 4 4 4 7 0 12-6 12-16Z" />
    <path d="M4 20c2.4-5 6-8 11-10" />
  </svg>
);

export default function AppNav() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t, languages } = useLanguage();
  const navigate = useNavigate();

  const initials = (user?.name || user?.email || 'U')
    .slice(0, 1)
    .toUpperCase();

  return (
    <header className="app-nav">
      <div className="page-wrap nav-inner">

        {/* BRAND */}
        <NavLink to="/home" className="brand">
          <span className="brand-mark">
            <LeafIcon />
          </span>

          <span className="brand-name">
            AGRISENSE <span>AI</span> 🌿
          </span>
        </NavLink>

        {/* NAVIGATION */}
        <nav className="nav-links">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {t.dashboard}
          </NavLink>

          <NavLink
            to="/pest-detection"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {t.detection}
          </NavLink>

          <NavLink
            to="/weather"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {t.weather}
          </NavLink>

          <NavLink
            to="/farm-intelligence"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {t.farm}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {t.about}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {t.support}
          </NavLink>

        </nav>

        {/* USER AREA */}
        <div className="nav-user">

          {/* LANGUAGE */}
          <div className="language-selector">

            <span className="language-icon">
              🌐
            </span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label={t.language}
              title={t.language}
            >

              {Object.entries(languages).map(
                ([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.name}
                  </option>
                )
              )}

            </select>

          </div>

          {/* PROFILE */}
          <button
            className="avatar-sm"
            onClick={() => navigate('/profile')}
            title={t.profile}
          >
            {initials}
          </button>

          {/* SIGN OUT */}
          <button
            className="btn btn-ghost user-name"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            {t.signOut}
          </button>

        </div>

      </div>
    </header>
  );
}