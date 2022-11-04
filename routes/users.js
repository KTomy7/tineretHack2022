const express = require('express');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', catchAsync(async(req, res) => {
    // const { email, username, password } = req.body;
    // const newUser = new User({ email, username });
    // const registeredUser = await User.register(newUser, password);
    // res.redirect('/');
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async(req, res) => {
    // res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    console.log('You have been logged out!');
    res.redirect('/');
});

module.exports = router; 
