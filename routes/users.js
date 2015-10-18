var express = require('express');
var router = express.Router();
var User = require('../models').User;
var crypto = require('crypto');
function encrypto(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
router.post('/reg', function (request, res, next) {
    var user = request.body;
    user.userpwd = encrypto(user.userpwd);
    var md5Email = encrypto(user.useremail);
    var avatar = "https://secure.gravatar.com/avatar" + md5Email + "?s=48";
    delete  user.userpwd2;
    user.avatar = avatar;
    new User(user).save(function (err, result) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(result);
        }
    });
});
/**
 * 登录
 */
router.post('/login', function (req, res, next) {
    var userin = req.body;
    userin.userpwd = encrypto(userin.userpwd);
    User.findOne(userin, function (err, userout) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            req.session.user = userout;
            delete  userout.userpwd;
            res.json(userout);
        }
    });
});
/**
 *
 * 退出
 */
router.post('/logout', function (req, res, next) {
    req.session.user = null;
    res.status(200).json({'msg': 'success'});
});
/**
 * validate
 */
router.post('/validate', function (req, res, next) {
    var yuser = req.session.user;
    if (yuser && yuser._id) {
        res.status(200).json(yuser);
    } else {
        res.status(401).json('用户未登录!');
    }

});
router.get('/test', function (req, res, next) {
    console.log('test');
});
module.exports = router;
