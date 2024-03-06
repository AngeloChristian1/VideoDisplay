import express from 'express'

import {getLikesByBlogId,getLikesByUserId, getAllLikes, addLike, deleteLike, updateLike, getOneLikeById } from '../controllers/likes'

export default(router: express.Router)=>{
    router.post('/likes/add', addLike)
    router.get('/likes', getAllLikes)
    router.get('/likes/:id',getOneLikeById )  
    router.get('/likes/users/:id',getLikesByUserId )  
    router.get('/likes/blogs/:id',getLikesByBlogId )  
    router.delete('/likes/delete/:id',deleteLike )
    router.patch('/likes/update/:id',updateLike )
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
 *      Like:
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
 *              isLiked:
 *                 type: boolean
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
 *             isLiked: true
 *             userId: "65e05476cf3ae7f4a1d49549"
 *             createdAt: "2024-03-04T12:05:17.227Z"
 *             updatedAt: "2024-03-04T12:05:17.227Z"
 *
 */


/**
 * @swagger
 * '/likes/add':
 *  post:
 *    summary: -Add a Like
 *    tags: [Like]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              blogId:
 *                type: string
 *              isLiked:
 *                type: boolean
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *        description: You have successfully logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Like'
 *      500:
 *        description: internal server error
 *      
 */

  /**
   *
   * @swagger
   * '/likes':
   *   get:
   *     summary: Get All Like
   *     tags: [Like]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#components/schemas/Like'
   *       400:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             example:
   *               Like: Internal server error
   *               error: Details about the error
   */

 
/** 
 * @swagger 
 * /likes/users/{id}:
 *   get:
 *     summary: Get Likes by user Id / All likes made by user
 *     tags: [Like]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#components/schemas/Like'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Like: Internal server error
 *               error: Details about the error
 */

  
 
/** 
 * @swagger 
 * /likes/blogs/{id}:
 *   get:
 *     summary: Get Likes by Blog Id / All likes made on a blog
 *     tags: [Like]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the blog
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#components/schemas/Like'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Like: Internal server error
 *               error: Details about the error
 */

  

/** 
 * @swagger 
 * /likes/delete/{id}:
 *   delete:
 *     summary: Delete a Like
 *     tags: [Like]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Like to be deleted
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Like: Internal server error
 *               error: Details about the error
 */


/** 
 * @swagger 
 * /likes/update/{id}:
 *   patch:
 *     summary: update a Like
 *     tags: [Like]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Like to be updated
 *     security:
 *       - bearerAuth: []
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
 *                 $ref: '#/components/schemas/Like'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               Like: Internal server error
 *               error: Details about the error
 */
