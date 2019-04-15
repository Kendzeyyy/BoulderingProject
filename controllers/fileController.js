'use strict';
const File = require('../models/fileUpload');

exports.file_list_get = () => {
    return File.find().then((file) => {
        return file;
    }).catch((err) => {
        console.log(err);
        return err;
    });
};

exports.file_create_post = (data) => {
    console.log(data);
    return File.create(data).then((item) => {
        File.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            location: req.body.location,
            image: req.body.image
        });
        return {status: 'Save OK: ' + item.id};
    }).catch((err) => {
        console.log(err);
        return err;
    });
};

exports.file_number_get = () => {
    return File.find().exec().then((files) => {
        console.log(files.length);
        return files.length;
    }).catch((err) => {
        console.log(err);
        return err;
    });
};