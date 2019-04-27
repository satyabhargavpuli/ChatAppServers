/********************************************************************************************************
 * @description:
 * 
 * @purpose    : Used for validation and getting data from routers
 * 
 * @author     : satyabhargav      <satyabhargav.puli@gmail.com>
 * 
 * @date       : 11/apr/2019
 * 
 * 
 * 
 ********************************************************************************************************/


const service = require('../services/userService');
const jwt = require('../util/tokenGenerate');
console.log("in  controller");
const mail = require('../middleware/nodeMailer');

exports.registration = (req, res) => {
    console.log("in registration controller");

    //creating an empty object
    var respStatus = {};
    //creating a callback function : function (subject, callback) 
    // taking request from client ie: req
    service.registration(req.body, (error,result) => {
        if (result) {
            respStatus.success = "registration successful";
            respStatus.result = result;
            res.status(200).send(respStatus);
        }
        //if the method returns an error as a callback 
        else {
            respStatus.sucess = "registration unsucessfull";
            respStatus.error = error;
            res.status(500).send(respStatus);

        }
    });
}
/**
 * @purpose : login
 */
exports.login = (req, res) => {
    //creating an function object
    console.log("in userController");
    
    var respStatus = {};
    console.log("<><><><><><><><>", req.body);

    service.login(req.body, (error ,result) => {
        // if the callback is good 
        console.log("result     ", result);
        
        
        if (result) {
            // verification purpose printing it to the terminal
            var load = {
                // id: result._id,
                email: result.email
            }
            var mytoken = jwt.generateToken(load);
            console.log("token in login:", mytoken);
            respStatus.success = "login successful";
            respStatus.result = result;
            respStatus.token = mytoken;
            console.log("user controller result  ", result);
            
            // sending the response to the client along with the status code and result
            res.status(200).send(respStatus);
        }
        // if the callback is bad
        else {
            console.log("Login failed");
            respStatus.success = "Login unsuccessful";
            respStatus.error = error;
            console.log("user controller error ", error);
            
            // sending the response to the client along with the status code and result
            res.status(500).send(respStatus);
        }
    })
},
    exports.forgotPassword = (req, res) => {
        var respStatus = {};

        service.forgotPassword(req.body, (result, error) => {
            if (result) {
                const load = {
                    id: result._id,
                    email: result.email
                    // user
                }
                console.log("result._id = ", result._id);
                console.log("load = ", load);
                const mytoken = jwt.generateToken(load);
                console.log("controller obj", mytoken)
                // const url = process.env.resetlink + `/` + `${mytoken['token']}`
                mail.sendEMailFunction(mytoken, load);
                respStatus.success = "reset link for your password has been sent to your mail";
                respStatus.success = "forgotPassword sent sucessful";
                respStatus.result = result;
                respStatus.token = mytoken;
                res.status(200).send(respStatus)
            }
            else {
                console.log("forgot password failed");
                respStatus.success = "forgotPassword unsucessfull";
                respStatus.error = error;
                res.status(500).send(respStatus);

            }
        })
    },
    exports.resetPassword = (req, res) => {
        var respStatus = {};
        service.resetPassword(req.body, (result, error) => {
            if (result) {
                respStatus.success = "reset password sucessfull";
                respStatus.result = result;
                res.status(200).send(respStatus);
            }
            else {
                respStatus.success = "reset password unsucessfull";
                respStatus.error = error;
                res.status(500).send(respStatus);
            }
        })
    },
    exports.getUserDB = (req, res) => {
        var respStatus = {};
        service.getUserDB(req.body, (result, error) => {
            if (result) {
                respStatus.success = "getting all users from db";
                respStatus.result = result;
                res.status(200).send(respStatus);
            }
            else {
                respStatus.success = "could not get the users from db";
                respStatus.error = error;
                res.status(500).send(respStatus);
            }
        })
    }
