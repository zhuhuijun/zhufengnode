/**
 * Created by Administrator on 15-10-19.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Ware', new
    mongoose.Schema({
    name: {type: 'String'},
    price: String,
    imgsrc: String
}));