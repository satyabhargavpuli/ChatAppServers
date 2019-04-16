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



exports.registration = (req, res) => {

    //creating an empty object
    var respStatus = {};
    //creating a callback function : function (subject, callback) 
    // taking request from client ie: req
    service.registration(req.body, (error, result) => {
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
exports.login=(req,res) => {
    //creating an function object
    var respStatus = {};
    service.login(req.body, (error, result) => {
        // if the callback is good 
        if (result) {
            // verification purpose printing it to the terminal
            const payload = {
                id: result._id,
                email:result.email
            }
            const tokenObj = jwt.cookToken(payload);
            console.log("token in login:",tokenObj);
            respStatus.success = "login successful";
            respStatus.result = result;
            respStatus.token = tokenObj.token;
            // sending the response to the client along with the status code and result
            res.status(200).send(respStatus);
        }
        // if the callback is bad
        else {
            console.log("Login failed");
            respStatus.success = "Login unsuccessful";
            respStatus.error = error;
            // sending the response to the client along with the status code and result
            res.status(500).send(respStatus);
        }
    })
},
exports.forgotPassword = (req,res) => {
var respStatus = {};

service.forgotPassword(req.body,(error,result) => {
    if(result)
    {
        const payload = {
            //accessing the id in the result 
            user_id: result._id // user
        }
        console.log("result._id = ", result._id);
        console.log("payload = ", payload);
        const tokenObject = jwt.cookToken(payload)
        console.log("controller obj", tokenObject)
        const url = process.env.resetlink + `/` + `${tokenObject['token']}`
        responseStatus.success = "reset link for your password has been sent to your mail";
        respStatus.success = "forgotPassword sent sucessful";
        respStatus.result = result;
        res.status(200).send(respStatus)
    }
    else{
        console.log("forgot password failed");
        respStatus.success = "forgotPassword unsucessfull";
        respStatus.error=error;
        res.status(500).send(respStatus);
        
    }
})
},
exports.resetPassword = (req,res) => {
var respStatus = {};
service.resetPassword(req.body,(error,result)=>{
    if (result) {
        respStatus.success = "reset password sucessfull";
        respStatus.result = result;
        res.status(200).send(respStatus);
    }
    else{
        respStatus.success = "reset password unsucessfull";
        respStatus.error = error;
        res.status(500).send(respStatus);
    }
})
}
