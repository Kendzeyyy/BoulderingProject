'use strict';
// const fileController = require('../controllers/fileController');
import * as fileController from "../controllers/fileController";
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const File = require('../models/fileUpload');

router.get('/view', (req, res) => {
    res.sendStatus(200);
});

router.get('/add', function(req, res){
    res.sendStatus(200);
    console.log(req, res);
    console.log(req.query.myParam);
});

router.post('/post', bodyParser.urlencoded({extended: true}), (req, res) => {
    const data = req.body;
    console.log(data);
    fileController.file_create_post(data).then((result) => {
        res.send(result);
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
                next();
            }
        }
    });
});

module.exports = router;