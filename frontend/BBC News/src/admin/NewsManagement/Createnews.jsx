import { useState } from "react";
import { createNews } from "../../api/News.api";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    publishDate: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value,});
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("publishDate", form.publishDate);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await createNews(formData);
      alert(res.message);
    } catch (err) {
      console.log(err);
      alert("Failed to create news");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
         <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Create News
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" placeholder="Title"
          className="w-full border p-3"
          onChange={handleChange}/>

        <input name="summary" placeholder="Summary"
          className="w-full border p-3"
          onChange={handleChange}/>

        <textarea name="content" placeholder="Content"
          className="w-full border p-3 h-40"
          onChange={handleChange}/>

        <input name="category" placeholder="Category"
          className="w-full border p-3"
          onChange={handleChange}/>

        <input type="date" name="publishDate"
          className="w-full border p-3"
          onChange={handleChange}/>

        <input type="file" multiple
          className="w-full border p-3"
          onChange={handleImages}/>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3">
          Create News
        </button>

      </form>
    </div>
  );
};

export default CreateNews;