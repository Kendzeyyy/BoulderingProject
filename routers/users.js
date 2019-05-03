'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Login page
router.get('/login', (req, res) => {
   res.render('login');
});

// Register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register handle
router.post('/register', (req, res) => {
    const { username, password, password2} = req.body;
    const errors = [];

    // Check required fields
    if(!username || !password || !password2){
        res.render('register', {message: 'please fill in all fields'});
        console.log(req.body);
    }

    // Check if passwords match
    if(password !== password2){
        res.render('register', {message: 'Passwords do not match'});
        console.log(req.body);
    }

    // Check password length
    if(password.length < 6){
        res.render('register', {message: 'Passwords should be at least 6 characters'});
        console.log(req.body);
    }

    if(errors.length > 0){
        res.render('register', {
            username,
            password,
            password2
        });
    } else {
        // Validation passed
        //res.send('Welcome ' + username);
        console.log(req.body);
        User.findOne({ username: username})
            .then(user => {
                if(user) {
                    // If User exists
                    res.render('register',{
                        username,
                        password,
                        password2
                        });
                } else {
                    const newUser = new User({
                       username: username,
                       password: password,
                       password2: password2
                    });
                    console.log(newUser);
                    //res.send('SUCCESS');

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            // Set password to hashed
                            newUser.password = hash;
                            console.log('password ' + hash);

                            // Save the user
                            newUser.save()
                                .then(user => {
                                    console.log('User saved to mongoDB and redirected to login page')
                                    res.redirect('login');
                                })
                                .catch(err => console.log(err));
                        }));
                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/users/login',
        //failureFlash: true
    })(req, res, next);

});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
    console.log('Logged out');
});

module.exports = router;