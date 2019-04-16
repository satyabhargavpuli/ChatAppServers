/********************************************************************************************************
 * @description:
 * 
 * @file       : userService.js
 * 
 * @purpose    : Used for validation and getting data from routers
 * 
 * @author     : satyabhargav      <satyabhargav.puli@gmail.com>
 * 
 * @date       : 15/apr/2019
 * 
 * 
 * 
 ********************************************************************************************************/

const modal = require('../models/userModel');


module.exports = {
    //here from controller to service we are taking the client data as incontroller:body in service:data 
    registration(data, callback) {
        console.log(data);
        modal.registration(data, (error, result) => {
            if (error) {
                console.log("service error");
                callback(error)

            }
            else {
                console.log("service working sucessfully\n", result);
                callback(null, result);
            }
        })

    },

    login(data, callback) {
        modal.login(data, (error, result) => {
            if (error) {
                callback(error)
            }
            else {
                callback(null, result);

            }
        })

    },
    forgotPassword(data,callback) {
        modal.forgotPassword(data,(error,result) =>{
            if(error)
            {
                callback(error)
            }
            else{
                callback(null,result);
            }
    } )
    },
    resetPassword(data,callback) {
        modal.resetPassword(data,(error,result) =>{
            if(error)
            {
                callback(error);
            }
            else{
                callback(result);
            }
        })
    }


}