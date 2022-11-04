const express = require('express');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Admin = require('../models/admin');

const router = express.Router();

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
