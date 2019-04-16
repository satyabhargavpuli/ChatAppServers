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
const mid
const router = express.Router();
router.post('/register', control.registration);
router.post('/login', control.login);
router.post('/forgotPassword', control.forgotPassword);
router.post('/resetPassword',control.resetPassword);

module.exports = router;