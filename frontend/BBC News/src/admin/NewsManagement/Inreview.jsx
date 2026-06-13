import { useEffect, useState } from "react";
import API from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import { ScheduledNews } from "../../api/News.api";

const InReviewDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await API.get("/news?status=in-review");
      setNews(res.data.news || []);
    } catch (error) {
      console.log(error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSchedule = async (id) => {
    try {
      const res = await ScheduledNews(id);
      alert(res.message);
      setNews((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-4">
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">
        In-Review News
      </h1>
      <div className="hidden md:block bg-white rounded shadow overflow-hidden">

        <div className="grid grid-cols-5 bg-black text-white p-3 text-sm">
          <div>Title</div>
          <div>Category</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div className="p-4">Loading...</div>
        ) : news.length === 0 ? (
          <div className="p-4">No in-review news found</div>
        ) : (
          news.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-5 p-3 border-b text-sm items-center">
              <div className="font-semibold truncate">
                {item.title}
              </div>

              <div className="capitalize">
                {item.category}
              </div>

              <div>
                <span className="bg-yellow-200 px-2 py-1 rounded text-xs">
                  {item.status}
                </span>
              </div>

              <div className="text-gray-600">
                {item.publishDate
                  ? new Date(item.publishDate).toLocaleDateString()
                  : "Not set"}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleSchedule(item._id)}
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                  Schedule
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="md:hidden space-y-3">

        {loading ? (
          <div>Loading...</div>
        ) : news.length === 0 ? (
          <div>No in-review news found</div>
        ) : (
          news.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow">
              <h2 className="font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 mt-1 capitalize">
                {item.category}
              </p>

              <p className="text-xs text-yellow-600 mt-1">
                {item.status}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.publishDate
                  ? new Date(item.publishDate).toLocaleDateString()
                  : "Not set"}
              </p>

              <button
                onClick={() => handleSchedule(item._id)}
                className="mt-3 px-3 py-1 text-xs bg-blue-600 text-white rounded">
                Schedule News
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InReviewDashboard;