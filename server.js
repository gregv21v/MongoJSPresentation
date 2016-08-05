// include the node library
const mongojs = require('mongojs');


// access the database
// You can also run a database locally if you want to.
// The collection contains the monsters that you own.
var db = mongojs('mongodb://default:password@ds139985.mlab.com:39985/presentation', ['pokemon', 'playerData'])

var isStarted = false

db.playerData.findOne({name: "Gregory"}, function(err, doc) {
  isStarted = doc.started
})

// You start off with a basic pokemon.
// Insert a document into the database.
console.log("Adding Pokemon");
if(!isStarted) {
  db.pokemon.insert({name: "Pikachu", level: 1, type: "electric", maxHealth: 100, curHealth: 98, alive: true})
  db.pokemon.insert({name: "Raichu", level: 5, type: "electric", maxHealth: 100, curHealth: 100, alive: true})
  db.pokemon.insert({name: "Charmander", level: 2, type: "fire", maxHealth: 100, curHealth: 99, alive: true})

  db.playerData.update({name: "Gregory"}, {$set: {started: true}})
}



// Add a document to the database.
// Catch a monster
//db.pokemon.insert({name: "Pikachu", type: "electric", maxHealth: 100, curHealth: 98, alive: true})


// Remove a document from the database
// Release a pokemon
console.log("Removing Pokemon");
db.pokemon.remove({name: "Raichu"});


// Find all the documents in the database and show them
// Show all your pokemon
db.pokemon.find(function(err, docs) {
  for(var i = 0; i < docs.length; i++) {
    console.log("========>");
    console.log("\tName: " + docs[i].name);
    console.log("\tLevel: " + docs[i].level);
    console.log("\tType: " + docs[i].type);
    console.log("\tHealth: " + docs[i].maxHealth + "/" + docs[i].curHealth);
    console.log("\tAlive: " + docs[i].alive);
  }
})



// update a document in the database
// Level up a monster
db.pokemon.update({name: "Pikachu"}, {$inc: {level: 1}})
