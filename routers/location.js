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

router.get('/loc3', (req, res) => {
    res.render('espoo');
});

router.get('/loc4', (req, res) => {
    res.render('konala');
});

router.get('/loc5', (req, res) => {
    res.render('pasila');
});

router.get('/loc6', (req, res) => {
    res.render('herttoniemi');
});

module.exports = router;