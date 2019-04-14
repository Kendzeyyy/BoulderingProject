'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const sharp = require('sharp');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const catRouters = require('./routers/catRouter');
//const fileRouters = require('./routers/fileRouter');
const https = require('https');
const fs = require('fs');
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');
const url = (`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/admin`);

app.set('view engine', 'pug');

const options = {
    key: sslkey,
    cert: sslcert
};

console.log(process.env);

// Upload---------------------------------------------------------------------------------------------------------------
const multer = require('multer');

// storage to /public/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // callback
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        // rename the image name with fieldname and date
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// init upload----------------------------------------------------------------------------------------------------------
const upload = multer ({
    storage: storage,
}).single('image');

// Connect to mongodb---------------------------------------------------------------------------------------------------
mongoose.connect(url, {userNewUrlParser: true}).then(() => {
    console.log('Connected successfully.');
    https.createServer(options, app).listen(3000);
}, err => {
    console.log('Connection to db failed: ' + err);
});

// ---------------------------------------------------------------------------------------------------------------------

app.get('/', function(req, res){
    console.log(req, res);
    console.log(req.query.myParam);
        //res.sendStatus(200 + 'Created dummy data');
        //res.render('index');
    res.redirect('/home');
});

app.post('/upload', function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.sendStatus(400);
        } else{
            if (req.file === undefined){
                res.sendStatus(404);
            } else {
                console.log(req.file);
                res.redirect('/index.html');
                next();
            }
        }
    });
});

// Middleware for thumbnails--------------------------------------------------------------------------------------------
app.use('/upload', function(req, res, next) {
    // do small 200x200 thumbnail
    sharp(req.file.path)
        .resize(200, 200)
        .toFile('public/img/small/' + Date.now() + '200x200.jpg', (err) => {
        });
    next();
});

app.use('/upload', function(req, res, next) {
    // do medium 400x400 thumbnail
    sharp(req.file.path)
        .resize(400, 400)
        .toFile('public/img/medium/' + Date.now() + '400x400.jpg', (err) => {
        });
    res.send(req.file);
    next();
});

app.use('/upload', function(req, res){
    // set req.file path to data.json
    //req.file = file;
    sharp(req.file.path)
        .toFile('public/data.json', (err) => {
        });
});

//----------------------------------------------------------------------------------------------------------------------

app.get('/home', (req, res) => {
    res.render('index.pug');
});

app.get('/login', (req, res) => {
   res.render('login.pug');
});

app.get('/signup', (req, res) => {
   res.render('signup.pug');
});

app.get('/salmisaari', (req, res) => {
    res.render('salmisaari');
    console.log('get/salmisaari');
});

app.get('/kalasatama', (req, res) => {
    res.render('kalasatama');
    console.log('get/kalasatama');
});

app.get('/espoo', (req, res) => {
    res.render('espoo');
});

app.get('/konala', (req, res) => {
    res.render('konala');
});

app.get('/pasila', (req, res) => {
    res.render('pasila');
});

app.get('/herttoniemi', (req, res) => {
    res.render('herttoniemi');
});


//app.listen(port, () => console.log(`Listening on port ${port}`));
// http://localhost:3000/cats/...
//app.use('/cats', catRouters);
//app.use('/fileUpload', fileRouters);
app.use(express.static('public'));
app.use(express.static('modules'));