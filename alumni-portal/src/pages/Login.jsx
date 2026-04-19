import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';

const Login = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'alumni'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(`${API_URL}/api/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await response.json();

      if (!response.ok) {

        alert(data.error || "Login failed");
        return;

      }

      /* store token */
      localStorage.setItem("alumniToken", data.token);

      /* store user */
      localStorage.setItem("alumniUser", JSON.stringify({
        ...data.user,
        isLoggedIn: true
      }));

      /* redirect */
      window.location.href = "/alumni-directory";

    }

    catch (error) {

      console.error(error);
      alert("Server error");

    }

  };

  return (

    <div className="min-h-[80vh] flex items-center justify-center bg-theme-bg">

      <form onSubmit={handleSubmit} className="premium-card p-8 w-[400px] space-y-4">

        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="input"
        />

        <div className="flex gap-5">

          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleChange}
            />

            Student
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="alumni"
              checked={formData.role === "alumni"}
              onChange={handleChange}
            />

            Alumni
          </label>

        </div>

        <button className="btn-primary w-full">
          Login
        </button>

        <Link to="/register">
          Create account
        </Link>

      </form>

    </div>

  );

};

export default Login;
