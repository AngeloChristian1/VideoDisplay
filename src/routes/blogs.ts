import express from 'express'
import { isAuthenticated, isOwner, isAdmin, checkOwnership, checkAdminship } from '../middlewares'
import { extractToken } from '../middlewares/jwt_config'
import { getAllBlogs, addBlog, deleteBlog, updateBlog, getOneBlogById, uploadImage, uploadImageToCloudinary } from '../controllers/blogs'
import {upload} from '../helpers/multer'
import { uploader } from 'middlewares/uploader'

// schemma
/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *   schemas:
 *      Blog:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Id provided by db
 *              poster:
 *                  type: string
 *                  description: Image link
 *              title:
 *                 type: string
 *                 description: Blog title
 *              subtitle:
 *                  type: string
 *                  description: Blog subtitle
 *              timeToRead:
 *                  type: string
 *                  description: Time to read blog
 *              content:
 *                  type: string
 *                  description: Blog content
 *              category:
 *                  type: string
 *                  description: Blog category
 *              createdAt:
 *                  type: string
 *                  description: Time created
 *              updatedAt:
 *                  type: string
 *                  description: Time updated
 *          example:
 *             poster: https://res.cloudinary.com/dms2akwoq/image/upload/v1709553916/my-blog/ghgmv3vgavb05yjs126f.jpg
 *             title: Evolution of programming
 *             subtitle: johndoe@gmail.com
 *             category: "Software Enginerring"
 *             timeToRead: "30"
 *             content: "The Power of Prompts \\n Prompt engineering has emerged as one of the most impactful innovations in artificial intelligence and software development in recent years. With the right prompts."
 *             createdAt: "2024-03-04T12:05:17.227Z"
 *             updatedAt: "2024-03-04T12:05:17.227Z"
 *
 */

export default(router: express.Router)=>{
  // router.post('/blogs/add',isAuthenticated, isAdmin, addBlog)
  router.post("/blogs/upload",extractToken,checkAdminship, uploadImageToCloudinary);
  router.post("/blogs/add",extractToken,checkAdminship, uploadImageToCloudinary);


/**
 * @swagger
 * '/blogs/add':
 *  post:
 *    summary: -Add a blog
 *    tags: [Blog]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              subtitle:
 *                type: string
 *              category:
 *                type: string
 *              timeToRead:
 *                type: string
 *              content:
 *                type: string
 *    responses:
 *      200:
 *        description: You have successfully logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Blog'
 *      500:
 *        description: internal server error
 *      
 */

  /**
   *
   * @swagger
   * '/blogs':
   *   get:
   *     summary: Get All Blog
   *     tags: [Blog]
   *     security:
   *      -bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#components/schemas/Blog'
   *       400:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             example:
   *               message: Internal server error
   *               error: Details about the error
   */

 
/** 
 * @swagger 
 * /blogs/{id}:
 *   get:
 *     summary: Get one blog
 *     tags: [Blog]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the blog
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Details about the error
 */
  router.get("/blogs", getAllBlogs);
  router.get("/blogs/:id", getOneBlogById);

  router.delete("/blogs/delete/:id", extractToken,checkAdminship, deleteBlog);
  router.patch("/blogs/update/:id", extractToken,checkAdminship, updateBlog);
}
  

/** 
 * @swagger 
 * /blogs/delete/{id}:
 *   delete:
 *     summary: Delete a Blog
 *     tags: [Blog]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Blog to be deleted
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Details about the error
 */


/** 
 * @swagger 
 * /blogs/update/{id}:
 *   patch:
 *     summary: update a Blog
 *     tags: [Blog]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Blog to be updated
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 * 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Details about the error
 */
