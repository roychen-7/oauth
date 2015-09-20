var subapp = module.exports = require('express')();

subapp.get('/login', function(req, res) {
    // Login page
});

subapp.get('/auth', function(req, res) {
    // Choose auth or not
});

subapp.get('/r_code', function(req, res) {
    // 
});

subapp.get('/resources', function(req, res) {
    // Check code and return resource
});

subapp.post('/login', function(req, res) {
    // Check login
});

subapp.post('/auth', function(req, res) {
    // Redirect to from page with code
});
