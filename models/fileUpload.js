'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const fileSchema = new Schema({
    title: String,
    category: {type: String, enum: ['Kiipeilyareena, Boulderkeskus']},
    description: String,
    location: {type: String, enum: ['Salmisaari', 'Kalasatama', 'Espoo', 'Pasila', 'Herttoniemi', 'Konala']},
    image: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('File', fileSchema);
