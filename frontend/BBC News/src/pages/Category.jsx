import React, { useEffect, useState } from 'react'
import { getPublishedNews } from '../api/News.api'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
 const { category } = useParams();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryNews();
  }, [category]);

  const fetchCategoryNews = async () => {
    try {
      setLoading(true);

      const data = await getPublishedNews(category);

      setNews(data.news || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Category Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 capitalize">
        {category} News
      </h1>

      {/* No News */}
      {news.length === 0 ? (
        <div className="text-center text-gray-500">
          No news available in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              {item.images?.[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-4">

                {/* Category */}
                <span className="text-red-600 text-xs font-semibold uppercase">
                  {item.category}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold mt-2 line-clamp-2">
                  {item.title}
                </h2>

                {/* Summary */}
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {item.summary}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-400 mt-3">
                  {item.publishDate
                    ? new Date(item.publishDate).toLocaleDateString()
                    : ""}
                </p>

                {/* Read More */}
                <Link
                  to={`/news/${item._id}`}
                  className="inline-block mt-4 text-blue-600 font-medium"
                >
                  Read More →
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Category