
var Mongoose = require('mongoose');

//this is the database schema
var ImgSchema = new Mongoose.Schema({
	"image" : { type: String },
	"hashtag" : { type: String}
});

exports.Img = Mongoose.model('Img', ImgSchema);


