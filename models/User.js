var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    email: { type: String, unique: true, lowercase: true },
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
