/******************************************************************************
 *  @Purpose        : To create a server to connect with front end and get the 
                     request and send response to client

 *  @file           : server.js 

 *  @author         : p satya bhargav    <satyabhargav.puli@gmail.com>
 
 *  @since          : 13-apr-2019
 ******************************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.conf');
const routes = require('./routes/router');
const chatController = require('./controllers/chatController')
// const dotenv = require('dotenv')
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const http = require('http');
// create express app
const app = express();
app.use(express.static('../client')),

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })),
    // parse requests of content-type - application/json
    app.use(bodyParser.json()),

    // Configuring the database
    //const dbConfig = require('./config/db.conf')
    mongoose.Promise = global.Promise,

    // Connecting to the database
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    }),
    app.use('/', routes);
// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. "});
// });

// listen for requests
const server = app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
//importing the socket io module and passing the port number
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('Socket io connected sucessfully');
    socket.on('createMessage', function (message) {
        chatController.addmessage(message, (err, data) => {
            if (err) {
                console.log("socket io ",err);
            }
            else {
                console.log("socket io message", message);
                io.emit('newMsg', message);
            }
        })

    })

    //when socket io is disconnected
    socket.on('disconnect', function () {
        console.log('Socket io disconnected');
    });
});

