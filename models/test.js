var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , stories : [{ type: Schema.ObjectId, ref: 'Story' }]
});

var StorySchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Person' }
  , title    : String
  , fans     : [{ type: Schema.ObjectId, ref: 'Person' }]
});

var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);


var aaron = new Person({ name: 'Aaron', age: 100 });

aaron.save(function (err) {
  if (err) console.log(err)

  var story1 = new Story({
      title: "A man who cooked Nintendo"
    , _creator: aaron._id
  });
aaron.stories.push(story1);
aaron.save();

  story1.save(function (err) {
    if (err) console.log(err)
  });
})

Story
	.findOne({ title: /Nintendo/i })
	.populate('_creator') // <--
	.exec(function (err, story) {
	  if (err) console.log(err)
	  console.log('The creator is %s', story._creator.name);
	  // prints "The creator is Aaron"
	})



Person
.findOne({ name: 'Aaron' })
.populate('stories') // <-- only works if you pushed refs to children
.exec(function (err, person) {
  if (err) console.log(err)

  console.log('JSON for person is: ', person);
});

console.log(aaron)