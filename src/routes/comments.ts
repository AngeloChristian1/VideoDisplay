import express from 'express'
import { isAuthenticated, isLoggedIn } from '../middlewares'
import {getCommentsByBlogId,getCommentsByUserId, getAllComments, addComment, deleteComment, updateComment, getOneCommentById } from '../controllers/comments'
import { extractToken } from '../middlewares/jwt_config'

export default(router: express.Router)=>{
    router.post('/comments/add',extractToken, isLoggedIn, addComment)
    router.get('/comments',extractToken,  getAllComments)
    router.get('/comments/:id',extractToken, getOneCommentById )  
    router.get('/comments/users/:id', extractToken, getCommentsByUserId )  
    router.get('/comments/blogs/:id', extractToken, getCommentsByBlogId )  
    router.delete('/comments/delete/:id', extractToken, deleteComment )
    router.patch('/comments/update/:id', extractToken, updateComment )
}
   
// schema


/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *   schemas:
 *      Comment:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Id provided by db
 *              blogId:
 *                  type: string
 *                  description: Id of blog
 *              usedId:
 *                 type: string
 *                 description: Id of user
 *              content:
 *                 type: string
 *                 description: Id of user
 *              createdAt:
 *                  type: string
 *                  description: Time created
 *              updatedAt:
 *                  type: string
 *                  description: Time updated
 *          example:
 *             id: 65e070808c4b09bb1f9b3ea 
 *             blogId: "65e05476cf3ae7f4a1d49549"
 *             userId: "65e05476cf3ae7f4a1d49549"
 *             content: "Prompt engineering has emerged as one of the most impactful innovations."
 *             createdAt: "2024-03-04T12:05:17.227Z"
 *             updatedAt: "2024-03-04T12:05:17.227Z"
 *
 */





/**
 * @swagger
 * '/comments/add':
 *  post:
 *    summary: -Add a Comment
 *    tags: [Comment]
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
 *              $ref: '#components/schemas/Comment'
 *      500:
 *        description: internal server error
 *      
 */

  /**
   *
   * @swagger
   * '/comments':
   *   get:
   *     summary: Get All Comment
   *     tags: [Comment]
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
   *                 $ref: '#components/schemas/Comment'
   *       400:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             example:
   *               Comment: Internal server error
   *               error: Details about the error
   */

 
/** 
 * @swagger 
 * /comments/users/{id}:
 *   get:
 *     summary: Get comments by user Id / All comments made by user
 *     tags: [Comment]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the user
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#components/schemas/Comment'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Comment: Internal server error
 *               error: Details about the error
 */

  
 
/** 
 * @swagger 
 * /comments/blogs/{id}:
 *   get:
 *     summary: Get comments by Blog Id / All comments made on a blog
 *     tags: [Comment]
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
 *                 $ref: '#components/schemas/Comment'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Comment: Internal server error
 *               error: Details about the error
 */

  

/** 
 * @swagger 
 * /comments/delete/{id}:
 *   delete:
 *     summary: Delete a Comment
 *     tags: [Comment]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Comment to be deleted
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Comment: Internal server error
 *               error: Details about the error
 */


/** 
 * @swagger 
 * /comments/update/{id}:
 *   patch:
 *     summary: update a Comment
 *     tags: [Comment]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Comment to be updated
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
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Comment: Internal server error
 *               error: Details about the error
 */
