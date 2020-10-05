const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../../models/User');

// @route     POST api/v1/users
// @desc      Register User
// @access    Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('phone', 'Please enter a valid 10 digit phone number ')
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 }),
    check(
      'password',
      'please enter a  password with 3 or more characker'
    ).isLength({ min: 3, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    try {
      // See if user exists

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(500)
          .json({ errors: [{ msg: 'User Already exists' }] });
      }

      user = new User({
        name,
        email,
        phone,
        password,
      });

      // Encrpt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
