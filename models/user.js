var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, maxlength: 20},
    password: {type: String, required: true, minlength: 8, maxlength: 40}
})

module.exports = mongoose.model('User', UserSchema);
