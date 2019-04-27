/*********************************************************************************************
 * @purpose         : used for storing the data by using schema to the database and retrieving them 
 * 
 * @file            : userModel.js
 * 
 * @author          : p satya bhargav         <satyabhargav.puli@gmail.com>
 * 
 * @since           : 20-apr-2019
  ********************************************************************************************/

  const mongoose = require('mongoose');


  const schema = new mongoose.Schema({
 
    sendUserId : {
        type : String
       },
       sendUserName : {
           type : String
       },
       getUserId : {
           type : String
       },
       getUSerName : {
           type : String
       },
    }, 
    {
        timestamps: true,
        // autoIndexId: false
    });

 

  function chatModel (){}
  //creating a collection in the data base named chat
var chat = mongoose.model('chat',schema);

  chatModel.prototype.addMessage = (data, callback) => {
    let msg = new chat({
        'senderUserId': data.senderUserId,
        'senderName': data.senderName,
        'recieverUserId': data.recieverUserId,
        'recieverName': data.recieverName,
        'message': data.message
    })

    msg.save((error, data) => {
        if (error) {
            console.log("Failed to push data in database");
            return callback(error);
        }
        else {
            console.log("msg saved successfully");
            return callback(null, data);
        }
    })
}

chatModel.prototype.getUserMsg = (req, callback) => {
    chat.find({}, (error, data) => {
        if (error) {
            return callback("error in chat model" + error);
        }
        else {
            console.log("all messages: ", data);
            return callback(null, data);
        }
    })
}
module.exports = new chatModel();