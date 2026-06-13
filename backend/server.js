import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import createAdmin from "./utils/createAdmin.js"
import adminLogin from "./router/adminRouter.js"
import newsRouter from "./router/newsRouter.js"
import connectCloudinary from "./config/cloudinary.js"

const app = express()
dotenv.config()

//dbconnection
connectDB()
connectCloudinary()


//port setup
const PORT = process.env.PORT || 3000

//middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bbc-news-six.vercel.app"
  ],
  credentials: true
}));
app.use(express.json())


//routers
app.use("/api/admin",adminLogin)
app.use("/api/news",newsRouter)



app.listen(PORT,  async () => {
    await createAdmin();
    console.log(`Server is running on port ${PORT}`);    
})