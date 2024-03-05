import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../assets/uploads")
    },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
    console.log("file in multer",file.originalname)
  },
});
export const upload = multer({ storage: storage });