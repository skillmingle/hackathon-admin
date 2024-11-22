import React, { useState, useContext } from 'react';
import ContextApi from '../ContextAPI/ContextApi';
import { useNavigate, Link } from 'react-router-dom';
import "../css/Login&Signup.css";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

const CLIENT_ID = '339348172585-mucddr9ktvagcqamk6khtl1oliradje1.apps.googleusercontent.com';

const Login = () => {
  const { setuser } = useContext(ContextApi);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://h2h-backend-7ots.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        console.log(data)
        setuser(data.user);
        navigate('/Dashboard'); // Redirect after successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };


  const handleSaveToken = async (accessToken) => {
    try {
      const response = await axios.post("https://h2h-backend-7ots.onrender.com/api/admin/accessToken", {
        accessToken,
      });

      if (response.data.success) {
        alert("Access token stored successfully!");
      } else {
        alert("Failed to store access token.");
      }
    } catch (error) {
      console.error("Error storing access token:", error);
      alert("An error occurred while storing the access token.");
    }
  };


  const driveAuth = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      console.log(tokenResponse.access_token);
      handleSaveToken(tokenResponse.access_token);
    },
    onError: (e) => console.log("Failed to refresh token, please login again", e),
    scope: "https://www.googleapis.com/auth/drive",
  });
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/Signup">Signup</Link></p>
      </form>
      <div style={{display:'block'}}>
        <button onClick={driveAuth}>Google Drive Authentication</button>
        {accessToken}
      </div>
    </div>
  );
};


export default function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Login/>
    </GoogleOAuthProvider>
  );
}
