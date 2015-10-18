/**
 * Created by Administrator on 15-10-18.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('User', new
    mongoose.Schema({
    username: {type: 'String'},
    useremail: String,
    userpwd: String,
    avatar: String
}));
