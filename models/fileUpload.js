const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    category: String,
    title: String,
    description: String
});

module.exports = mongoose.model('File', fileSchema);
