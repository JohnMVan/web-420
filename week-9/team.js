/**
	Title: team.js
    Authors: John Vanhessche
    Date: 12 December 2022
    Description: MongoDB Shell Scripts for the team collections.
 */


//Drop team and player collections
db.team.drop()
db.player.drop()

//Create new team collection
db.createCollection("team",
 {
    validator: { $jsonSchema: {
        bsonType: "object",
        
        properties: {
            name: {
                bsonType: "string"
            },
             
            mascot: {
                bsonType: "string"
            },
             
            players: {
                bsonType: "array"
            },
            
            teamId: {
                bsonType: "string"
            }
        }
    }}
})

//Create new player collection
db.createCollection("player",
 {
    validator: { $jsonSchema: {
        bsonType: "object",
        
        properties: {
            firstName: {
                bsonType: "string"
            },
             
            lastName: {
                bsonType: "string"
            },
             
            salary: {
                bsonType: "number"
            }
        }
    }}
})


//a collection of team objects
team0 = {
    "name": "Blue Bombers",
    "mascot": "bomb",
    "players": [],
    "teamId": "t001"
}

team1 = {
    "name": "Red Devils",
    "mascot": "devil",
    "players": [],
    "teamId": "t002"
}

team2 = {
    "name": "White Angels",
    "mascot": "angel",
    "players": [],
    "teamId": "t003"
}

//a collection of insert statements to populate team collection
db.team.insertOne(team0)
db.team.insertOne(team1)
db.team.insertOne(team2)


//a collection of player objects
player0 = {
    "firstName": "William",
    "lastName": "Bluebeard",
    "salary": 15000
}

player1 = {
    "firstName": "Mary",
    "lastName": "Bluebeard",
    "salary": 16000
}

player2 = {
    "firstName": "Bob",
    "lastName": "Redsville",
    "salary": 17000
}

player3 = {
    "firstName": "Eileen",
    "lastName": "Redsville",
    "salary": 18000
}

player4 = {
    "firstName": "Pat",
    "lastName": "White",
    "salary": 19000
}

player5 = {
    "firstName": "Chris",
    "lastName": "White",
    "salary": 20000
}

//a collection of insert statements to populate player collection
db.player.insertOne(player0)
db.player.insertOne(player1)
db.player.insertOne(player2)
db.player.insertOne(player3)
db.player.insertOne(player4)
db.player.insertOne(player5)