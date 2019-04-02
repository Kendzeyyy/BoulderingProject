'use strict';
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const bodyParser = require('body-parser');
const Cat = require('../models/cats');

// get all cats
router.get('/all', (req, res) => {
    catController.cat_list_get().then((result) => {
        res.send(result);
    });
});

// create new cat
router.post('/add', bodyParser.urlencoded({extended: true}), (req, res) => {
    const data = req.body;
    console.log(data);
    catController.cat_create_post(data).then((result) => {
        res.send(result);
    });
    res.send({type: 'POST'});
});

// update
router.post('/update', bodyParser.urlencoded({extended: true}), (req, res) => {
    console.log('reqbody: ' + req.body);
    console.log('reqbodyname: ' + req.body.name);
    const editedCat = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight
    };

    Cat.find()
        .where('name').equals(req.body.name)
        .then(
            id =>{
                console.log('THIS IS THE ID' + id);
                Cat.updateOne({name: req.body.name}, {
                    name: req.body.name,
                    age: req.body.age,
                    gender: req.body.gender,
                    color: req.body.color,
                    weight: req.body.weight
                }).then(c => {
                    res.send('Cat edited: ' + req.body.name);
                }, err => {
                    res.send('Error: ' + err);
                });
            }, err => {
                res.send('Error: ' + err);
            });
});

// get number of cats
router.get('/number', (req, res) => {
    catController.cat_number_get().then((result) => {
        res.send(`Got ${result} cats`);
    });
});

// sorting cats
router.get('/sort', (req, res) => {
    catController.cat_sort_get().then((result) => {
        let text = '';
        result.forEach((cat) => {
            text += cat.name + '<br>';
        });
        res.send(text);
    });
});

// update by id
router.put('/update/:id', (req, res) => {
    Cat.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        Cat.findOne({_id: req.params.id}).then(function (cat) {
            res.send(cat);
        });
    });
    //res.send({type: 'UPDATE'});
});

// delete by id
router.post('/delete/:id', (req, res) => {
    Cat.findByIdAndRemove({_id: req.params.id}).then(function (cat) {
        res.send(cat);
    });
});

/*
router.get('/name', function (req, res){
    dbase.collection('name').find().toArray(function (err, results) {
        res.send(results);
    })
});
*/

module.exports = router;