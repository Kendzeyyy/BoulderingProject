const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    category: String,
    title: String,
    description: String,
    imagePath: String,
    thumbnailPath: String,
    /*
    coordinates: {
        latitude: String,
        longitude: String
    }
    */
});

module.exports = mongoose.model('File', fileSchema);
