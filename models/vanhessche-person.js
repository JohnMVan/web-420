// Title: vanhessche-person.js
// Author: John Vanhessche
// Date: 20 November 2022
// Description:  vanhessche-person.js File


//Routes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//role schema
let roleSchema = new Schema({
    text: {type: String}
});

// dependent schema
let dependentSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
})

//person schema
let personSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
})

//exporting schema as Person.
module.exports = mongoose.model('Person', personSchema);
