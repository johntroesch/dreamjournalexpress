var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var DreamSchema = new Schema({
    title: {Type: String, required},
    content: {Type: String, required},
    mood: {Type: String}
})

module.exports = mongoose.model('Dream', DreamSchema);