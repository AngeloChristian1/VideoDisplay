import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './routes'
import swaggerUi from "swagger-ui-express"
import {version} from "../package.json"
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import multer from "multer"

const upload = multer()
export const  app = express();

app.use(cors({
    credentials:true,
}))

app.use(compression()); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

const server = http.createServer(app);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Blog Swagger API",
      version:'1.0.0',
      description: "Swagger Documentation"
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description:"Local server"
      }, 
      {
        url: "https://backend-my-brand.onrender.com/",
        description:"Production server"
      }, 

    ],

  },
  apis:[`${__dirname}/routes/*ts`, __filename,'backend-my-brand/src/routes/blogs.ts', "backend-my-brand/src/routes/*.ts"]
};

const specs = swaggerJSDoc(options)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))


// const MONGO_URL = 'mongodb+srv://AngeloChristian:ySGl4d7ZvTE3BRhK@cluster0.8xeh2j6.mongodb.net/?retryWrites=true&w=majority'
const MONGO_URL = 'mongodb+srv://AngeloChristian:ySGl4d7ZvTE3BRhK@cluster0.8xeh2j6.mongodb.net/my-blog?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on("error", (error: Error)=> console.log("Error", error)) 


const port = 8080

app.get('/welcome', (req, res)=>{
  res.status(200).send({message:"Welcome to my API"})
})

    /**
     * @swagger
     * /welcome:
     * get:
     *  tag:
     *      - HealthCheck
     *       description: Responds if the app is up and running
     *        responses:
     *          200:
     *          description: App is up and running
     */
    // swaggerDocs(app, port)
app.use('/', router())
  server.listen(port, ()=>{
    console.log(`listening on port https://localhost:${port}`)
    // connectMongo();
    
}) 


