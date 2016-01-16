var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
   title: String,
   date: { type: Date, default: Date.now },
   content: String
});

module.exports = mongoose.model('Post', Post);
