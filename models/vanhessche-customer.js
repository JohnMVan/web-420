// Title: customer.js
// Author: John Vanhessche
// Date: 30 November 2022
// Description:  vanhessche-customer.js File


//Routes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//type checking for line items for array on invoiceSchema
let lineItemSchema = new Schema({
    name: {type: String},
    price: {type: Number},
    quantity: {type: Number} 
});

//type checking for invoices array on customerSchema
let invoiceSchema = new Schema({
    subtotal: {type: Number},
    tax: {type: Number},
    dateCreated: {type: String},
    dateShipped: {type: String},
    lineItems: [lineItemSchema]
});

let customerSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String},
    invoices: [invoiceSchema]    
});

//exporting schema as Customer.
module.exports = mongoose.model('Customer', customerSchema);









