import express from 'express'

import {deleteUser, getAllUsers, getOneUserById, getOneUserByToken, updateUser} from "../controllers/users"
import { isAuthenticated, isOwner, isAdmin, checkOwnership, checkAdminship } from '../middlewares'
import { extractToken } from '../middlewares/jwt_config'
import { changeUserPassword } from '../controllers/authentication'


export default(router: express.Router)=>{
    // router.get('/users',isAuthenticated, getAllUsers)
    router.get('/users',extractToken,checkAdminship, getAllUsers)
    router.get('/users/:id',extractToken, getOneUserById)
    router.get('/users/token/:id',extractToken, getOneUserByToken)
    router.patch('/users/update/:id',extractToken,isAuthenticated, checkOwnership, updateUser)
    router.patch('/users/changePassword/:id', extractToken,checkOwnership, changeUserPassword)
    router.delete('/users/delete/:id',extractToken,  deleteUser )
} 
  
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: name of user
 *         email:
 *           type: string
 *           description: Email of user
 *         phone:
 *           type: string
 *           description: Phone number of user
 *         password:
 *           type: string
 *           description: password of user   
 *       example:
 *         name: 'Ineza Paul'
 *         email: 'paul@gmail.com'
 *         phone: '0788888888'
 *         password: 'user123'
 */


// API configs

/** 
 * @swagger 
 * '/users':
 *   get:
 *     summary: Get All user
 *     tags: [User]
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
 *                 $ref: '#/components/schemas/User'
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
 * /users/{id}:
 *   get:
 *     summary: Get One user
 *     tags: [User]
 *     security:
 *      -bearerAuth: []
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
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
 *                 $ref: '#/components/schemas/User'
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
 * /users/update/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The id of the user 
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              email:
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
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               error: Details about the error
 */

