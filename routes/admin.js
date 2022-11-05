const express = require('express');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Admin = require('../models/admin');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async(req, res) => {
    res.redirect('/');
    console.log("Successful login!!!");
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    console.log('You have been logged out!');
    res.redirect('/admin');
});

module.exports = router; 
