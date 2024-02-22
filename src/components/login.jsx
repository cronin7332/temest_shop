import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Authentication successful
        const authToken = data.token;

        // Save the token to local storage
        localStorage.setItem('token', authToken);

        // Notify the parent component about successful login
        onLogin(authToken);

        // Redirect to the '/shop' page
        navigate('/shop');

        console.log('Authentication successful:', data);
      } else {
        // Authentication failed
        alert('Authentication failed. Please check your credentials.');
        console.error('Authentication failed:', data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;