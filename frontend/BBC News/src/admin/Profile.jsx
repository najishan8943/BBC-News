import { useEffect, useState } from "react";
import { singleData } from "../api/Admin.api";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    const data = await singleData();
    setAdmin(data.admin);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">
          Admin Profile
        </h2>
        <button
        onClick={() => navigate("/admin/dashboard")}
         className="absolute top-4 left-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
         >
        Back
      </button>
        { admin && (
          <>
            <p>
              <strong>Email:</strong> {admin.email}
            </p>
          </>
        )}

      </div>

    </div>
  );
};

export default Profile;