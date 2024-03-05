
import { cloudinary } from '../helpers/cloudinary'

let image = "../assets/images/blog2.jpg"

 cloudinary.uploader.upload(image).then((result)=>{console.log("cloudinary results",result)})



//  try{
//    let {poster} = req.body
//    if(!poster){ 
//        console.log("response", req)
//        return res.status(400).send({message:"No poster"})
//    }

   // // let image = "../assets/images/blog1.jpg"
   // try{
   //     const result = await cloudinary.uploader.upload(poster)
   //     console.log("result", result.secure_url);
   //     return res.status(200).send({message:"Successfull", result: result.secure_url})
   // }catch(err){}
   // cloudinary.uploader.upload(image).then((result)=>{
   //     console.log("cloudinary results",result)
   //         let fileImage = req.file

   // })        
   
// }

