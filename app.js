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

//Variables
const app = express();     //Added during Assignment 1.2
 
//Port Setting
const PORT = process.env.PORT || 3000;      //Added during Assignment 1.2

//JSON settings
app.use(express.json());     //Added during Assignment 1.2

//URL settings
app.use(express.urlencoded({'extended': true}));       //Added during Assignment 1.2

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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));     //Added during Assignment 1.2

//Creating new http server
http.createServer(app).listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}`);        //Added during Assignment 1.2
});

