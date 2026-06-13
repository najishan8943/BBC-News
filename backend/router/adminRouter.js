import express from "express"
import adminLController from "../controllers/adminController.js"
import isAdminAuth from "../middleware/adminVerify.js"

const router = express.Router()

router.post("/login", adminLController.adminLogin)
router.put('/changepassword', isAdminAuth, adminLController.changePassword)
router.get('/datas', isAdminAuth, adminLController.singleData)




 export default router 