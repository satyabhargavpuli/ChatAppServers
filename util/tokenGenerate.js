/*********************************************************************************************
 * 
 *  @Purpose        : this is used for generating tokens
 * 
 *  @file           : tokenGenerate.js 
 * 
 * @author          :     p satya bhargav              <satyabhargav.puli@gmail.com>

 *  @since          : 13-apr-2019
 
  ********************************************************************************************/
const jwt = require('jsonwebtoken')
module.exports = {
    cookToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn: '1d' }) 
        //here we can create tokens in two ways
        /* first by creating object
        const tokenObject = {
            success: true,
            message: "Token genearted successfully",
            token: token
         }*/
         /* assigning token directly
        return token; */
        const tokenObject = {
            success: true,
            message: "Token genearted successfully",
            token: token
        }
        return tokenObject;
    }
}