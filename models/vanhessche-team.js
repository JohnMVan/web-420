// Title: vanhessche-team.js
// Author: John Vanhessche
// Date: 12 December 2022
// Description:  vanhessche-team.js File

//Routes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//player schema, used in players[] on teamSchema
let playerSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    salary: {type: Number}
})

//Team schema
let teamSchema = new Schema({
    name: {type: String},
    mascot: {type: String},
    players: [playerSchema],
    teamId: {type: String}    
}, { collection: 'team'})

//exporting schema as Team.
module.exports = mongoose.model('Team', teamSchema);