// Title: vanhessche-user.js
// Author: John Vanhessche
// Date: 21 November 2022
// Description:  vanhessche-user.js File


//Routes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//new schema for user
let userSchema = new Schema({
    userName: {type: String},
    password: {type: String},
    emailAddress: []
});

//exporting User schema
module.exports = mongoose.model('User', userSchema);