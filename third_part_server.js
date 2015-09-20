var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// Third part server init
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('app'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    key: 'oauth-test-third',
    proxy: 'true',
}));

// routes
app.use(require('./routes/third_part_server'));

http.createServer(app).listen(8000, function(){
    console.log('Third part server listening on 8000');
});
