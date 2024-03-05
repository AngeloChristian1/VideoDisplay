import dotenv from "dotenv"
import multer, { Multer } from 'multer';
import { v2 as cloudinary, UploadApiResponse, 
UploadApiErrorResponse } from 'cloudinary';
import sharp from 'sharp';


dotenv.config();

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME, 
 api_key: process.env.CLOUDINARY_API_KEY, 
 api_secret: process.env.CLOUDINARY_SECRET,
});

interface CloudinaryFile extends Express.Multer.File {
 buffer: Buffer;
}

const storage = multer.memoryStorage();
export const uploader: Multer = multer({ storage: storage });
