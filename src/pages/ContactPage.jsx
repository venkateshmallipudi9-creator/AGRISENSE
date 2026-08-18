import React, { useState } from 'react';
import AppNav from '../components/AppNav';
import '../styles/Contact.css';

const supportCategories = [
  {
    icon: '🌿',
    title: 'AI Plant Detection',
    text: 'Problems with plant disease scanning, camera or image analysis?'
  },
  {
    icon: '☁️',
    title: 'Weather & Forecast',
    text: 'Need help with location, weather data or forecast information?'
  },
  {
    icon: '🌾',
    title: 'Farm Intelligence',
    text: 'Questions about soil, crops, minerals or agricultural recommendations?'
  },
  {
    icon: '👤',
    title: 'Account & Login',
    text: 'Having trouble with your account, registration or profile?'
  }
];

const faqs = [
  {
    q: 'How does AI plant detection work?',
    a: 'Upload a clear plant or leaf image and the application analyzes it through the configured AI screening workflow. The result provides a likely condition, confidence score and suggested next actions.'
  },
  {
    q: 'Is the AI result a confirmed diagnosis?',
    a: 'No. The result is intended as screening guidance. For important crop decisions, confirm the condition with a qualified agricultural professional.'
  },
  {
    q: 'How does the weather feature work?',
    a: 'The weather section uses the selected location to display current conditions and forecast information. Location accuracy depends on the weather service and available data.'
  },
  {
    q: 'Can I use my phone camera?',
    a: 'Yes. When camera permissions are available, you can capture a plant image directly from the detection page. You can also upload an existing image.'
  },
  {
    q: 'Can I suggest a new feature?',
    a: 'Absolutely. Use the support form and select Feature request. Your feedback can help improve the AGRISENSE AI experience.'
  }
];

export default function ContactPage() {
  const [data, setData] = useState({
    name: '',
    email: '',
    category: '',
    priority: 'Normal',
    message: ''
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const change = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.category.trim() ||
      !data.message.trim()
    ) {
      setError('Please complete all required fields.');
      return;
    }

    if (!data.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSent(true);
  };

  const resetForm = () => {
    setSent(false);
    setData({
      name: '',
      email: '',
      category: '',
      priority: 'Normal',
      message: ''
    });
  };

  return (
    <div className="app-page contact-page">
      <AppNav />

      <main>
        {/* HERO */}
        <section className="support-hero">
          <div className="support-hero-glow glow-one"></div>
          <div className="support-hero-glow glow-two"></div>

          <div className="page-wrap support-hero-inner">
            <div className="support-hero-copy">
              <span className="eyebrow">AGRISENSE AI • SUPPORT CENTER</span>

              <h1>
                How can we
                <span> help you?</span>
              </h1>

              <p>
                Get help with AI plant detection, weather intelligence,
                farm insights, your account and more.
              </p>

              <div className="support-search">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search for help..."
                  aria-label="Search help"
                />
              </div>

              <div className="support-trust">
                <span>✓ AI-powered support</span>
                <span>✓ Farmer-friendly</span>
                <span>✓ Simple guidance</span>
              </div>
            </div>

            <div className="support-hero-visual">
              <div className="plant-orbit orbit-a"></div>
              <div className="plant-orbit orbit-b"></div>

              <div className="support-plant">
                <div className="stem"></div>
                <div className="leaf leaf-a"></div>
                <div className="leaf leaf-b"></div>
                <div className="leaf leaf-c"></div>
                <div className="leaf leaf-d"></div>
              </div>

              <div className="floating-support-card card-a">
                <span>🌱</span>
                <div>
                  <b>Farm smarter</b>
                  <small>AI-assisted insights</small>
                </div>
              </div>

              <div className="floating-support-card card-b">
                <span>✓</span>
                <div>
                  <b>We're here</b>
                  <small>Support center</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT CATEGORIES */}
        <section className="support-section">
          <div className="page-wrap">
            <div className="support-section-heading">
              <div>
                <span className="eyebrow">QUICK HELP</span>
                <h2>What do you need help with?</h2>
              </div>

              <p>
                Choose a topic to find the right support area for your
                AGRISENSE AI experience.
              </p>
            </div>

            <div className="support-category-grid">
              {supportCategories.map((item) => (
                <button
                  className="support-category-card"
                  key={item.title}
                  type="button"
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      category: item.title
                    }))
                  }
                >
                  <span className="category-icon">{item.icon}</span>

                  <span className="category-content">
                    <b>{item.title}</b>
                    <small>{item.text}</small>
                  </span>

                  <span className="category-arrow">↗</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT AREA */}
        <section className="support-section support-contact-section">
          <div className="page-wrap">
            <div className="support-contact-grid">

              {/* LEFT */}
              <aside className="support-info-card">
                <div>
                  <span className="support-badge">🌿 AGRISENSE AI</span>

                  <h2>
                    Let's solve it
                    <span> together.</span>
                  </h2>

                  <p>
                    Tell us what you need help with. Our support interface
                    is designed to make it easy to describe your problem,
                    feedback or idea.
                  </p>
                </div>

                <div className="support-info-items">
                  <div className="support-info-item">
                    <span>✉</span>
                    <div>
                      <small>Email</small>
                      <b>support@agrisense.ai</b>
                    </div>
                  </div>

                  <div className="support-info-item">
                    <span>◷</span>
                    <div>
                      <small>Availability</small>
                      <b>Development support</b>
                    </div>
                  </div>

                  <div className="support-info-item">
                    <span>⚡</span>
                    <div>
                      <small>Response</small>
                      <b>Within 1–2 business days</b>
                    </div>
                  </div>
                </div>

                <div className="support-tip">
                  <span>💡</span>
                  <div>
                    <b>Helpful tip</b>
                    <p>
                      Include screenshots or describe the exact step where
                      you experienced a problem.
                    </p>
                  </div>
                </div>
              </aside>

              {/* FORM */}
              <div className="support-form-card">
                {sent ? (
                  <div className="contact-success">
                    <div className="success-icon">✓</div>

                    <span className="eyebrow">MESSAGE SENT</span>

                    <h2>Thanks for reaching out!</h2>

                    <p>
                      Your support request has been captured successfully.
                      This development version stores the submission locally.
                    </p>

                    <button
                      className="btn btn-primary btn-lg"
                      onClick={resetForm}
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="support-form">

                    <div className="form-heading">
                      <span className="eyebrow">CONTACT SUPPORT</span>
                      <h2>Send us a message</h2>
                      <p>
                        Fill in the details below and describe what you need.
                      </p>
                    </div>

                    {error && (
                      <div className="support-form-error">
                        ⚠ {error}
                      </div>
                    )}

                    <div className="two-fields">
                      <div className="field">
                        <label htmlFor="name">
                          Your name <span>*</span>
                        </label>

                        <input
                          id="name"
                          name="name"
                          value={data.name}
                          onChange={change}
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="field">
                        <label htmlFor="email">
                          Email address <span>*</span>
                        </label>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={change}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="two-fields">
                      <div className="field">
                        <label htmlFor="category">
                          Support topic <span>*</span>
                        </label>

                        <select
                          id="category"
                          name="category"
                          value={data.category}
                          onChange={change}
                        >
                          <option value="">Choose a topic</option>
                          <option value="AI Plant Detection">
                            AI Plant Detection
                          </option>
                          <option value="Weather & Forecast">
                            Weather & Forecast
                          </option>
                          <option value="Farm Intelligence">
                            Farm Intelligence
                          </option>
                          <option value="Account & Login">
                            Account & Login
                          </option>
                          <option value="Feature request">
                            Feature request
                          </option>
                          <option value="Other">
                            Other
                          </option>
                        </select>
                      </div>

                      <div className="field">
                        <label htmlFor="priority">Priority</label>

                        <select
                          id="priority"
                          name="priority"
                          value={data.priority}
                          onChange={change}
                        >
                          <option value="Low">Low</option>
                          <option value="Normal">Normal</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="message">
                        How can we help? <span>*</span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        onChange={change}
                        placeholder="Describe your issue, question or feedback..."
                        rows="7"
                      />
                    </div>

                    <div className="form-bottom">
                      <small>
                        🔒 Your information is only used for support.
                      </small>

                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Send message <span>→</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="support-section faq-section">
          <div className="page-wrap">
            <div className="faq-heading">
              <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
              <h2>Quick answers before you contact us.</h2>
              <p>
                Find answers to common questions about AGRISENSE AI.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={`faq-item ${
                    openFaq === index ? 'faq-open' : ''
                  }`}
                  key={faq.q}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                  >
                    <span>{faq.q}</span>
                    <span className="faq-plus">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>

                  {openFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="page-wrap support-disclaimer">
          <div>
            <span>🌱</span>
            <div>
              <b>Important agricultural guidance</b>
              <p>
                AGRISENSE AI provides AI-assisted information and screening
                guidance. Results should not be treated as a confirmed
                agricultural diagnosis.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}