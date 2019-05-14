const { validationResult } = require('express-validator/check');
const express = require('express');

const User = require('../models/User');

module.exports = {
  signUp: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne(email);

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'El usuario ya existe' }] });
      }

      const newUser = new User({ email, password });

      await newUser.save();

      res.status(200).json({ msg: 'El usuario ha sido creado' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  signIn: async (req, res, next) => {
    try {
      console.log('signIn');
    } catch (err) {}
  },

  secret: async (req, res, next) => {
    try {
      console.log('secret');
    } catch (err) {}
  }
};
