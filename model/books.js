var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var BookSchema = new Schema ({
	
	title : {
		type: String,
		required: true
	},
	ISBN : {
		type: String,
		required: true
	},
	details: {
		type: Schema.Types.Mixed,
		required: true
	},
	username : {
		type: String,
		required: true
	},
	created_at : Date
});


module.exports = mongoose.model('books', BookSchema);