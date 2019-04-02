'use strict';
const File = require('../models/fileUpload');

exports.file_list_get = () => {
    return File.find().then((cats) => {
        return cats;
    }).catch((err) => {
        console.log(err);
        return err;
    });
};

exports.file_create_post = (data) => {
    return File.create(data).then((item) => {
        return {status: 'Save OK: ' + item.id};
    }).catch((err) => {
        console.log(err);
        return err;
    });
};

exports.file_number_get = () => {
    return File.find().exec().then((cats) => {
        console.log(cats.length);
        return cats.length;
    }).catch((err) => {
        console.log(err);
        return err;
    });
};

exports.file_sort_get = () => {
    return File.find().
    where('weight').
    gt(3).
    where('age').
    gt(4).
    where('gender').
    equals('male').
    exec().
    then((cats) => {
        return cats;
    }).
    catch((err) => {
        console.log(err);
        return err;
    });
};

