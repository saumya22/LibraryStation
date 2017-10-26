var express = require('express');
var router = express.Router();
var bookController = require('../controller/books.js');
var authController = require('../controller/auth');

console.log("heelo books")
router.route('/')
  .post(authController.isAuthenticated, bookController.postBooks)
  .get(authController.isAuthenticated, bookController.getBooks);

router.route('/:ISBN')
  .get(authController.isAuthenticated, bookController.getBook)
  .put(authController.isAuthenticated, bookController.putBook)
  .delete(authController.isAuthenticated, bookController.deleteBook);

module.exports = router;
