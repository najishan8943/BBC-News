import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/Axios'

const SingleNews = () => {
    const { id } = useParams()
    const  [news, setNews]= useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getNews()
    },[id])
    
    const getNews = async () =>{
        try {
            const res = await API.get(`/news/singlenews/${id}`)
            console.log(res.data);
            
            setNews(res.data.news)
        } catch (error) {
            console.log(error);      
        } finally{
            setLoading(false);
        }
     
    }
      if (loading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>News not found</div>;
  }

  return (
 <div className="max-w-4xl mx-auto px-4 py-6">

      {/* Category */}
      <span className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm">
        {news.category}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
        {news.title}
      </h1>

      {/* Date */}
      <p className="text-gray-500 mt-2">
        {news.publishDate
          ? new Date(news.publishDate).toDateString()
          : ""}
      </p>

      {/* Summary */}
      <p className="text-lg text-gray-700 mt-4 border-l-4 border-red-600 pl-4">
        {news.summary}
      </p>

      {/* Main Image */}
      {news.images?.length > 0 && (
        <img
          src={news.images[0]}
          alt={news.title}
          className="w-full h-72 md:h-[500px] object-cover rounded-lg mt-6"
        />
      )}

      {/* Content */}
      <div className="mt-8 text-gray-800 leading-8 text-base md:text-lg whitespace-pre-line">
        {news.content}
      </div>

      {/* Additional Images */}
      {news.images?.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {news.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`News ${index}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default SingleNews