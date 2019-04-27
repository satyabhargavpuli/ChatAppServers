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
    generateToken(load) {
        const token = jwt.sign({ load }, 'secretkey', { expiresIn: '1d' }) 
        //here we can create tokens in two way s
        /* first by creating object
        const tokenObject = {
            success: true,
            message: "Token genearted successfully",
            token: token
         }*/
         /* assigning token directly
        return token; */
        // const tokenObject = {
        //     success: true,
        //     message: "Token genearted successfully",
        //     token: token
        // }
        return token;
    }
}