var subapp = module.exports = require('express')();
var uuid = require('node-uuid');
var moment = require('moment');

// use mem to store some config
var resources = {};
var authTokens = {};

var users = [{
  username: 'roy',
  password: '888888',
  age: 25
}, {
  username: 'roychen',
  password: '111111',
  age: 25
}];

subapp.get('/', function(req, res) {
  if (!req.session.username) {
    return res.redirect('/login');
  }

  res.end('Hello ' + req.session.username);
});

subapp.get('/login', function(req, res) {
  // Login page
  res.render('server/login');
});

subapp.get('/auth', function(req, res) {
  // Choose auth or not
  if (!req.session.username) {
    return res.redirect('/login');
  }

  // set resources
  var authToken = uuid.v4();
  var accessToken = uuid.v4();

  authTokens[authToken] = {
    accessToken: accessToken,
    createTime: moment()
  };

  resources[accessToken] = {
    username: req.session.username,
    age: req.session.age,
    refreshToken: uuid.v1() 
  }

  res.render('server/auth', {
    retUrl: req.query.redirect_uri + '?state=' + req.query.state + '&code=' + authToken
  })
});

subapp.get('/auth_code', function(req, res) {
  // return resource code and refresh code by grant_code
  if (!authTokens[req.query.code]) {
    return res.end('error code'); 
  }

  var now = moment();
  var authTokenInfo = authTokens[req.query.code];

  if (now - authTokenInfo.createTime > 60 * 60 * 1000) {
    delete authTokens[req.query.code];
    return res.end('expired code');
  }

  var resourceInfo = resources[authTokenInfo.accessToken];
   
  res.json({
    access_token: authTokenInfo.assessToken,
    token_type: 'test',
    refresh_token: resourceInfo.refreshToken
  });
});

subapp.get('/resources', function(req, res) {
  // Check code and return resource
  if (req.query.access_token === 'access_token') {
    res.json({
      username: 'roy',
      age: 25
    });
  }
});

subapp.post('/login', function(req, res) {
  // Check login
  var userInfo = checkUser(req.body.username, req.body.password);
  if (userInfo) {
    // set session
    req.session.username = userInfo.username;
    req.session.age = userInfo.age;

    res.redirect('/');
  } else {
    res.redirect('/login');
  }
  
  function checkUser(username, password) {
    for (var i in users) {
      if (users[i].username === username 
      && users[i].password === password) {
        return user[i];
      }

      return false;
    }
  }
});

// expired
setInterval(function() {
  var now = moment();

  for (var i in authTokens) {
    if (now - authTokens[i].createTime > 60 * 60 * 1000) {
      delete authTokens[i];
    }
  }
}, 3 * 1000);
