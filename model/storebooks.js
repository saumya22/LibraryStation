var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var StoreBookSchema = new Schema ({
	username : {
		type: String,
		required: true
	},
	userId: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	publisher : {
		type: String,
		required: true
	},
	year : {
		type: String,
		required: true
	},
	price : {
		type: Number,
		required: true
	},
	created_at : Date
});

module.exports = mongoose.model('storebooks', StoreBookSchema);