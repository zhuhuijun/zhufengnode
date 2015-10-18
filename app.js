/**
 * Created by Administrator on 15-10-18.
 */
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'app', 'public')));

app.listen(8080);