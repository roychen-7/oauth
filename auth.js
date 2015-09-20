var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

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
    key: 'oauth-test-auth',
    proxy: 'true',
}));

// routes
app.use(require('./routes/auth'));

http.createServer(app).listen(7100, function(){
    console.log('Auth server is listening on 7100');
});
