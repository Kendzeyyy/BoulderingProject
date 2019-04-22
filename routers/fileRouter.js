'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileController = require('../controllers/fileController');
const imageModel = require ('../models/fileUpload');
const methodOverride = require('method-override');

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(methodOverride('_method'));  //for overriding post to get patch and delete
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

router.get('/add', (req, res) => {
    res.render('upload.pug');
});

router.get('/edit', (req, res) => {
    res.render('edit.pug');
});

router.get('/delete', (req, res) => {
    res.render('delete.pug');
    console.log('in router.get delete');

});


// create new post------------------------------------------------------------------------------------------------------
router.post('/post', bodyParser.urlencoded({extended: true}), (req, res) => {
    const data = req.body;
    console.log(data);
    fileController.file_create_post(data).then((result) => {
        res.send(result);
    });
    res.send({type: 'POST from fileRouter'});
});

router.post('/edit', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('reqbody: ' + req.body);
    console.log('reqbodyname: ' + req.body.name);
    imageModel.create(req.body);

    File.find()
        .where('name').equals(req.body.name)
        .then(
            id =>{
                console.log('THIS IS THE ID' + id);
                Cat.updateOne(
                    imageModel.create(req.body)).then(c => {
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

router.use('/upload', function(req, res){
    console.log(req.body);
    console.log(req.body.path + req.body.filename);
    imageModel.create(req.body);

    const newFile = new File();
    newFile.img.data = fs.readFileSync(req.files.path);
    //newFile.img.contentType = 'image/jpg/png';
    newFile.save();
    sharp(req.file.path)
        .toFile('public/data.json', (err) => {
        });
});


// update by id---------------------------------------------------------------------------------------------------------
router.put('/edit/:id', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('EDIT');
    console.log(req.body);
    const id = req.params._id;
    //const id = req.body._id;
    console.log(id);
    imageModel.findByIdAndUpdate({_id: id}, req.body).then(function () {
        imageModel.findOne({_id: req.params.id}).then(function (file) {
            res.send(file);
            imageModel.create(req.body);
        });
    });
    res.send({type: 'UPDATE'});
});

// delete by id---------------------------------------------------------------------------------------------------------
router.delete('/delete', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('DELETE');
    console.log(req.body);
    const id = req.body._id;
    console.log(id);
    imageModel.findOneAndDelete({_id: id}).then(file => {
        res.redirect('/home');
        //res.send(file);
        //res.sendStatus(200);
    }, err => {
        res.send('Error ' + err);
    });
    console.log('executed delete method');
});

module.exports = router;