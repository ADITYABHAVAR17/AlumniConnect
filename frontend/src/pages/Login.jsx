import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      login(res.data.user, res.data.token);

      // Role-based redirection
      const role = res.data.user.role;
      console.log(role);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "alumni") {
        console.log("Alumni");
        navigate("/alumni/dashboard");
      } else {
        console.log(role);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response.data.error || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
}
