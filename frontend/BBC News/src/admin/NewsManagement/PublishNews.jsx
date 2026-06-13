import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPublishedNews } from "../../api/News.api";

const CategoryNews = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    const res = await getPublishedNews(category);
    setNews(res.news);
  };

  return (
    <div>
         <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>
      <h1>{category} </h1>
{news.map((item) => (
  <div
    key={item._id}
    className="max-w-3xl mx-auto bg-white shadow-md rounded-xl overflow-hidden mb-6 border"
  >
    <div className="p-5">

      {/* CATEGORY + DATE */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {item.category}
        </span>

        <span className="text-xs text-gray-500">
          {new Date(item.publishDate).toDateString()}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {item.title}
      </h2>

      {/* SUMMARY */}
      <p className="text-gray-600 font-medium mb-3">
        {item.summary}
      </p>

      {/* CONTENT PREVIEW */}
      <p className="text-gray-700 leading-relaxed">
        {item.content.length > 250
          ? item.content.substring(0, 250) + "..."
          : item.content}
      </p>

    </div>
  </div>
))}
   
    </div>
  );
};

export default CategoryNews;