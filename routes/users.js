var express = require('express');
var router = express.Router();
var userController = require('../controller/users.js');
var authController = require('../controller/auth');

console.log("heelo hoo r ju in routes")
router.route('/')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/:username')
  .get(authController.isAuthenticated, userController.getUser)
  .put(authController.isAuthenticated, userController.putUser)
  .delete(authController.isAuthenticated, userController.deleteUser);

module.exports = router;
