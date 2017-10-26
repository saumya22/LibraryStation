var express = require('express');
var router = express.Router();
var storeBookController = require('../controller/storebooks.js');
var authController = require('../controller/auth');

console.log("heelo storebooks")
router.route('/')
  .post(authController.isAuthenticated, storeBookController.postStoreBooks)
  .get(authController.isAuthenticated, storeBookController.getStoreBooks);

router.route('/:storebookId')
  .get(authController.isAuthenticated, storeBookController.getStoreBook)
  .put(authController.isAuthenticated, storeBookController.putStoreBook)
  .delete(authController.isAuthenticated, storeBookController.deleteStoreBook);

module.exports = router;
