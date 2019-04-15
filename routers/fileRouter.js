'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileController = require('../controllers/fileController');
const File = require('../models/fileUpload');

// get all files
router.get('/all', (req, res) => {
    fileController.file_list_get().then((result) => {
       res.send(result);
    });
});

// create new post
router.post('/post', bodyParser.urlencoded({extended: true}), (req, res) => {
    const data = req.body;
    console.log(data);
    fileController.file_create_post(data).then((result) => {
        res.send(result);
    });
    res.send({type: 'POST from fileRouter'});
});

router.post('/update', bodyParser.urlencoded({extended: true}), (req, res) => {
   console.log('reqbody: ' + req.body);
   console.log('reqbodyname: ' + req.body.name);
   const editedFile = {
       title: req.body.title,
       category: req.body.category,
       description: req.body.description,
       location: req.body.location,
       image: req.body.image
   }
});

router.post('/upload', function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.sendStatus(400);
        } else{
            if (req.file === undefined){
                res.sendStatus(404);
            } else {
                console.log(req.file);
                res.redirect('/home');
                next();
            }
        }
    });
});

router.use('/upload', function(req, res, next) {
    // do small 200x200 thumbnail
    sharp(req.file.path)
        .resize(200, 200)
        .toFile('public/img/small/' + Date.now() + '200x200.jpg', (err) => {
        });
    next();
});

router.use('/upload', function(req, res, next) {
    // do medium 400x400 thumbnail
    sharp(req.file.path)
        .resize(400, 400)
        .toFile('public/img/medium/' + Date.now() + '400x400.jpg', (err) => {
        });
    res.send(req.file);
    next();
});

/*
app.use('/upload', function(req, res){
    const newFile = new File();
    newFile.img.data = fs.readFileSync(req.files.userPhoto.path);
    newFile.img.contentType = 'image/jpg/png';
    newFile.save();
    sharp(req.file.path)
        .toFile('public/data.json', (err) => {
        });
});
*/

module.exports = router;