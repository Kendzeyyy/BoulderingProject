'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
//const fileRouters = require('./routers/fileRouter');
const https = require('https');
const fs = require('fs');
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

app.set('view engine', 'pug');

console.log(process.env);

router.get('/salmisaari', (req, res) => {
    res.render('salmisaari');
    console.log('salmisaari');
});

router.get('/kalasatama', (req, res) => {
    res.render('kalasatama');
    console.log('KALASATAMA GET');
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