import  { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_NAME = 'dms2akwoq'
const CLOUDINARY_KEY = '512215468442747'
const CLOUDINARY_SECRET = 'INCKgKkNjgzxbP6ggLed5XbcWxU'
const CLOUDINARY_URL= `cloudinary: //512215468442747:INCKgKkNjgzxbP6ggLed5XbcWxU@dms2akwoq`

 cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
}) 
export {cloudinary} 
 
export const uploadToCloudinary = (fileBuffer:Buffer) => {
    return new Promise((resolve, reject) => {
        // cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        //     if (error) {
        //         reject(error);
        //     } else {
        //         resolve(result.secure_url);
        //     }
        // }).end(fileBuffer);
    });
  };