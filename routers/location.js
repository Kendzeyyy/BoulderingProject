'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();

app.set('view engine', 'pug');
console.log(process.env);

router.get('/salmisaari', (req, res) => {
    res.render('salmisaari');
});

router.get('/kalasatama', (req, res) => {
    res.render('kalasatama');
});

router.get('/espoo', (req, res) => {
    res.render('espoo');
});

router.get('/konala', (req, res) => {
    res.render('konala');
});

router.get('/pasila', (req, res) => {
    res.render('pasila');
});

router.get('/herttoniemi', (req, res) => {
    res.render('herttoniemi');
});

module.exports = router;