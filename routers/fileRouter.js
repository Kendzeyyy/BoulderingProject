'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileController = require('../controllers/fileController');
const File = require ('../models/fileUpload');
const methodOverride = require('method-override');
const { ensureAuthenticated } = require('../config/auth');

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(methodOverride('_method'));  //for overriding post to get put and delete
router.use(methodOverride('X-HTTP-Method'));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// get all files--------------------------------------------------------------------------------------------------------
router.get('/all', (req, res) => {
    fileController.file_list_get().then((result) => {
       res.send(result);
    });
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('upload.pug');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    File.findById(req.params.id).then(file =>{
        console.log(file);
        res.render('edit.pug', {file: file});
    });
});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    File.findById(req.params.id).then(file =>{
        console.log(file);
        res.render('delete.pug', {file: file});
    });
});


// create new post------------------------------------------------------------------------------------------------------
router.post('/upload', ensureAuthenticated, (req, res) => {
    const data = req.body;
    console.log(data);
    console.log(req.body.username);
    fileController.file_create_post(data).then((result) => {
        res.send(result);
    });
    res.send({type: 'POST from fileRouter'});
});

router.post('/update', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('reqbody: ' + req.body);
    console.log('reqbodyname: ' + req.body.name);
    File.create(req.body);

    File.find()
        .where('name').equals(req.body.name)
        .then(
            id =>{
                console.log('THIS IS THE ID' + id);
                File.updateOne(
                    File.create(req.body)).then(c => {
                    res.send('File edited: ' + req.body.name);
                }, err => {
                    res.send('Error: ' + err);
                });
            }, err => {
                res.send('Error: ' + err);
            });
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
                res.sendStatus(200);
                next();
            }
        }
    });
});

router.use('/upload', function(req, res){
    console.log(req.body);
    console.log(req.body.path + req.body.filename);
    File.create({
        uploader: req.body.username,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image
    });
    res.redirect('/home');
});

// update by id---------------------------------------------------------------------------------------------------------
router.put('/', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('EDIT');
    console.log(req.body);
    const id = req.body._id;
    console.log(id);
    File.findByIdAndUpdate({_id: id}, req.body).then(file => {
        File.create({_id: id}, req.body);
        console.log(file);
    }, err => {
        res.send('Error ' + err);
    });
    res.redirect('/');
});

// delete by id---------------------------------------------------------------------------------------------------------
router.delete('/', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('DELETE');
    console.log(req.body);
    const id = req.body._id;
    console.log(id);
    File.findByIdAndRemove({_id: id}).then(file => {
    }, err => {
        res.send('Error ' + err);
    });
    console.log('delete method DONE');
    res.redirect('/');
});

module.exports = router;