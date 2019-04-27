/*********************************************************************************************************
 * @purpose         : used for storing the data by using schema to the database and retrieving them 
 * 
 * @file            : userModel.js
 * 
 * @author          : p satya bhargav         <satyabhargav.puli@gmail.com>
 * 
 * @since           : 13-apr-2019
  *********************************************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// initializing the Schema class and passing the object into the constructor
const schema = new mongoose.Schema({
    username: {
        type: String, require: [true, "username require"]
    },
    
    email: {
        type: String, require: [true, "email require"]
    },
    password: {
        type: String, require: [true, "password require"]
    }
},
    {
        timestamps: false
    });
function userModel() { }
var user = mongoose.model('user', schema);
//here user in 'user' defines the table name in mongodb
//To encrypt password 

function encrypt(password) {
    var hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    return hash;
}

userModel.prototype.registration = (body, callback) => {
    console.log("register data in model -->", body);

    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            console.log("registration error");
            callback(err)
        }
        else if (data.length > 0) {
            console.log("Email already exists");
            callback("Email exists");
        }
        else {
            //creating a json object            
            const obj = {
                "username": body.username,
                 "email": body.email,
                "password": encrypt(body.password)
                //"password": bcrypt.hashSync(body.password, 10) we can also use this variable
            }
            //passing the json object into mongodb
            const newUser = new user(obj);
            //saving into the database by calling the method
            newUser.save((err, result) => {
                if (result) {
                    console.log("register successful")
                    callback(null, result)
                }
                else {
                    console.log("failed to dump in database");
                    callback(err);
                }
            });
        }
    })
},
    userModel.prototype.login = (body, callback) => {
        //fetching the data with the user email from the database
        
        console.log("------------>", body);

        user.findOne({ "email": body.email }, (err, dbData) => {
            if (err) {
                callback(err)
                console.log("error userModel  ", err);
                console.log("---------",dbData)
                
            }
            else if (dbData != null) {
                bcrypt.compare(body.password, dbData.password).then(function (result) {
                    if (result) {
                        console.log("Login Successful");
                        callback(null, dbData);
                    }
                    else {
                        console.log("incorrect password");
                        callback("Incorrect password")
                    }
                });
            }
            else {
                callback("Invalid user")
            }
        })
    },
    userModel.prototype.forgotPassword = (body, callback) => {
        console.log("------------>", body);
        user.findOne({ "email": body.email }, (err, data) => {
            if (err) {
                callback(err);
            }
            else {

                if (data != null && data.email == body.email) {
                    callback(null, data)
                }
                else {
                    console.log("please check the entered email id");
                    callback("please enter a valid email id")
                }
            }
        })

    },
    
    

    userModel.prototype.resetPassword = (req, callback) => {
        console.log("========",req);
            const newPsw = encrypt(req.body.password)

          //     user.auth("app_user", "somepassword")
// user.addUser("app_user", "new password")
//db.changeUserPassword("app_user", "new password")
// i have used this method for reseting the password (db.updateUser("root", {pwd: "NewRootAdmin" }) 

    user.updateOne({ _id: req.userinfo.payload.id }, { password: newPsw }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {

            callback(null, result);
        }
    });
    }

    userModel.prototype.getUserDB=(req,callback) => {
    console.log("::::::::",req);
    user.find({},(err,result)=>{

        if(err){
            callback(err);
         }
         else {
             callback(null,result);
             console.log('!!!!!!!!',result);
             
         }
    })




    }


module.exports = new userModel();

