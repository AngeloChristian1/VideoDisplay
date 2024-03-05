// import { swaggerJsdoc } from 'swagger';
import {Express, Request, Response} from'express'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import {version} from "../../package.json"
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Blog Swagger API",
      version:'1.0.0',
      description: "Swagger Documentation"
    },
    servers: [
      {
        url: "https://backend-my-brand.onrender.com/",
      }, 
      {
        url: "http://localhost:8080",
      }, 
    ],

  },
  apis:['../routes/blogs.ts', "./routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app:Express, port:number)=>{

    // swswagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in JSON format
    app.get('docs.json',(req:Request, res: Response)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })

    console.log(`Docs available at http://localhost:${port}/docs`)
}


export default swaggerDocs