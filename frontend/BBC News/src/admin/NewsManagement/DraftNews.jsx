import { useEffect, useState } from "react";
import { getDraftNews, sendForApprove } from "../../api/News.api";
import { useNavigate } from "react-router-dom";

const DraftDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDrafts = async (cat = "") => {
    try {
      setLoading(true);
      const res = await getDraftNews(cat);
      setNews(res.news);
    } catch (error) {
      console.log(error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleSendForReview = async (id) => {
    try {
      const res = await sendForApprove(id);
      alert(res.message);
      setNews((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="relative flex justify-center items-center mb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="absolute left-0 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Draft News
        </h1>
      </div>

  
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">

        <div className="grid grid-cols-6 bg-gray-900 text-white text-sm font-semibold px-4 py-3">
          <div>Title</div>
          <div>Summary</div>
          <div>Content</div>
          <div>Category</div>
          <div>Publish Date</div>
          <div className="text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading drafts...
          </div>
        ) : news.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No draft news found
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-6 px-4 py-3 border-b hover:bg-gray-50 text-sm"
            >
              <div className="font-semibold text-gray-800 truncate">
                {item.title}
              </div>

              <div className="text-gray-600 truncate">
                {item.summary || "—"}
              </div>

              <div className="text-gray-600 truncate max-w-[150px]">
                {item.content}
              </div>

              <div className="capitalize text-gray-700">
                {item.category}
              </div>

              <div className="text-gray-500">
                {item.publishDate
                  ? new Date(item.publishDate).toLocaleDateString()
                  : "Not set"}
              </div>

              <div className="flex justify-end flex-wrap gap-2">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-news/${item._id}`)
                  }
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/delete/${item._id}`)
                  }
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleSendForReview(item._id)}
                  className="px-2 py-1 text-xs bg-yellow-600 text-white rounded"
                >
                  Send
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="md:hidden space-y-3">

        {loading ? (
          <div className="text-center text-gray-500">
            Loading drafts...
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-gray-500">
            No draft news found
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow"
            >
              <h2 className="font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                {item.summary || "—"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {item.category}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.publishDate
                  ? new Date(item.publishDate).toLocaleDateString()
                  : "Not set"}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-news/${item._id}`)
                  }
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/delete/${item._id}`)
                  }
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleSendForReview(item._id)}
                  className="px-3 py-1 text-xs bg-yellow-600 text-white rounded" >
                  Send for Review
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DraftDashboard;