const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/users.controllers');
const router = express.Router();

router.post('/register', userController.registerPost);
router.post('/login', userController.loginPost);


module.exports = router;