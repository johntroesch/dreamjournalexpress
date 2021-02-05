var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var DreamSchema = new Schema({
    title: {type: String},
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    content: {type: String},
    mood: {type: String}
})

module.exports = mongoose.model('Dream', DreamSchema);