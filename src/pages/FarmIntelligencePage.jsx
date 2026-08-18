import React, { useEffect, useState } from 'react';
import AppNav from '../components/AppNav';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/FarmIntelligence.css';

const DEFAULT_LOCATION = {
  name: 'Bengaluru',
  country: 'India',
  latitude: 12.9716,
  longitude: 77.5946
};

const markerIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(event) {
      onLocationSelect(event.latlng.lat, event.latlng.lng);
    }
  });

  return null;
}

function getWeatherDescription(code) {
  const weather = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Heavy showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with hail'
  };

  return weather[code] || 'Variable conditions';
}

function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if ([3, 45, 48].includes(code)) return '☁️';
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌤️';
}

function getSoilGuidance(latitude, longitude) {
  /*
    Soil data is deliberately presented as guidance here.

    Do NOT present these values as laboratory measurements.
    A future production version should connect this section
    to a verified soil/geospatial data source.
  */

  const tropical =
    latitude >= -23.5 && latitude <= 23.5;

  if (tropical) {
    return {
      type: 'Tropical / region-dependent soil',
      confidence: 'Regional estimate',
      ph: 'Varies by location',
      organicMatter: 'Varies by location',
      nutrients: [
        'Nitrogen — requires local measurement',
        'Phosphorus — requires local measurement',
        'Potassium — requires local measurement'
      ],
      crops: [
        'Rice',
        'Maize',
        'Vegetables',
        'Pulses',
        'Banana'
      ]
    };
  }

  return {
    type: 'Region-dependent soil',
    confidence: 'Regional estimate',
    ph: 'Varies by location',
    organicMatter: 'Varies by location',
    nutrients: [
      'Nitrogen — requires local measurement',
      'Phosphorus — requires local measurement',
      'Potassium — requires local measurement'
    ],
    crops: [
      'Wheat',
      'Maize',
      'Pulses',
      'Vegetables',
      'Oilseeds'
    ]
  };
}

export default function FarmIntelligencePage() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState('');

  const soil = getSoilGuidance(
    location.latitude,
    location.longitude
  );

  const fetchWeather = async (lat, lon) => {
    try {
      setLoadingWeather(true);
      setError('');

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset` +
        `&hourly=relative_humidity_2m,soil_moisture_0_to_1cm` +
        `&forecast_days=7` +
        `&timezone=auto`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Weather service unavailable.');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(
        'Unable to load weather data. Please try again.'
      );
    } finally {
      setLoadingWeather(false);
    }
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      setLocationLoading(true);

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error('Location lookup failed.');
      }

      const data = await response.json();
      const result = data.results?.[0];

      setLocation({
        name:
          result?.name ||
          `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
        country: result?.country || '',
        latitude: lat,
        longitude: lon
      });
    } catch {
      setLocation({
        name: `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
        country: '',
        latitude: lat,
        longitude: lon
      });
    } finally {
      setLocationLoading(false);
    }
  };

  const searchLocation = async (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    try {
      setLocationLoading(true);
      setError('');

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          search
        )}&count=1&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error('Location search failed.');
      }

      const data = await response.json();
      const result = data.results?.[0];

      if (!result) {
        setError('Location not found. Try another city or place.');
        return;
      }

      setLocation({
        name: result.name,
        country: result.country || '',
        latitude: result.latitude,
        longitude: result.longitude
      });

      setSearch('');
    } catch (err) {
      console.error(err);
      setError('Unable to search this location.');
    } finally {
      setLocationLoading(false);
    }
  };

  const selectMapLocation = async (lat, lon) => {
    await reverseGeocode(lat, lon);
  };

  useEffect(() => {
    fetchWeather(
      location.latitude,
      location.longitude
    );
  }, [location.latitude, location.longitude]);

  return (
    <div className="app-page farm-page">
      <AppNav />

      <main>
        <section className="farm-hero">
          <div className="page-wrap">
            <span className="eyebrow">
              AGRISENSE AI • FARM INTELLIGENCE
            </span>

            <h1>
              Understand your farm before
              <em> planting.</em>
            </h1>

            <p>
              Explore a location, check its weather,
              understand soil conditions and discover
              crops that may suit the region.
            </p>

            <form
              className="location-search"
              onSubmit={searchLocation}
            >
              <span>📍</span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city, village or location..."
              />

              <button
                className="btn btn-primary"
                type="submit"
                disabled={locationLoading}
              >
                {locationLoading
                  ? 'Searching...'
                  : 'Explore location'}
              </button>
            </form>
          </div>
        </section>

        <section className="page-wrap farm-content">

          {error && (
            <div className="farm-error">
              {error}
            </div>
          )}

          <div className="location-heading">
            <div>
              <span className="eyebrow">
                SELECTED LOCATION
              </span>

              <h2>
                {location.name}
                {location.country
                  ? `, ${location.country}`
                  : ''}
              </h2>

              <p>
                {location.latitude.toFixed(4)}°
                {' • '}
                {location.longitude.toFixed(4)}°
              </p>
            </div>

            <div className="location-badge">
              🌱 AGRI ANALYSIS
            </div>
          </div>

          <div className="map-card">
            <MapContainer
              center={[
                location.latitude,
                location.longitude
              ]}
              zoom={6}
              scrollWheelZoom={true}
              className="farm-map"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={[
                  location.latitude,
                  location.longitude
                ]}
                icon={markerIcon}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  AGRISENSE AI analysis location
                </Popup>
              </Marker>

              <MapClickHandler
                onLocationSelect={selectMapLocation}
              />
            </MapContainer>

            <div className="map-hint">
              🖱️ Click anywhere on the map to analyse
              another location.
            </div>
          </div>

          <section className="intelligence-grid">

            <article className="intelligence-card weather-card">
              <div className="card-heading">
                <div>
                  <span className="eyebrow">
                    WEATHER
                  </span>
                  <h3>7-day forecast</h3>
                </div>

                <span className="card-icon">
                  ☀️
                </span>
              </div>

              {loadingWeather && (
                <div className="loading-state">
                  Loading live forecast...
                </div>
              )}

              {!loadingWeather && weather && (
                <div className="forecast-grid">
                  {weather.daily.time.map(
                    (date, index) => (
                      <div
                        className="forecast-day"
                        key={date}
                      >
                        <span className="forecast-date">
                          {new Date(
                            `${date}T12:00:00`
                          ).toLocaleDateString(
                            undefined,
                            {
                              weekday: 'short'
                            }
                          )}
                        </span>

                        <strong className="weather-icon">
                          {getWeatherEmoji(
                            weather.daily
                              .weather_code[index]
                          )}
                        </strong>

                        <span className="weather-condition">
                          {getWeatherDescription(
                            weather.daily
                              .weather_code[index]
                          )}
                        </span>

                        <div className="temperature">
                          <b>
                            {Math.round(
                              weather.daily
                                .temperature_2m_max[index]
                            )}°
                          </b>

                          <span>
                            {Math.round(
                              weather.daily
                                .temperature_2m_min[index]
                            )}°
                          </span>
                        </div>

                        <small>
                          💧{' '}
                          {weather.daily
                            .precipitation_probability_max[
                            index
                          ] ?? 0}
                          % rain
                        </small>
                      </div>
                    )
                  )}
                </div>
              )}

              {weather && (
                <div className="weather-footer">
                  <span>
                    🌧️ Rainfall data included
                  </span>
                  <span>
                    💨 Wind data included
                  </span>
                  <span>
                    🕒 Local timezone
                  </span>
                </div>
              )}
            </article>

            <article className="intelligence-card soil-card">
              <div className="card-heading">
                <div>
                  <span className="eyebrow">
                    SOIL INTELLIGENCE
                  </span>

                  <h3>
                    Soil profile
                  </h3>
                </div>

                <span className="card-icon">
                  🌱
                </span>
              </div>

              <div className="soil-type">
                <span>Estimated regional profile</span>
                <strong>{soil.type}</strong>
                <small>
                  {soil.confidence}
                </small>
              </div>

              <div className="soil-stats">
                <div>
                  <span>pH</span>
                  <b>{soil.ph}</b>
                </div>

                <div>
                  <span>Organic matter</span>
                  <b>
                    {soil.organicMatter}
                  </b>
                </div>
              </div>

              <div className="nutrient-section">
                <h4>
                  Key nutrients
                </h4>

                {soil.nutrients.map(
                  (nutrient) => (
                    <div
                      className="nutrient-row"
                      key={nutrient}
                    >
                      <span>🧪</span>
                      <p>{nutrient}</p>
                    </div>
                  )
                )}
              </div>

              <div className="soil-notice">
                <b>Important</b>
                <p>
                  Soil information shown here is
                  regional guidance, not a laboratory
                  soil test. For precise nutrient and pH
                  values, use a verified soil analysis.
                </p>
              </div>
            </article>

          </section>

          <section className="crop-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  CROP INTELLIGENCE
                </span>

                <h2>
                  Crops to consider
                </h2>
              </div>

              <p>
                These are preliminary suggestions based
                on broad regional conditions. Final crop
                selection should consider actual soil
                test results, irrigation, season and
                local agronomic advice.
              </p>
            </div>

            <div className="crop-grid">
              {soil.crops.map(
                (crop, index) => (
                  <div
                    className="crop-card"
                    key={crop}
                  >
                    <div className="crop-number">
                      0{index + 1}
                    </div>

                    <div className="crop-icon">
                      🌾
                    </div>

                    <h3>{crop}</h3>

                    <span>
                      Potentially suitable
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

        </section>
      </main>
    </div>
  );
}