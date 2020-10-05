const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
// Load Profile Model
const Profile = require('../../../models/Profile');
// Load User Model
const User = require('../../../models/User');

// @route   GET api/v1/profile;
// @desc    Get users
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ date: -1 });
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Post api/v1/profile;
// @desc    Get users
// @access  Public

router.post(
  '/',
  [
    auth,
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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log('profile');
    // console.log('route');
    // console.log(req.body);
    const { name, email, phone, password } = req.body;
    const profileFields = {};
    const user = await User.findById(req.user.id).select('-password');
    profileFields.user = user.id;
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;
    if (phone) profileFields.phone = phone;
    if (password) profileFields.password = password;
    try {
      let profile = await Profile.findOne({ user: user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // const user = await User.findById(req.user.id).select('-password');
      // const { name, email, phone, password } = req.body;
      // console.log(user.id);
      // const newProfile = new Profile({
      //   name: req.body.name,
      //   email: req.body.email,
      //   phone: req.body.phone,
      //   password: req.body.password,
      //   user: user.id,
      // });
      // newProfile.save().then((profile) => res.json(profile));
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }

    newUser.save().then((user) => res.json(user));
  }
);

// @route   DELETE api/profile/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    // Check user
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized' });
    }
    await profile.remove();
    res.json({ msg: 'User Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
