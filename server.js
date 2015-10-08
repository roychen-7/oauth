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
    key: 'oauth-test'
}));

// routes
app.use(require('./routes/server'));

http.createServer(app).listen(7000, function(){
    console.log('Server is listening on 7000');
});
