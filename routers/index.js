'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const sharp = require('sharp');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const location = require('./location');
const fileRouters = require('./fileRouter');
const users = require('./users');
const imageModel = require ('../models/fileUpload');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');

// Passport config
require('../config/passport')(passport);

/*

 */
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');
const options = {
    key: sslkey,
    cert: sslcert
};

console.log(process.env);

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
//                                                                                                                    /BoulderingProject /admin
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/admin`, { useNewUrlParser: true }).then(() => {
    console.log('Connected successfully.');
    https.createServer(options, app).listen(process.env.APP_PORT);        // Local
    //app.listen(process.env.APP_PORT);                                       // Jelastic
}, err => {
    console.log('Connection to db failed :( ' + err);
});

// https redirection
app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

// Upload---------------------------------------------------------------------------------------------------------------
app.post('/upload', function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.send(err);
        } else{
            if (req.file === undefined){
                res.sendStatus(404);
            } else {
                console.log(req.file);
                next();
            }
        }
    });
});

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

app.use('/upload', (req, res) => {
    const body = req.body;
    const file = req.file;
    console.log(body);
    console.log(body.path + body.filename);
    imageModel.create({
        title: body.title,
        category: body.category,
        description: body.description,
        location: body.location,
        imageurl: file.path,
        imagename: file.filename
    });

    const data = JSON.stringify(imageModel, null, 2);
    fs.writeFile('public/data.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to data.json file');
    });
});

//PUG-------------------------------------------------------------------------------------------------------------------

app.get('/', function(req, res){
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('index.pug');
});

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Middleware
app.set('view engine', 'pug');
app.enable('trust proxy');
app.use('/file', fileRouters);
app.use('/users', users);
app.use('/location', location);
app.use(express.static('public'));
app.use(express.static('modules'));
app.use(helmet());
