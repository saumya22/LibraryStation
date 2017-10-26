var Users = require('../model/users.js');
var StoreBooks = require('../model/storebooks.js');


exports.postUsers = function(req, res) {
	var user = new Users();

	console.log("req body ::: " + req.body.username)
	user.username = req.body.username;
	user.password = req.body.password;
	user.email_id = req.body.email;
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.created_at = Date.now();

	user.save(function(err) {
		if (err) { handleError(res, err); return; }
		res.status(200).json({message: 'Library User profile successfully created!', data: user});
		
	});
};

exports.getUsers = function(req, res) {
	console.log("hello how r u");
	Users.find(function(err, users) {
		if(err)
			res.send(err);
		res.json(users);
	});
};

exports.getUser = function(req, res) {
	Users.findOne({username: req.params.username}, function(err, user) {
		if(err)
			res.send(err);
		res.json(user);
	});
};

exports.putUser = function(req, res) {
	if (req.body.checkout == false && req.body.follow == false && req.body.reduceCart == false) {

		Users.findOne({username: req.params.username}, function(err, user) {
			if(err)
				res.send(err)

			user.update(                          
		       { $push: 
		         { cart: {
		         	id: req.body.itemId,
		         	title: req.body.itemTitle,
		         	price: req.body.itemPrice
		         }

		        },
		    },
		         function(err){ if(err){ 
		           console.log(err) 
		         } else { 
		            console.log('Added')
		            res.json(user);
		         }
		       });

		});

	} else if (req.body.checkout == false && req.body.follow == false && req.body.reduceCart == true) {

		Users.findOne({username: req.params.username}, function(err, user) {
			if(err)
				res.send(err)

			user.cart = req.body.cart;
			user.save(function(err){
				if(err)
					res.send(err);

				res.json(user);
			});

		});

	} else if (req.body.checkout == false && req.body.follow == true) {
		var seller = "";
		Users.findOne({username: req.params.username}, function(err, user) {
			if(err)
				res.send(err)
			seller = req.body.sellerId

			user.update(                          
		       { $push: 
		         { following: req.body.sellerId

		        },
		    },
		         function(err){ if(err){ 
		           console.log(err) 
		         } else { 
		         	console.log('Added the seller to the following list')
		         	console.log("this is seller ::: " + req.body.sellerId)
		         	Users.findById(req.body.sellerId, function(err, user) {
						if(err)
							res.send(err)
						user.update(                          
					       { $push: 
					         { followers: req.body.email

					        },
					    },
					         function(err){ if(err){ 
					           console.log(err) 
					         } else {
							            console.log('Added the follower to the list')
							            res.json(user);
								}
						}) 
		         })
	         }})
		});



	} else {
		Users.findOne({username: req.params.username}, function(err, user) {
			if(err)
				res.send(err)

			var updateData = 
  	        { $addToSet: {
	        	itemsBought: {$each: req.body.itemsBought}
		        },
		       $set: { 
				cart: [] 
				}
		    }

			user.update(
				updateData,                       
		        function(err){ if(err){ 
			           console.log(err) 
			         } else { 
			         	for (x in req.body.itemsBought){
				         	StoreBooks.findByIdAndRemove(req.body.itemsBought[x].id, function(err) {
								if(err)
									res.send(err);
								console.log("{ message: 'Book has been removed from Book Store!' }");
							});
			         	}
			            console.log('Book Purchased')
			            res.json(user);
			         }
			       });

		});
	}

};

exports.deleteUser = function(req, res) {
	Users.findByIdAndRemove(req.params.user_id, function(err) {
		if(err)
			res.send(err);

		res.json({ message: 'Library User has been removed!' });
	});
};