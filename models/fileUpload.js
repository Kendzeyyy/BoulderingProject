'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const fileSchema = new Schema({
    category: String,
    title: String,
    description: String,
    image: String
});

module.exports = mongoose.model('File', fileSchema);
