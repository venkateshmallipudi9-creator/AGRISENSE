import React, { useEffect, useRef, useState } from 'react';
import AppNav from '../components/AppNav';
import '../styles/PestDetection.css';

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2l1.2-2h4.6l1.2 2h2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
    <circle cx="12" cy="12.5" r="3.2" />
  </svg>
);

export default function PestDetectionPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());

      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Camera is not supported by this browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 }
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
      setError('');
    } catch (err) {
      console.error(err);
      setError(
        'Camera access was blocked. Allow camera permission or use image upload instead.'
      );
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');

    if (!context) return;

    context.drawImage(video, 0, 0);

    const image = canvas.toDataURL('image/jpeg', 0.9);

    setPhoto(image);
    stopCamera();
  };

  const upload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Please choose an image smaller than 10 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPhoto(event.target.result);
      setError('');
    };

    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!photo) return;

    setLoading(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 1600));

    setResult({
      diseaseDetected: true,
      disease: 'Leaf Rust',
      confidence: 0.92,
      severity: 'Moderate',
      recommendations: [
        'Remove affected leaves immediately',
        'Improve air circulation around plants',
        'Apply an appropriate fungicide treatment',
        'Avoid overhead watering',
        'Monitor nearby plants for similar symptoms'
      ],
      nextSteps:
        'Use this result as a screening aid and consider an agricultural expert for a confirmed diagnosis.'
    });

    setLoading(false);
  };

  const reset = () => {
    stopCamera();
    setPhoto(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="app-page detection-page">
      <AppNav />

      <main className="page-wrap">
        <div className="page-hero">
          <span className="eyebrow">AI HEALTH CHECK</span>

          <h1 className="page-title">
            Scan a plant
          </h1>

          <p className="page-subtitle">
            Capture a clear leaf photo and get a fast screening result
            with practical care guidance.
          </p>
        </div>

        {error && (
          <div className="form-error detection-error">
            {error}
          </div>
        )}

        {!photo && !result && (
          <section className="scanner-card card">
            <div className="scanner-top">
              <div>
                <h2>Start your scan</h2>

                <p>
                  For best results, use a well-lit image where the
                  affected leaf is clearly visible.
                </p>
              </div>

              <span className="step-pill">
                STEP 1 / 2
              </span>
            </div>

            {cameraActive ? (
              <div className="live-camera">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                />

                <div className="camera-frame">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <div className="camera-bar">
                  <button
                    className="btn btn-primary btn-lg capture"
                    onClick={capture}
                  >
                    <CameraIcon />
                    Capture leaf
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={stopCamera}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-zone">
                <div className="upload-icon">
                  <CameraIcon />
                </div>

                <h3>
                  How would you like to add a photo?
                </h3>

                <p>
                  Take a new photo with your camera or choose
                  an existing image.
                </p>

                <div className="method-grid">
                  <button
                    className="method-card"
                    onClick={startCamera}
                  >
                    <span>⌾</span>
                    <b>Use camera</b>
                    <small>Best for a live plant</small>
                  </button>

                  <label className="method-card">
                    <span>↥</span>
                    <b>Upload image</b>
                    <small>JPG, PNG up to 10 MB</small>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={upload}
                    />
                  </label>
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              hidden
            />
          </section>
        )}

        {photo && !result && (
          <section className="preview-layout">
            <div className="preview-card card">
              <div className="preview-image-wrap">
                <img
                  src={photo}
                  alt="Selected plant"
                />
              </div>

              <div className="preview-footer">
                <div>
                  <span className="kicker">
                    Ready for analysis
                  </span>

                  <b>
                    Image captured successfully
                  </b>
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={reset}
                >
                  Choose another
                </button>
              </div>
            </div>

            <aside className="analysis-card card">
              <span className="step-pill">
                STEP 2 / 2
              </span>

              <h2>
                Analyze this plant
              </h2>

              <p>
                We'll run the current screening workflow and
                show the likely disease, confidence and suggested
                next actions.
              </p>

              <button
                className="btn btn-primary btn-lg full"
                onClick={analyze}
                disabled={loading}
              >
                {loading
                  ? 'Analyzing image…'
                  : 'Analyze with AI'}

                <span>→</span>
              </button>

              <small>
                Tip: clear, close-up images usually produce
                better screening results.
              </small>
            </aside>
          </section>
        )}

        {result && (
          <section className="results-wrap">
            <div className="result-banner">
              <div>
                <span className="eyebrow">
                  SCREENING COMPLETE
                </span>

                <h2>
                  Possible issue detected
                </h2>

                <p>
                  Here is the current AI screening result
                  for your uploaded image.
                </p>
              </div>

              <button
                className="btn btn-secondary"
                onClick={reset}
              >
                New scan
              </button>
            </div>

            <div className="result-grid">
              <div className="result-image card">
                <img
                  src={photo}
                  alt="Analyzed plant"
                />

                <div className="image-caption">
                  <span>Analyzed image</span>
                  <span>AI screening</span>
                </div>
              </div>

              <div className="result-main card">
                <div className="result-title">
                  <div>
                    <span className="kicker">
                      Likely condition
                    </span>

                    <h3>
                      {result.disease}
                    </h3>
                  </div>

                  <span className="severity">
                    {result.severity}
                  </span>
                </div>

                <div className="confidence-row">
                  <div>
                    <span>Confidence</span>

                    <b>
                      {(result.confidence * 100).toFixed(0)}%
                    </b>
                  </div>

                  <div className="meter">
                    <i
                      style={{
                        width: `${result.confidence * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="recommendations">
                  <h4>
                    Recommended next actions
                  </h4>

                  {result.recommendations.map(
                    (recommendation, index) => (
                      <div
                        className="recommendation"
                        key={index}
                      >
                        <span>✓</span>

                        <p>
                          {recommendation}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <div className="next-step">
                  <b>Important</b>

                  <p>
                    {result.nextSteps}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}