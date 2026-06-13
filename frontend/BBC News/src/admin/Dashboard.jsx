import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside className="w-60 border-r p-5">

        <h1 className="text-xl font-bold mb-8">
          BBC ADMIN
        </h1>

        <div className="flex flex-col gap-2">

          <button
            onClick={() => navigate("/admin/createnews")}
            className="text-left p-2 hover:bg-gray-100"
          >
            Create News
          </button>

          <button
            onClick={() => navigate("/admin/draftnews")}
            className="text-left p-2 hover:bg-gray-100"
          >
            Drafts
          </button>

          <button
            onClick={() => navigate("/admin/review")}
            className="text-left p-2 hover:bg-gray-100"
          >
            In-review
          </button>

          <button
            onClick={() => navigate("/admin/schedule")}
            className="text-left p-2 hover:bg-gray-100"
          >
            Scheduled
          </button>

          <button
            onClick={() => navigate("/admin/publish")}
            className="text-left p-2 hover:bg-gray-100"
          >
            Published
          </button>

        </div>

      </aside>

      {/* Content */}
      <div className="flex-1">

        {/* Header */}
        <div className="flex justify-end gap-3 p-4 border-b">

          <button
            onClick={() => navigate("/admin/profile")}
            className="px-3 py-1 border"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/admin/changepassword")}
            className="px-3 py-1 border"
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 text-white"
          >
            Logout
          </button>

        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold">
            Dashboard
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;