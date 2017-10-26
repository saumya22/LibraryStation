var Books = require('../model/books.js');

exports.postBooks = function(req, res) {
	Books.findOne({username: req.body.username, ISBN: req.body.ISBN}, function(err, book) {
		if (book == null) {
			var book = new Books();
			book.username = req.body.username;
			book.title = req.body.title;
			book.ISBN = req.body.ISBN;
			book.details = req.body.details;
			book.created_at = Date.now();
			book.save(function(err) {
				if (err) { handleError(res, err); return; }
				res.status(200).json({message: 'Book Successfully Added to Reading List!', data: book});
				});
		} else {
					console.log(err)
					res.status(400).json({message: 'Book Already Exists in your Reading List', data: book});
		}	
		
	});
};

exports.getBooks = function(req, res) {
	Books.find({username: req.body.username}, function(err, books) {
		if (err) { handleError(res, err); return; }
		res.status(200).json(books);
	});
};

exports.getBook = function(req, res) {
	Books.findById(req.params.ISBN, function(err, book) {
		if (err) { handleError(res, err); return; }
		res.status(200).json(book);
	});
};

exports.putBook = function(req, res) {
	Books.findOne({username: req.body.username, ISBN: req.params.ISBN}, function(err, book) {
		if(err)
			res.send(err)
		//Update the user
		if (typeof req.body.firstname != 'undefined') {
			book.firstname = req.body.firstname;
		}
		if (typeof req.body.lastname != 'undefined') {
			book.lastname = req.body.lastname;
		}
		if (typeof req.body.readingList != 'undefined') {
			book.readingList = req.body.readingList;
		}
		book.save(function(err){
			if(err)
				res.send(err);

			res.json(book);
		});
	});
};

exports.deleteBook = function(req, res) {
	Books.findByIdAndRemove(req.params.ISBN, function(err) {
		if(err)
			res.send(err);

		res.json({ message: 'The book has been removed from the reading list!' });
	});
};