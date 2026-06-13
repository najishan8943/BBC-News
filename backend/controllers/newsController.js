import News from "../model/News.js"
import slugify from "slugify"
import Admin from "../model/Admin.js"
import { v2 as cloudinary } from "cloudinary"



const createNews = async (req, res) =>{
  try {

    const { title, summary, content, category, publishDate} = req.body
    if( !title || !summary || !content || !category || !publishDate ) return res.status(400).json({ status:false, message:"Must fill all fields"})
    const existAdmin = await Admin.findById(req.admin.id)
    if(!existAdmin){
      return res.status(400).json({status:false, message:"Admin is not found"})
    }

    const images = []
    for(const file of req.files){
      const result = await cloudinary.uploader.upload(
        file.path, { resource_type: "image"})
        images.push(result.secure_url)
    }

    const newsDetails = await News.create({
      title,
      slug: slugify(title, { lower:true, strict: true }),
      summary,
      content,
      category,
      publishDate,
      images,
      createdBy: req.admin.id
    })


    return res.status(200).json({ status:true, message:"Successfully created the news.", news:newsDetails})
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  
  }   
}


export const getDraftNews = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {status: "draft",isDeleted: false};

    if (category) {
      filter.category = category;
    }

    const news = await News.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({status: true,count: news.length,  news});

  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
}


const editNews = async (req, res) =>{
  try {

    const { id } = req.params;
    const news = await News.findById(id)
      if(!news) return res.status(404).json({ status:false, message:"News not found"})
    
        if(news.status === "published"){
          return res.status(400).json({ status:false, message:"Published news cannot be edited"})
        }

        const { title, summary, content, category, publishDate } = req.body;

        if(title){ news.title = title;
          news.slug = slugify( title,{ lower:true, strict: true })
        }
        if(summary) news.summary = summary;
        if(content) news.content = content;
        if(category) news.category = category;
        if(publishDate) news.publishDate = publishDate;

        await news.save()
        return res.status(200).json({ status:true, message:"News updated!", news})
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  }
}

const sendForApprove = async (req, res)=>{
  try {
    const news = await News.findByIdAndUpdate(req.params.id, { status:"in-review"}, {new:true} )
    return res.status(200).json({ status:true, message:"News sent for approval", news})

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })  
  }
}


const ScheduledNews = async (req, res)=>{
  try {
    const news = await News.findByIdAndUpdate(req.params.id, { status:"scheduled"}, {new:true} )
    return res.status(200).json({ status:true, message:"News scheduled successfully", news})

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })  
  }
}


const publishNews = async (req, res)=>{
  try {
    const news = await News.findByIdAndUpdate(req.params.id, { status:"published"}, {new:true} )
    return res.status(200).json({ status:true, message:"News published!", news})

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })  
  }
}

const deleteNews = async (req, res) =>{
  try {
    const { id } = req.params
    const news = await News.findById(id)
    if(!news){
      return res.status(400).json({ status:false, message:"News not found"})
    }
    news.isDeleted = true
    await news.save()
    return res.status(200).json({ status:true, message:"News deleted"})
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })  

  }
}



const getPublishedNews = async (req, res) =>{
  try {
    const { category } = req.query;
    const filter = { status:"published", isDeleted:false}

    if (category){
      filter.category = category;
    }

    const news =  await News.find(filter).sort({ createdAt: -1})
     return res.status(200).json({ status:true, news})

  } catch (error) {
     return res.status(500).json({ status: false, message: error.message })  
  }
}


const getSinglenews =  async (req, res)=>{
  try {
    const { id } = req.params
    const news = await News.findOne({ _id:id,  isDeleted:false, status:"published" })
    if(!news){
      return res.status(404).json({ status:false, message:"News not found"})
    }
    return res.status(200).json({ status:true, message:"Successfully fetched news", news})
    
  } catch (error) {
     return res.status(500).json({ status: false, message: error.message })      
  }

}


const getNews = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = { isDeleted: false };

    if (status) {
      filter.status = status;
    }

    const news = await News.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      news
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


export default {createNews, editNews, getDraftNews, sendForApprove, ScheduledNews, publishNews, deleteNews, getPublishedNews, getSinglenews, getNews}