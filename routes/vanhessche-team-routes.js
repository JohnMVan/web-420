// Title: vanhessche-team-routes.js
// Author: John Vanhessche
// Date: 12 December 2022
// Description:  vanhessche-team-routes.js File

//Routes
const express = require('express');
const router = express.Router();
const Team = require('../models/vanhessche-team');

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of Teams objects.
 *     summary: returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: Array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/teams', async(req, res) => {    
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })    
            } else {                
                console.log(teams);
                res.json(teams);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});


/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{teamId}/players:
 *   post:
 *     tags:
 *       - Players
 *     name: assignPlayerToTeam
 *     summary: Assign Player to Team
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: teamId 
 *         schema: 
 *           type: string 
 *     requestBody:
 *       description: Player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary     
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number               
 *     responses:
 *       '200':
 *         description: Player added to MongoDB Atlas
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/teams/:teamId/players', async(req, res) => {
    try {

        Team.findOne({teamId: req.params.teamId}, function(err, team) {

            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);  
                
                const newPlayer = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    salary: req.body.salary
                };
                
                team.players.push(newPlayer); 
                
                team.save(function(err, savedTeam) {
                   if (err) {
                    console.log(err);
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    })
                   } else {
                    console.log(savedTeam);
                    res.json(savedTeam);
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{teamId}/players:
 *   get:
 *     tags:
 *       - Players
 *     description:  API for returning all players by teamId
 *     summary: returns a team document
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: find players by teamId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/teams/:teamId/players', async(req, res) => {
    try {

        //Find the team by their teamId.
        //This returns the object to the team call back name.
        //Once found, return the players assigned to that team in the players array (team.players)

        Team.findOne({teamId: req.params.teamId}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team.players);
                res.json(team.players);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{teamId}:
 *   delete:
 *     tags:
 *       - teams
 *     name: deleteTeamById
 *     description: API for deleting a team document from MongoDB.
 *     summary: Removes a team document from MongoDB.
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: Id of the team document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/teams/:id', async (req, res) => {
    try {
        const id = req.params.id;

        Team.findByIdAndDelete({'_id': id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
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
