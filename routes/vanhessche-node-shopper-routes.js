// Title: node-shopper-routes.js
// Author: John Vanhessche
// Date: 30 November 2022
// Description:  vanhessche-node-shopper-routes.js File

//Routes
const express = require('express');
const router = express.Router();
const Customer = require('../models/vanhessche-customer');



/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *                                    
 *     responses:
 *       '200':
 *         description: Person added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

        await Customer.create(newCustomer, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Invoices
 *     name: createInvoiceByUserName
 *     summary: Creates a new Invoice document
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: userName 
 *         schema: 
 *           type: string 
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string                                    
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number                              
 *     responses:
 *       '200':
 *         description: Person added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/customers/:userName/invoices', async(req, res) => {
    try {        

        //find user name, if not found return 500.  
        //If found return user object to customer call back name.
        //create a newInvoice object (fill in subtotal, tax, dateCreated, dateShipped, and 
        //complete the lineItems array).          
        //save the newInvoice object to the customer.invoices array using the push method.
        //Save customer using the save function. 

        Customer.findOne({userName: req.params.userName}, function(err, customer) {

            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);  
                
                const newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: req.body.lineItems
                };

                customer.invoices.push(newInvoice); 
                
                customer.save(function(err, savedCustomer) {
                   if (err) {
                    console.log(err);
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    })
                   } else {
                    console.log(savedCustomer);
                    res.json(savedCustomer);
                   }
                })

            }
        });        
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Invoices
 *     description:  API for returning all invoices by user name
 *     summary: returns a invoices document
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: find invoices by user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Fruit document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.get('/customers/:userName/invoices', async(req, res) => {
    try {

        //Find the customer by their user name.
        //This returns the object to the customer call back name.
        //Once found, return the invoices assigned to that user in the invoices array (customer.invoices)

        Customer.findOne({userName: req.params.userName}, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer.invoices);
                res.json(customer.invoices);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


module.exports = router;