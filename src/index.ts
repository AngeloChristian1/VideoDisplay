import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './routes'


export const  app = express();

app.use(cors({
    credentials:true,
}))

app.use(compression()); 
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);

// const MONGO_URL = 'mongodb+srv://AngeloChristian:ySGl4d7ZvTE3BRhK@cluster0.8xeh2j6.mongodb.net/?retryWrites=true&w=majority'
const MONGO_URL = 'mongodb+srv://AngeloChristian:ySGl4d7ZvTE3BRhK@cluster0.8xeh2j6.mongodb.net/my-blog?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on("error", (error: Error)=> console.log("Error", error)) 

// const connectMongo = () => {
//     mongoose
//       .connect(MONGO_URL)
//       .then(() => {
//         console.log("Database Connected successfully");
//       })
//       .catch((error) => {
//         console.log("Failed to connect to database ", error);
//       });
//   };


app.get('/welcome', (req, res)=>{
  res.status(200).send({message:"Welcome to my API"})
})
  server.listen(8080, ()=>{
    console.log('listening on port https://localhost:8080')
    // connectMongo();
}) 

app.use('/', router())
