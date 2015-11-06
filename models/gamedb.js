var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({

    
        gameName: String,
        moderator: String,
        startTime: String,
        endTime: String,
        location: String,
        players: Array,
        targets: Array

    
})

module.exports = mongoose.model('Game', gameSchema);