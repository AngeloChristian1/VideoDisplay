import express from 'express'

import {register, login} from '../controllers/authentication'

export default (router: express.Router)=>{
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}

/**
 * @swagger
 * '/welcome'
 *  get:
 *      summary:-API for testing server
 *      description: Welcome API
 *      response:
 *          200:
 *              description: To test get method
 * 
 */
 

/**
* @swagger
* /auth/register:
*  post:
*    summary: -REGISTER USER
*    tags: [AUTHENTICATION]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#components/schemas/User'
*    responses:
*      200:
*        description: You have successfully signed up
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/User'
*      500:
*        description: internal server error
*
*/

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: -USER LOGIN 
 *    tags: [AUTHENTICATION]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: You have successfully logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      500:
 *        description: internal server error
 *      
 */


/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: -USER-LOGIN
 *    tags: [AUTHENTICATION]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: You have successfully logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      500:
 *        description: internal server error
 *      
 */