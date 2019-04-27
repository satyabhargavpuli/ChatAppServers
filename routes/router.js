/*********************************************************************************************
 * @purpose         : It is used for navigating from front end to backend by using these routers
 * 
 *  @file           : router.js 
 * 
 * @author          : p satya bhargav      <satyabhargav.puli@gmail.com>
 * 
 * @since           : 11-apr-2019

  ********************************************************************************************/
const express = require('express');
const control = require('../controllers/userController');
const auth = require('../middleware/authentication');
const chatControl= require('../controllers/chatController');
const router = express.Router();
console.log("in router");

router.post('/register', control.registration);
router.post('/serviceLogin', control.login);
router.post('/forgotPwdService', control.forgotPassword);
router.post('/resetPassword',control.resetPassword);
router.get('/getUsers/:token',auth.authentication,control.getUserDB);//getting all users from db
router.get('/getUserMsg/:token',auth.authentication,chatControl.getUserMsg);

module.exports = router;


