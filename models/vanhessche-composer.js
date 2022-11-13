// Title: composer.js
// Author: John Vanhessche
// Date: 13 November 2022
// Description:  vanhessche-composer.js File


//Routes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let composerSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
});

//exporting schema as Composer.
module.exports = mongoose.model('Composer', composerSchema);









