import React, { useEffect, useState } from 'react'
import API from '../api/Axios'
import { Link } from 'react-router-dom';

const Home = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const res = await API.get("/news/getNews")
            setNews(res.data.news)
        } catch (error) {
            console.log("Eroor fetching news:", error)
        }
    }

  return (
  <div className="bg-gray-50 min-h-screen">

    {/* TOP STORY - MAGAZINE STYLE */}
    {news.length > 0 && (
      <section className="max-w-6xl mx-auto px-4 pt-10">

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">

          <div className="p-6 md:p-10">

            <p className="text-red-600 font-bold uppercase tracking-widest text-xs">
              Featured Story
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900 leading-tight">
              {news[0].title}
            </h1>

            <div className="flex gap-3 items-center mt-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {news[0].category}
              </span>
              <span>
                {news[0].publishDate
                  ? new Date(news[0].publishDate).toDateString()
                  : ""}
              </span>
            </div>

            <p className="mt-5 text-gray-700 text-lg leading-relaxed">
              {news[0].summary}
            </p>

            <Link
              to={`/news/${news[0]._id}`}
              className="inline-block mt-6 text-red-600 font-semibold hover:underline"
            >
              Continue reading →
            </Link>

          </div>
        </div>

      </section>
    )}

    {/* GRID SECTION */}
    <section className="max-w-6xl mx-auto px-4 mt-12">

      <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-red-500 pl-3">
        Latest Updates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {news.slice(1).map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
          >

            {/* IMAGE */}
            {item.images?.[0] && (
              <div className="h-48 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt="news"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="p-4">

              <p className="text-xs text-gray-500 uppercase">
                {item.category} •{" "}
                {item.publishDate
                  ? new Date(item.publishDate).toDateString()
                  : ""}
              </p>

              <h3 className="mt-2 font-bold text-gray-900 text-lg leading-snug hover:text-red-600 transition">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {item.summary}
              </p>

              <Link
                to={`/news/${item._id}`}
                className="mt-4 inline-block text-red-600 text-sm font-semibold hover:underline"
              >
                Read more →
              </Link>

            </div>

          </div>
        ))}

      </div>
    </section>

  </div>
);
};

export default Home;