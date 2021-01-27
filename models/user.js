var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, maxlength: 20},
    password: {type: String, required: true, maxlength: 40},
    first_name: {type: String, required: true, maxlength: 20},
    last_name: {type: String, required: true, maxlength: 20}
})

module.exports = mongoose.model('User', UserSchema);
