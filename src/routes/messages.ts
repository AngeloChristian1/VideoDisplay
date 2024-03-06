import express from 'express'

import { getAllMessages, addMessage, deleteMessage, updateMessage, getOneMessageById } from '../controllers/messages'
import { checkAdminship, isLoggedIn } from '../middlewares'
import { extractToken } from '../middlewares/jwt_config'

export default(router: express.Router)=>{
    router.post('/messages/add', addMessage)
    router.get('/messages',extractToken, isLoggedIn, checkAdminship, getAllMessages)
    router.get('/messages/:id',getOneMessageById )  
    router.delete('/messages/delete/:id',extractToken, isLoggedIn, checkAdminship,deleteMessage )
    router.patch('/messages/update/:id',updateMessage )
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
 *      Message:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Id provided by db
 *              name:
 *                  type: string
 *                  description: Id of Message
 *              phone:
 *                 type: string
 *                 description: Id of user
 *              email:
 *                 type: string
 *                 description: Id of user
 *              message:
 *                  type: string
 *                  description: Time created
 *              createdAt:
 *                  type: string
 *                  description: Time updated
 *              updatedAt:
 *                  type: string
 *                  description: Time updated
 *          example:
 *             id: 65e070808c4b09bb1f9b3ea 
 *             name: "Muheto Enock"
 *             email: "enockmuheto@gmail.com"
 *             phone: "0788888888"
 *             message: "Prompt engineering has emerged as one of the most impactful innovations."
 *             createdAt: "2024-03-04T12:05:17.227Z"
 *             updatedAt: "2024-03-04T12:05:17.227Z"
 *
 */




/**
 * @swagger
 * '/messages/add':
 *  post:
 *    summary: -Add a Message
 *    tags: [Message]
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
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *        description: You have successfully logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Message'
 *      500:
 *        description: internal server error
 *      
 */

  /**
   *
   * @swagger
   * '/messages':
   *   get:
   *     summary: Get All Message
   *     tags: [Message]
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
   *                 $ref: '#components/schemas/Message'
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
 * /messages/{id}:
 *   get:
 *     summary: Get one Message
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#components/schemas/Message'
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
 * /messages/delete/{id}:
 *   delete:
 *     summary: Delete a Message
 *     tags: [Message]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Message to be deleted
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
 *                 $ref: '#/components/schemas/Message'
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
 * /messages/update/{id}:
 *   patch:
 *     summary: update a Message
 *     tags: [Message]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the Message to be updated
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
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Details about the error
 */
