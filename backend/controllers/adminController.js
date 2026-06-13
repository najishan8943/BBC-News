import Admin from "../model/Admin.js"
import argon from "argon2"
import jwt from "jsonwebtoken"


const adminLogin = async (req, res) =>{
try {
 
    const { email, password } = req.body;
    if ( !email || !password)return res.status(401).json({ status:false, message:"Must fill all fields"})
    const admin = await Admin.findOne({ email })
        if( !admin ){
        return res.status(404).json({ status:false, message:"Admin is not found" })
        }
        const isMatch = await argon.verify( admin.password ,password)

        if( !isMatch ){
        return res.status(400).json({ status:false,message:"Password is not matched" })
        }
    
        const newToken =  jwt.sign({ id:admin._id  }, process.env.SECRET_KEY , {expiresIn:"7d"})
        return res.status(200).json({ status:true, message:"Admin logged in successfully", adminToken:newToken })
 } catch (error) {
 return res.status(500).json({ status:false, message:error.message})   
}
}


const changePassword = async (req, res) =>{
try {
    const { currentPassword, newPassword } = req.body;
    if( !currentPassword || !newPassword){
        return res.status(400).json({ status:false, message:"Must fill all fields"})
    }
    const admin = await Admin.findById( req.admin.id)
     if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found",});
    }

    const isMatch = await argon.verify(admin.password, currentPassword)
    if(!isMatch) return res.status(404).json({ status:false, message:"Password is not matched"})
    const hashedPassword = await argon.hash(newPassword)
    admin.password = hashedPassword
    await admin.save()

    return res.status(200).json({ status:true, message:"Admin password is updated"})
 } catch (error) {
  return res.status(500).json({ status:false, message:error.message})    
}
}


async function singleData(req, res) {
    try {
        const adminId = req.admin.id
        const adminDetails = await Admin.findById(adminId).select('-password')
        if(!adminDetails){
        return res.status(404).json({ status:false, message:"Invalid Admin"})
        }
        return res.status(200).json({ status:true, message:"Admin Fetched Successfully ",admin:adminDetails})
    } catch (error) {
       return res.status(500).json({ status:false, message:error.message}) 
    }
}

export default {adminLogin,changePassword, singleData}