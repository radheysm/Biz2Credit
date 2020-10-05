const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     POST api/v1/profile
// @desc      Create User
// @access    Public

router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
