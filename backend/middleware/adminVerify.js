import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


async function isAdminAuth(req,res,next){
    try {
        const adminAuthToken = req.headers.authorization
            if(!adminAuthToken){
            return res.status(401).json({ status:false,message:"Token is missing"})
            }
            const token = adminAuthToken.split(' ')[1]
            const decodedAdmin = jwt.verify(token, process.env.SECRET_KEY)
            
             req.admin = decodedAdmin
             next()

    } catch (error) {
     return res.status(401).json({ status:false, message:error.message})   
    }
}

export default isAdminAuth