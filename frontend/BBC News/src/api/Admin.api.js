import API from "./Axios"

export const adminLogin = async (data) => {
    const res = await API.post("/admin/login", data)
    return res.data
}

export const changePassword = async (data) =>{
    const res = await API.put("/admin/changepassword", data)
    return res.data

}

export const singleData = async (data) =>{
    const res = await API.get("/admin/datas",data)
    return res.data
}