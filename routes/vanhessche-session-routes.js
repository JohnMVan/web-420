// Title: vanhessche-session-routes.js
// Author: John Vanhessche
// Date: 21 November 2022
// Description:  vanhessche-session-routes.js File


//Routes
const express = require('express');
const router = express.Router();
const User = require('../models/vanhessche-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Signup
 *     name: signup
 *     summary: Signup
 *     requestBody:
 *       description: Signup information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User added to MongoDB
 *       '401':
 *         description: User is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/signup', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            console.log(user);
            if(!user) {

                let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                
                let newRegisteredUser = {
                    userName: req.body.userName,
                    password: hashedPassword,
                    emailAddress: req.body.emailAddress                    
                    };                    

                    User.create(newRegisteredUser, function(err, user) {
                        if (err) {
                            console.log(err);
                            res.status(501).send({
                                'message': `MongoDB Exception: ${err}`
                            })
                        } else {
                            console.log(user);
                            res.json(user);
                        }
                    })
            } else {
                console.log(user);
                res.status(401).send({
                    'message': `Username ${user} is already in use.`
                })
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
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - login
 *     name: Login with password
 *     summary: Verifies a login
 *     requestBody:
 *       description: Login information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '401':
 *         description: Invalid passId or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/login', async(req, res) => {
    try {
        // 1. Username field /password
        // 2. Lookup the user 
        //      2. b. Verify the password
        //      2. c. does the saved password match the entered password?
        // 3. if true give them access
        // 4. if false give them error message.

        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                if (user) {
                    
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                    
                    if (passwordIsValid) {
                        console.log('Password matches');
                        res.status(200).send({
                            'message': 'Password matches'
                        })
                    } else {
                        console.log('Password is incorrect');
                        res.status(401).send({
                            'message': `Invalid credentials, enter again`
                        })}
                } else {
                    console.log('Invalid user');
                    res.status(401).send({
                        'message': `Invalid credentials, enter again`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

module.exports = router;