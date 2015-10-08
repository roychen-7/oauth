var subapp = module.exports = require('express')();

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

  res.render('server/auth', {
    retUrl: req.query.redirect_uri + '?state=' + req.query.state + '&code=' + 'grant_code'
  })
});

subapp.get('/auth_code', function(req, res) {
  // return resource code and refresh code by grant_code
  if (req.query.code !== 'grant_code') {
    return res.end('error code'); 
  }
  
  res.json({
    access_token: 'access_token',
    token_type: 'test',
    refresh_token: 'refresh_token'
  });
})

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
  if (req.body.username === 'roy' && req.body.password === '888888') {
    req.session.username = req.body.username;
    req.session.age = 25;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

subapp.post('/auth', function(req, res) {
  // Redirect to from page with code
})
