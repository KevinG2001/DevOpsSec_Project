import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.scss"; // Import shared styles

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { firstname, surname, email, password } // ✅ Sending required fields
      );
      localStorage.setItem("token", res.data.token);
      setSuccess(true);
      console.log("Registration successful!");
    } catch (error: any) {
      setError(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Register</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && (
          <p className={styles.success}>
            Registration successful! <Link to="/">Login now</Link>
          </p>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            className={styles.input}
            required
          />
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
            className={styles.input}
            required
          />
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
            Register
          </button>
        </form>

        <p className={styles.redirectText}>
          Already have an account?{" "}
          <Link to="/" className={styles.authLink}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
