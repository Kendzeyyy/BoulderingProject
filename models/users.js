'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
