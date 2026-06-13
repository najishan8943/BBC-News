import argon from "argon2"
import Admin from "../model/Admin.js"

const createAdmin = async () =>{
    try {
     const existAdmin = await Admin.findOne({
        email:"admin@newsport.com"
     })  
     if(existAdmin){
        console.log("Admin already exist")
        return;        
     } 
 
     const hashedPassword = await argon.hash("Admin@123")

     await Admin.create({
        email:"admin@newsport.com",
        password:hashedPassword,
     })

    console.log("Default Admin created");
     
    } catch (error) {
       console.log("Admin is not created an error occured :",error.message);
       
    }
}

export default createAdmin;