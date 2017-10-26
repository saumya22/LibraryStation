var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	username : {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email_id: {
		type: String,
		unique: true,
		required: true
	},
	firstname : {
		type: String,
		required: true
	},
	lastname : {
		type: String,
		required: true
	},
	cart:[
      {
        id : String,
        title : String,
        price: Number
      }
    ],
    itemsBought: {
    	type: Array
    },
    followers: {
    	type: Array
    },
    following: {
    	type: Array
    },
	created_at : Date
});

UserSchema.pre('save', function(callback) {
	var user = this;

	if(!user.isModified('password')) return callback();

	bcrypt.genSalt(5, function(err, salt) {
		if(err) return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) return callback(err);

			user.password = hash;
			callback();
		});
	});
});

UserSchema.methods.verifyPassword = function(password, cb) {
	console.log("heelo hoo r ju")
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('users', UserSchema);