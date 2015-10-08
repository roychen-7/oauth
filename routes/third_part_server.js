var subapp = module.exports = require('express')();
var request = require('request');

subapp.get('/', function(req, res) {
  res.render('third_part/index', {
    authUrl: 'http://127.0.0.1:7000/auth?response_type=code&client_id=test&state=running&redirect_uri=http://127.0.0.1:8000/auth_cb'
  });
});

subapp.get('/auth_cb', function(req, res) {
  // get resource code and refresh code by grant_code
  request('http://127.0.0.1:7000/auth_code?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=http://127.0.0.1:8000/auth_cb&client_id=test', function(err, response, body) {
    var tokens = JSON.parse(body);

    request('http://127.0.0.1:7000/resources?access_token=' + tokens.access_token, function (err, response, body) {
      res.json(JSON.parse(body));
    });
  });


});
