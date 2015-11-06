var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

var targetsRandomized = function(players){
	var result = [];
	game.targets = [];
	var remainingPlayers = players.slice();
	for (var i = 0; i < players.length; i++) {
		var index = Math.floor(Math.random()*remainingPlayers.length);
		//start up an array of all players in the game that are left to assign
		//pick someone randomly from the remainder
		var player = remainingPlayers[index];
		//assign said someone to the first person
		game.targets.push(player);
		//remove said someone from the remainder
		remainingPlayers.slice(index, 1);
	};
	return result;
};

router.route('/:id')


  .post(function(req, res) {

       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            

           if (err)
               res.send(err); 
           game.targets= targetsRandomized(game.players);
           game.save();
           res.render('completeGame.ejs', {game : game});
       });
   });

module.exports = router;