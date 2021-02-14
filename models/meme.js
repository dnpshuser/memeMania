const mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');

const memeSchema = new mongoose.Schema({
    name : String,
    url : String,
    caption : String
});

memeSchema.plugin(toJson);
module.exports = mongoose.model('Meme', memeSchema);