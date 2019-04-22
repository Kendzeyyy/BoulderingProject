'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const fileSchema = new Schema({
    title: String,
    category: String, //enum Kiipeilyareena or Boulderkeskus
    description: String,
    location: String,
    //location: {type: String, enum: ['Salmisaari', 'Kalasatama', 'Espoo', 'Pasila', 'Herttoniemi', 'Konala']},
    imageurl: {data: Buffer, contentType: String},
    imagename: String
});

module.exports = mongoose.model('File', fileSchema);
