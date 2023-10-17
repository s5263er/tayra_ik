// LoginPage.js
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5070/api/auth/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const { token, role } = response.data;

        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userRole', role);

        console.log('Login successful');

        // Redirect based on user role
        if (role === 'HR') {
          navigate('/hr-home'); // Adjust the route to your HR home page
        } else {
          navigate('/default-home'); // Adjust the route to your default home page
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };


  return (
    <div className="login-page">
      <div className="login-container">
        <div className="blinking-text">
          <h1 className="splash-text">Tayra Tekstil</h1>
          <p className="splash-subtext">Insan Kaynakları</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Giriş yap</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
