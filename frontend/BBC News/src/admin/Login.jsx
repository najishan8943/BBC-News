import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/Admin.api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      return alert("Email is required");
     }

     if (!form.password) {
      return alert("Password is required");
     }

     try {
      const data = await adminLogin(form);
      localStorage.setItem("token", data.adminToken);
      navigate("/admin/dashboard");
     } catch (error) {
      alert( error.response?.data?.message || "Login failed" );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}
         className="w-full max-w-md shadow-lg p-6 rounded">
         <h2 className="text-2xl font-bold mb-5"> Admin Login </h2>

         <input type="email" placeholder="Email"
          className="w-full border p-3 mb-4"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value,})}/>

         <input type="password" placeholder="Password"
          className="w-full border p-3 mb-4"
          value={form.password}
          onChange={(e) => setForm({  ...form, password: e.target.value,})} />

        <button type="submit" className="w-full bg-black text-white p-3" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;