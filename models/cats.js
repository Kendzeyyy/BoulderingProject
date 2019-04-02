const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const catSchema = new Schema ({
   name: String,
   cat_age: Number,
   gender: {type: String, enum: ['male', 'female']},
   color: String,
   weight: Number
});

module.exports = mongoose.model('Cat', catSchema);
