var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

//url/api/blogs
// /api/playerRoutes/
router.route('/')

/* GET All Blogs */
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
  
   var status = req.body.status;
   var target = req.body.target;
   var deceased = req.body.deceased;
   var pic = req.body.pic;

   mongoose.model('Player').create({
     handle: handle,
     pic: pic,
     status: status,
     target: target,
     deceased: deceased

   }, function(err, player){
     if(err){
       res.redirect("/completeProfile")

     } else{
       console.log("New Agent named " + player + "created!");
       res.redirect('/profile');
       
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
            var pic = req.body.pic;
            var status = req.body.status;
            var target = req.body.target;
            var deceased = req.body.deceased;

       mongoose.model('Player').findById({
           _id: req.params.id
       }, function(err, player) {
            

           if (err)
               res.send(err);
              
            player.handle = handle;
            player.email= email;
            player.password = password;
            player.status = status;
            player.target = target;
            player.deceased = deceased;
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