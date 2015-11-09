var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/')

 .get(function(req, res) {
   mongoose.model('Player').find({}, function(err, players){
     if(err){
       return console.log(err);
     } else {
      res.send(players)
     }
   });
 })

 .post(function(req, res){
   var handle = req.body.handle;
   var email = req.body.email;
   var status = req.body.status;
   var target = req.body.target;
   var deceased = req.body.deceased;
   var pic = req.body.pic;

   mongoose.model('Player').create({
     handle: handle,
     status: status,
     deceased: deceased,
     target: target,
     pic: pic

   }, function(err, player){
     if(err){
       res.redirect("/completeProfile")

     } else{
       console.log("New Agent named " + player + "created!");
       res.render('profile.ejs', {player: player, user: req.user});
       
     }
   });
 });


 router.route('/:id')


   .get(function(req, res) {
       mongoose.model('Player').findById({
           _id: req.params.id
       }, function(err, player) {
           if (err)
               res.send(err);

           res.json(player);
       });
   })

   
   .put(function(req, res) {

            var handle = req.body.handle;
            var status = req.body.status;
            var deceased = req.body.deceased;
            var target = req.body.target;
            var pic = req.body.pic;

       mongoose.model('Player').findById({
           _id: req.params.id
       }, function(err, player) {
            

           if (err)
               res.send(err);
              
            player.handle = handle;
            player.email= email;
            player.password = password;
            player.status = status;
            player.deceased = deceased;
            player.target = target;
            player.pic = pic;

           player.save();
           res.json(player);
       });
   })
   

   .delete(function(req, res) {
       mongoose.model('Player').remove({
           _id: req.params.id
       }, function(err, player) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router; 