/**
 * Created by Administrator on 15-10-18.
 */

var express = require('express');
var path = require('path');//路径
var cookieParser = require('cookie-parser');//cookie--req.cookies
var bodyParser = require('body-parser');//Form--req.body

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:28017/nodeshop');


var users = require('./routes/users');//用户路由
var wares = require('./routes/wares');//用户路由
var app = express();

//============================================================
/*require('./utils');
require('./models/model');*/
//============================================================
app.use(bodyParser.json());//请求的数据类型是json/content-type:application/json
app.use(bodyParser.urlencoded({ extended: false }));//解析form数据
app.use(cookieParser());
//静态文件服务
app.use(express.static(path.join(__dirname, 'app', 'public')));
//自己的中间件
//执行玩中间件后 req.session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'zfsecret',//密钥
    key: 'zhufengkey',//cookie name
    cookie: {maxAge: 1000 * 60 * 60},//设置过期时间
    store: new MongoStore({
        db: 'nodeshow',
        host: '127.0.0.1',
        port: 28017
    })
}));
app.use(flash());


/**路由*/
app.use('/users', users);
app.use('/wares', wares);

app.listen(8080);