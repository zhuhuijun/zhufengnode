var express = require('express');
var router = express.Router();
var Ware = require('../models').Ware;
var crypto = require('crypto');
var parser = require('multer')().single('imgsrc');
var mime = require('mime');
var uuid = require('uuid');
var fs = require('fs');
function encrypto(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
/***
 * 添加
 */
router.post('/add', parser, function (req, res, next) {
    var ware = req.body;
    if (ware.imgsrc) {
        var imgsrcinfos = ware.imgsrc.split(',');
        //data:img/jpeg;base64,/9j----
        var ext = mime.extension(imgsrcinfos[0].slice(imgsrcinfos[0].indexOf(":") + 1, imgsrcinfos[0].indexOf(";")));
        var imgsrc = uuid.v4() + '.' + ext;
        fs.writeFile('./app/public/upload/' + imgsrc, imgsrcinfos[1], 'base64', function (err) {
            new Ware({
                name: ware.name,
                price: ware.price,
                imgsrc: '/upload/' + imgsrc
            }).save(function (err, reone) {
                    if (err) {
                        res.status(500).json({msg: err});
                    } else {
                        res.json(reone);
                    }
                });
        });
    }
    console.log(ware.name);
});
router.get('/list', function (req, res, next) {
    Ware.find({}).exec(function (err, list) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(list);
        }
    });
});
module.exports = router;
