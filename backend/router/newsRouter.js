import express from "express"
import newsController from "../controllers/newsController.js"
import isAdminAuth from "../middleware/adminVerify.js"
import upload from "../config/multer.js"

const router = express.Router()

router.post('/createnews',isAdminAuth,upload.array('images', 8), newsController.createNews)
router.get('/',newsController.getNews)
router.get('/drafts', isAdminAuth,newsController.getDraftNews)
router.put('/editnews/:id', upload.array("images"),isAdminAuth,newsController.editNews)
router.patch('/approvalnews/:id', isAdminAuth,newsController.sendForApprove)
router.patch('/schedule/:id', isAdminAuth,newsController.ScheduledNews)
router.patch('/publish/:id',isAdminAuth, newsController.publishNews)
router.delete('/deletenews/:id', isAdminAuth,newsController.deleteNews)
router.get('/getNews',newsController.getPublishedNews)
router.get('/singlenews/:id',newsController.getSinglenews)



export default router




