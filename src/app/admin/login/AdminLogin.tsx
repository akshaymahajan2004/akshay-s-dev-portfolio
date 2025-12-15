"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import hook

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize hook

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Redirect to Admin Dashboard on success
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-white text-black outline-none" // Added text-black
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-4 bg-white text-black outline-none" // Added text-black
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-300 mb-3 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}