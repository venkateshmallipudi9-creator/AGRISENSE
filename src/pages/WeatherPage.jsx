import React, { useEffect, useMemo, useState } from 'react';
import AppNav from '../components/AppNav';
import '../styles/Weather.css';

const WEATHER = {
  0: ['Clear sky', '☀️'], 1: ['Mainly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Overcast', '☁️'],
  45: ['Fog', '🌫️'], 48: ['Rime fog', '🌫️'], 51: ['Light drizzle', '🌦️'], 53: ['Drizzle', '🌦️'], 55: ['Heavy drizzle', '🌧️'],
  56: ['Freezing drizzle', '🌧️'], 57: ['Heavy freezing drizzle', '🌧️'], 61: ['Light rain', '🌦️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'],
  66: ['Freezing rain', '🌧️'], 67: ['Heavy freezing rain', '🌧️'], 71: ['Light snow', '🌨️'], 73: ['Snow', '🌨️'], 75: ['Heavy snow', '❄️'],
  77: ['Snow grains', '❄️'], 80: ['Light showers', '🌦️'], 81: ['Showers', '🌧️'], 82: ['Heavy showers', '⛈️'],
  85: ['Snow showers', '🌨️'], 86: ['Heavy snow showers', '❄️'], 95: ['Thunderstorm', '⛈️'], 96: ['Thunderstorm + hail', '⛈️'], 99: ['Thunderstorm + heavy hail', '⛈️']
};

const label = code => WEATHER[code]?.[0] || 'Variable conditions';
const icon = code => WEATHER[code]?.[1] || '🌤️';
const fmtDay = date => new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`));
const fmtTime = date => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(date));

async function geocode(place) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Could not search for that place.');
  const data = await res.json();
  if (!data.results?.length) throw new Error('Place not found. Try a city, district, or country name.');
  return data.results[0];
}

async function weather(lat, lon, timezone = 'auto') {
  const params = new URLSearchParams({
    latitude: lat, longitude: lon, timezone,
    forecast_days: '7',
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset'
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error('Weather service is temporarily unavailable.');
  return res.json();
}

export default function WeatherPage() {
  const [query, setQuery] = useState('Bengaluru');
  const [place, setPlace] = useState({ name: 'Bengaluru', country: 'India', latitude: 12.9716, longitude: 77.5946 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const load = async nextPlace => {
    setLoading(true); setError('');
    try { setData(await weather(nextPlace.latitude, nextPlace.longitude, nextPlace.timezone || 'auto')); }
    catch (e) { setError(e.message || 'Unable to load weather.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(place); }, []);

  const search = async e => {
    e.preventDefault(); if (!query.trim()) return;
    setSearching(true); setError('');
    try { const found = await geocode(query.trim()); setPlace(found); await load(found); }
    catch (e) { setError(e.message || 'Search failed.'); }
    finally { setSearching(false); }
  };

  const useLocation = () => {
    if (!navigator.geolocation) { setError('Your browser does not support location.'); return; }
    setError(''); setLoading(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const reverse = await geocode(`${coords.latitude},${coords.longitude}`).catch(() => null);
        const next = reverse || { name: 'My location', country: '', latitude: coords.latitude, longitude: coords.longitude, timezone: 'auto' };
        setPlace(next); setQuery(next.name || 'My location'); await load(next);
      } catch (e) { setError(e.message || 'Unable to use your location.'); setLoading(false); }
    }, () => { setError('Location permission was denied. Search for a place instead.'); setLoading(false); }, { enableHighAccuracy: true, timeout: 10000 });
  };

  const mapUrl = useMemo(() => {
    const lat = Number(place.latitude).toFixed(5), lon = Number(place.longitude).toFixed(5);
    const delta = 0.12;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${Number(place.longitude)-delta}%2C${Number(place.latitude)-delta}%2C${Number(place.longitude)+delta}%2C${Number(place.latitude)+delta}&layer=mapnik&marker=${lat}%2C${lon}`;
  }, [place]);

  const days = data?.daily?.time || [];

  return <div className="app-page weather-page"><AppNav/><main className="page-wrap weather-wrap">
    <section className="weather-hero">
      <div><span className="eyebrow">AGRISENSE AI • Weather intelligence</span><h1>Weather for better farm decisions.</h1><p>Search any place or use your location to view current conditions and a reliable 7-day forecast.</p></div>
      <div className="weather-search-card">
        <form onSubmit={search} className="weather-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search city, district or country" aria-label="Search place"/><button className="btn btn-primary" disabled={searching}>{searching ? 'Searching…' : 'Search'}</button></form>
        <button className="location-btn" onClick={useLocation}>⌖ Use my current location</button>
      </div>
    </section>

    {error && <div className="weather-error">{error}</div>}

    {loading ? <div className="weather-loading card"><div className="loader-dot"></div><b>Loading live weather…</b><span>Getting the forecast for {place.name}.</span></div> : data && <>
      <section className="weather-current card">
        <div className="current-main"><span className="weather-big-icon">{icon(data.current.weather_code)}</span><div><span className="eyebrow">Current conditions</span><h2>{Math.round(data.current.temperature_2m)}°{data.current_units?.temperature_2m || 'C'}</h2><b>{label(data.current.weather_code)}</b><p>{place.name}{place.country ? `, ${place.country}` : ''}</p></div></div>
        <div className="current-stats"><div><span>Feels like</span><b>{Math.round(data.current.apparent_temperature)}°C</b></div><div><span>Humidity</span><b>{data.current.relative_humidity_2m}%</b></div><div><span>Wind</span><b>{Math.round(data.current.wind_speed_10m)} km/h</b></div><div><span>Rain now</span><b>{data.current.precipitation} mm</b></div></div>
      </section>

      <section className="weather-layout">
        <div className="forecast-panel"><div className="section-head"><div><span className="eyebrow">7-day outlook</span><h2>Plan the week</h2></div><span className="updated">Forecast: {data.timezone_abbreviation || data.timezone}</span></div>
          <div className="forecast-list">{days.map((day,i)=><article className={`forecast-day ${i===0?'today':''}`} key={day}><div className="day-name"><b>{i===0?'Today':fmtDay(day)}</b>{i===0&&<small>{fmtDay(day)}</small>}</div><span className="day-icon">{icon(data.daily.weather_code[i])}</span><div className="day-condition"><b>{label(data.daily.weather_code[i])}</b><small>{data.daily.precipitation_probability_max[i]}% rain chance</small></div><div className="temps"><b>{Math.round(data.daily.temperature_2m_max[i])}°</b><span>{Math.round(data.daily.temperature_2m_min[i])}°</span></div><div className="rain"><span>💧</span>{data.daily.precipitation_sum[i].toFixed(1)} mm</div></article>)}</div>
        </div>

        <aside className="map-panel card"><div className="map-head"><div><span className="eyebrow">Location map</span><h3>{place.name}</h3><p>{Number(place.latitude).toFixed(3)}°, {Number(place.longitude).toFixed(3)}°</p></div><span className="map-pin">⌖</span></div><iframe title="Location map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a className="map-link" href={`https://www.openstreetmap.org/?mlat=${place.latitude}&mlon=${place.longitude}#map=12/${place.latitude}/${place.longitude}`} target="_blank" rel="noreferrer">Open larger map ↗</a></aside>
      </section>
      <p className="weather-source">Weather data provided by Open-Meteo. Forecast values can change as new observations and model runs become available. Always use local agricultural advisories for critical decisions.</p>
    </>}
  </main></div>;
}
