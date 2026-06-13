import { useEffect, useState } from "react";
import { deletenews, getDraftNews } from "../../api/News.api";


const DraftDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDrafts = async () => {
    try {
      setLoading(true);
      const res = await getDraftNews();
      setNews(res.news || []);
    } catch (err) {
      console.log(err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  // DELETE HANDLER
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this news?"
      );

      if (!confirmDelete) return;

      await deletenews(id);

      // remove from UI instantly
      setNews((prev) => prev.filter((item) => item._id !== id));

      alert("News deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        Draft News
      </h1>

      {/* TABLE */}
      <div className="bg-white shadow rounded">

        {/* HEADER ROW */}
        <div className="grid grid-cols-6 bg-black text-white p-3 text-sm">
          <div>Title</div>
          <div>Summary</div>
          <div>Content</div>
          <div>Category</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {/* BODY */}
        {loading ? (
          <div className="p-4 text-gray-500">Loading...</div>
        ) : news.length === 0 ? (
          <div className="p-4 text-gray-500">No news found</div>
        ) : (
          news.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-6 p-3 border-b text-sm"
            >

              <div className="font-semibold">{item.title}</div>
              <div>{item.summary || "—"}</div>
              <div className="truncate max-w-[120px]">
                {item.content}
              </div>
              <div className="capitalize">{item.category}</div>
              <div>
                {item.publishDate
                  ? new Date(item.publishDate).toLocaleDateString()
                  : "Not set"}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-2 py-1 bg-red-600 text-white text-xs rounded"
                >
                  Delete
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