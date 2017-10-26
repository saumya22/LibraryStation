var StoreBooks = require('../model/storebooks.js');


exports.postStoreBooks = function(req, res) {
	var storeBook = new StoreBooks();

	console.log("req body ::: " + req.body.username)
	storeBook.username = req.body.username;
	storeBook.userId = req.body.userId;
	storeBook.title = req.body.title;
	storeBook.description = req.body.description;
	storeBook.publisher = req.body.publisher;
	storeBook.year = req.body.year;
	storeBook.price = parseInt(req.body.price);
	storeBook.created_at = Date.now();

	storeBook.save(function(err) {
		if (err) { 
			console.log("this is error::: " + err);
			handleError(res, err); 
			return; 
		}
		res.status(200).json({message: 'Book successfully added to book store', data: storeBook});
		
	});
};

exports.getStoreBooks = function(req, res) {
	console.log("hello how r u");
	StoreBooks.find(function(err, storeBooks) {
		if(err)
			res.send(err);
		res.json(storeBooks);
	});
};

exports.getStoreBook = function(req, res) {
	StoreBooks.findById({_id: req.params.storebookId}, function(err, storeBook) {
		if(err)
			res.send(err);
		res.json(storeBook);
	});
};

exports.putStoreBook = function(req, res) {
	StoreBooks.findById({_id: req.params.storeBookId}, function(err, storeBook) {
		if(err)
			res.send(err)
		if (typeof req.body.title != 'undefined') {
			storeBook.titel = req.body.title;
		}
		if (typeof req.body.description != 'undefined') {
			storeBook.description = req.body.description;
		}
		if (typeof req.body.publisher != 'undefined') {
			storeBook.publisher = req.body.publisher;
		}
		if (typeof req.body.year != 'undefined') {
			storeBook.year = req.body.year;
		}
		if (typeof req.body.price != 'undefined') {
			storeBook.price = req.body.price;
		}
		storeBook.save(function(err){
			if(err)
				res.send(err);

			res.json(storeBook);
		});
	});
};

exports.deleteStoreBook = function(req, res) {
	StoreBooks.findByIdAndRemove(req.params.storebookId, function(err) {
		if(err)
			res.send(err);

		res.json({ message: 'Book has been removed from Book Store!' });
	});
};