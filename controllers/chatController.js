/********************************************************************************************************
 * @description:
 * 
 * @purpose    : Used for validation and getting data from routers
 * 
 * @author     : satyabhargav      <satyabhargav.puli@gmail.com>
 * 
 * @date       : 20/apr/2019
 * 
 ********************************************************************************************************/

const chatService = require('../services/chatService');
module.exports = {  

    addmessage(req, res) {
        console.log(req);
        try {
            chatService.addmessage(req, (error, data) => {
                if (error) {
                    res(error);
                }
                else {
                    console.log("controller is working fine");
                    res(null, data);
                }
            })
        } catch (error) {
            console.error("controller:", error);

        }
    },

    getUserMsg(req, res) {
    //   try {
            console.log("controller:getUserMsg");
            chatService.getUserMsg(req.body, (error, data) => {
                var response = {}
                if (error) {
                    response.success = "failed to get the messages";
                    response.error = error;
                    res.status(500).send(response);
                }
                else {

                    response.success = true;
                    response.result = data;
                    res.status(200).send(response);
                }
            });
        },
        // catch {
            // console.error("controller:", error);         
            //    console.log("why error",error);
            
        // }
  //  }
}