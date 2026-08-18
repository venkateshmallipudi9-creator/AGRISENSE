
import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import '../styles/Auth.css';
export default function RegisterPage(){
 const [data,setData]=useState({name:'',email:'',password:'',confirm:''}),[error,setError]=useState('');const {register}=useAuth();const navigate=useNavigate();
 const change=e=>setData({...data,[e.target.name]:e.target.value});
 const submit=e=>{e.preventDefault();setError('');if(Object.values(data).some(v=>!v))return setError('Complete all fields to create your account.');if(!data.email.includes('@'))return setError('Enter a valid email address.');if(data.password.length<6)return setError('Password must be at least 6 characters.');if(data.password!==data.confirm)return setError('Passwords do not match.');register(data.email,data.password,data.name);navigate('/home')};
 return <AuthLayout title="Grow with confidence." subtitle="Create your workspace and start checking plant health."><form className="auth-form" onSubmit={submit}>{error&&<div className="form-error">{error}</div>}
  <div className="field"><label>Full name</label><input name="name" value={data.name} onChange={change} placeholder="Your name"/></div>
  <div className="field"><label>Email address</label><input name="email" type="email" value={data.email} onChange={change} placeholder="you@example.com"/></div>
  <div className="field"><label>Password</label><input name="password" type="password" value={data.password} onChange={change} placeholder="At least 6 characters"/></div>
  <div className="field"><label>Confirm password</label><input name="confirm" type="password" value={data.confirm} onChange={change} placeholder="Repeat your password"/></div>
  <button className="btn btn-primary btn-lg full">Create account <span>→</span></button><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
 </form></AuthLayout>
}
