/*
==================================================
; Title: Assignment 1.2
; Author:  John Vanhessche
; Date: 23 October 2022
; Modified By: John Vanhessche
; Description:  WEB 420 project setup
==================================================
*/

//Require Statements
const express = require('express');     //Added during Assignment 1.2
const http = require('http');     //Added during Assignment 1.2
const swaggerUI = require('swagger-ui-express');     //Added during Assignment 1.2
const swaggerJsdoc = require('swagger-jsdoc');     //Added during Assignment 1.2
const mongoose = require('mongoose');     //Added during Assignment 1.2
const composerApi = require('./routes/vanhessche-composer-routes');
const personApi = require('./routes/vanhessche-person-routes');
const userApi = require('./routes/vanhessche-session-routes');
const customerApi = require('./routes/vanhessche-node-shopper-routes');
const teamApi = require('./routes/vanhessche-team-routes');

//Variables
const app = express();     //Added during Assignment 1.2
 
//Port Setting
const PORT = process.env.PORT || 3000;      //Added during Assignment 1.2

//JSON settings
app.use(express.json());     //Added during Assignment 1.2

//URL settings
app.use(express.urlencoded({'extended': true}));       //Added during Assignment 1.2

//mongoose
const conn = `mongodb+srv://web420_user:s3cret@bellevueuniversity.ouotidt.mongodb.net/web420DB?retryWrites=true&w=majority`;

mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})


//openAPI and Swagger settings
const options = {                                //Added during Assignment 1.2
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
}; 

const openapiSpecification = swaggerJsdoc(options);      //Added during Assignment 1.2

//using apis
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));     //Added during Assignment 1.2
app.use('/api', composerApi);
app.use('/api', personApi);
app.use('/api', userApi);
app.use('/api', customerApi);
app.use('/api', teamApi);

app.get('/', async(req, res) => {
    res.redirect('/api-docs');
})

//Creating new http server
http.createServer(app).listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}`);        //Added during Assignment 1.2
});

