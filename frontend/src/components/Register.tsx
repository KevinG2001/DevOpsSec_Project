import React, { useState, FormEvent } from 'react';
import axios from 'axios';


const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ token: string }>('http://localhost:5000/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      console.log('Registration successful!');
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username" 
        required 
      />
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" 
        required 
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
