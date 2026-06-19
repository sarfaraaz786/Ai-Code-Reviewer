const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
/**
 * @route POST /auth/register
 * @description Register a new User
 * @access Public
 */
authRouter.post('/register',authController.resgisterUserController);


/**
 * @route POST /auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post('/login',authController.loginUserController);


/**
 * @route GET /auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get('/logout',authController.logoutUserController);


/**
 * @route GET /auth/get-me
 * @description get the current logged in user details
 * @access private 
 */
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController);

module.exports = authRouter;