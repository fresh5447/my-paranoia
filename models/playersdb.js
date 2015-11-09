var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var playerSchema = new mongoose.Schema({
    
        handle: String,
        email: String,
        password: String,
        tag: Number,
        status: Boolean,
        pic: String
    
});

// generating a hash
playerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
playerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Player', playerSchema);