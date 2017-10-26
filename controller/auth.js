var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/users');
var BearerStrategy = require('passport-http-bearer').Strategy;



passport.use(new BasicStrategy(

	function(username, password, callback) {
		console.log("heelo hoo r ju")

		User.findOne({ username: username }, function (err, user) {
console.log("user ::: " + username);
			//No user found with that username
			if(!user) { return callback(null, false); }

			//Make sure the passport is correct
			user.verifyPassword(password, function(err, isMatch) {
				if(err) { return callback(err); }

				//Password did not match
				if(!isMatch) { return callback(null, false); }

				//Success
				return callback(null, user);
			});
		});
	}

));

passport.use('client-basic', new BasicStrategy(
	function(username, password, callback) {
		Client.findOne({ id:username }, function (err, client) {
			if(err) { return callback(err); }

			//No client found with that id or bad password
			if(!client || client.secret !== passowrd) { return callback(null, false); }

			//Success
			console.log("success is success");
			return callback(null, client);
		});
	}
));


passport.use(new BearerStrategy(
	function(accessToken, callback) {
		Token.findOne({ value: accessToken }, function (err, token) {
			if(err) { return callback(err); }

			//No token found
			if (!token) { return callback(null, false); }

			User.findOne({ _id: token.userId }, function (err, user) {
				if(err) { return callback(err); }

			//No user found
            if (!user) { return callback(null, false); }

            //Simple example with no scope
            callback(null, user, { scope: '*' });
			});
		});
	}
));

passport.use(new LocalStrategy(
	function(username, password, callback) {
						console.log("username is ::: " + username);
		User.findOne({ user_name: username }, function (err, user) {
			if(err) { return callback(err); }

			//No User with that username
			if(!user) { return callback(null, false); }

			//Make sure the password is correct
			user.verifyPassword(password, function(err, isMatch) {
				if (err) { return callback(err); }

				//Password did not match
				if(!isMatch) { return callback(null, false); }

				//Success
				console.log("local is sucess");
				return callback(null, user);
			});
		});
	}
));

passport.serializeUser(function(user, done) {
        done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
        done(null, user);
});


exports.isAuthenticated = passport.authenticate(['local', 'basic', 'bearer'], { session : false });