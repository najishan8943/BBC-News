import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/Axios";
import { editNews } from "../../api/News.api";


const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    publishDate: "",
  });

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      
      const res = await API.get(`/news/singlenews/${id}`);
      const data = res.data.news;

      setForm({
        title: data.title || "",
        summary: data.summary || "",
        content: data.content || "",
        category: data.category || "",
        publishDate: data.publishDate?.slice(0, 10) || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await editNews(id, form);
      alert(res.message);  
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(err);
      alert("Updation failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit News
      </h1>

     <form onSubmit={handleSubmit} className="space-y-5">

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Title
    </label>
    <input name="title"
      value={form.title}
      onChange={handleChange}
      className="w-full border p-3 rounded-md"
      placeholder="Enter news title"/>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Summary
    </label>
    <input name="summary"
      value={form.summary}
      onChange={handleChange}
      className="w-full border p-3 rounded-md"
      placeholder="Short summary"/>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Content
    </label>
    <textarea name="content"
      value={form.content}
      onChange={handleChange}
      className="w-full border p-3 h-40 rounded-md"
      placeholder="Write full news content"/>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Category
    </label>
    <input name="category"
      value={form.category}
      onChange={handleChange}
      className="w-full border p-3 rounded-md"
      placeholder="e.g. Sports, Politics"/>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Publish Date
    </label>
    <input type="date"
      name="publishDate"
      value={form.publishDate}
      onChange={handleChange}
      className="w-full border p-3 rounded-md"/>
  </div>

  <button type="submit"
    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700" >
    Update News
  </button>

 </form>
    </div>
  );
};

export default EditNews;