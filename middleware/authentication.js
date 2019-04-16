/****************************************************************************************************
 
 * @description:it is used for generating tokens
 * 
 * @file       :  authentication.js
 *  
 * @author     : satyabhargav    <satyabhargav.puli@gmail.com>
 * 
 *@since       :  15-apr-2019
 ********************************************************************************************************/

const jwt = require('jsonwebtoken')
exports.authentication = (req, res, next) => {
    var token = req.headers['token']
        
    if (token != null) {
        jwt.verify(token,  'secretkey', (error, result) => {
            
            if (error) {  
                res.status(108).send({
                    success: false,
                    message: 'Bad Token'
                })  
            }
            else {
                req.userinfo = result;
                console.log("authentication successful",result);
                next();
            }
        })
    }
    else {
        res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}