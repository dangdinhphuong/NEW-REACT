import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary.js";
import express from "express";
import { deleteImage, getAllImage, uploadImages } from "../controller/upload.js";
import dotenv from "dotenv"
dotenv.config()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: process.env.FOLDER_UPLOAD,
        allowed_formats: ['jpg', 'png', 'jpeg','webp','gif']
    }
})

const upload = multer({storage: storage})

const router = express.Router()
router.post("/images/upload",upload.array("images", 10),uploadImages)
router.get("/images", getAllImage)
router.delete("/images/:publicId/delete", deleteImage)

export default router