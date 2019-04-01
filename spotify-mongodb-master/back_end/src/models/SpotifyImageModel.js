const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    height: Number,
    url: String,
    width: Number
});

module.exports = mongoose.model('fs.files', ImageSchema);