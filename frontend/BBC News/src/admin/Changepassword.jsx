import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/Admin.api";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await changePassword(form);
      alert(data.message);
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
     <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Back
      </button>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Change Password
        </h2>

        <input type="password" placeholder="Current Password"
          className="w-full border p-3 mb-4"
          value={form.currentPassword}
          onChange={(e) => setForm({...form,currentPassword: e.target.value,})}/>

        <input type="password" placeholder="New Password"
          className="w-full border p-3 mb-4"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form,newPassword: e.target.value,})} />

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;