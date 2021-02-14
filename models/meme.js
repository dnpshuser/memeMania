const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    name : String,
    caption : String,
    imageUrl : String
});

module.exports = mongoose.model('Meme', memeSchema);