import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();  // Use the useNavigate hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { username, password });
      alert('Signup successful! You can now log in.');
      // Redirect to login page after successful signup
      history.push('/login');
    } catch (error) {
      alert('Signup failed: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
