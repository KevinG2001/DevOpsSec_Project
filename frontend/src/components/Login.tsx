import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post<{ token: string; isAdmin: boolean }>(
        `/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      // Redirect based on user role
      if (res.data.isAdmin) {
        navigate("/admindashboard"); // Redirect to admin page
      } else {
        navigate("/home"); // Redirect to regular user dashboard
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Invalid login credentials");
    }
  };

  return (
    <div className={styles.authContainer}>
      <img src="/BookIt.jpg" alt="BookIt Logo" className={styles.logo} />

      <div className={styles.authCard}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p className={styles.redirectText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.authLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
