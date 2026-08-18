
import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import '../styles/Auth.css';
export default function LoginPage(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''); const {login}=useAuth();const navigate=useNavigate();
 const submit=e=>{e.preventDefault();setError('');if(!email||!password)return setError('Enter your email and password to continue.');if(!email.includes('@'))return setError('Enter a valid email address.');login(email,password);navigate('/home')};
 return <AuthLayout title="Welcome back." subtitle="Sign in to your plant health workspace."><form className="auth-form" onSubmit={submit}>
  {error&&<div className="form-error">{error}</div>}<div className="field"><label>Email address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
  <div className="field"><div className="label-row"><label>Password</label><span>Secure access</span></div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></div>
  <button className="btn btn-primary btn-lg full">Sign in <span>→</span></button>
  <div className="auth-divider"><span>AGRISENSE AI🌿</span></div><p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
 </form></AuthLayout>
}
function AuthLayout({title,subtitle,children}){return <div className="auth-page"><div className="auth-visual"><div className="auth-brand">◒ AGRISENSE AI🌿</div><div className="auth-visual-content"><span className="eyebrow">Plant health intelligence</span><h2>Turn a leaf photo into a clearer next step.</h2><p>Simple AI-assisted screening designed to help growers notice problems earlier.</p><div className="auth-stats"><span><b>01</b><small>Capture</small></span><span><b>02</b><small>Analyze</small></span><span><b>03</b><small>Act</small></span></div></div><div className="auth-orbit"></div></div><div className="auth-panel"><div className="auth-panel-inner"><div className="mobile-brand">◒ AGRISENSE AI🌿</div><div className="auth-heading"><span className="eyebrow">Your workspace</span><h1>{title}</h1><p>{subtitle}</p></div>{children}<p className="auth-note">For development use. AI results are screening guidance, not a confirmed diagnosis.</p></div></div></div>}
