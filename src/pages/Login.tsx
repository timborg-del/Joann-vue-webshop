import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData'; // Import your custom hook for fetching data
import './Login.css'; // Import your CSS file for styling

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLoading, error: loginError } = useFetchData('http://localhost:7203/api/users/login');

  const handleLogin = () => {
    // Check if username and password are empty
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    // Send POST request to login endpoint
    fetch('http://localhost:7203/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
        // Redirect to the admin page if login is successful
        navigate('/admin');
      })
      .catch((error) => {
        // Handle error
        console.error('Error logging in:', error);
        setError('Invalid username or password');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleLogin} className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {loginError && <div className="error-message">{loginError.message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;

