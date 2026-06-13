import API from "./Axios"


export const getPublishedNews = async (category) => {
    const res = await API.get("/news/getNews",{
        params:{
            category,
        }
    })
    return res.data
}

export const getSinglenews = async (id) =>{
    const res = await API.get(`/news/singlenews/${id}`)
    return res.data
}


export const createNews = async (data) => {
  const res = await API.post("/news/createnews", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


export  const getDraftNews = async (category ="")=>{
   const res = await API.get( category ?`/news/drafts?category=${category}` : `/news/drafts`)
   return res.data
}

export const editNews = async (id, data) => {
    const res = await API.put(`/news/editnews/${id}`, data)
    return res.data
}


export const deletenews = async(id) => {
   const res = await API.delete(`/news/deletenews/${id}`)
   return res.data
}

export const sendForApprove = async (id) => {
    const res = await API.patch(`/news/approvalnews/${id}`)
   return res.data 
}

export const ScheduledNews = async (id) =>{
    const res = await API.patch(`/news/schedule/${id}`)
    return res.data
}

export const publishNews = async (id) =>{
    const res = await API.patch(`/news/publish/${id}`)
    return res.data
}

