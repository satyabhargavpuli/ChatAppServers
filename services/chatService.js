const chatModel = require('../models/chatModel')

module.exports = {
    addmessage(data, callback){
        chatModel.addMessage(data, (error, result) => {
            if(error){
                console.log("service error:addMessage");
                callback(error)
            }
            else{
                console.log("service: addMessage successful");
                callback(null, result);
            }
        })
    },

    getUserMsg(data, callback){
        chatModel.getUserMsg(data, (error, result)=>{
            if(error){
                callback(error);
            }
            else{
                callback(null, result);
            }
        })
    }
}