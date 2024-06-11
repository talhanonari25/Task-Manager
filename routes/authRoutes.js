const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

module.exports = router;
