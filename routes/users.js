var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ "hello" : "world"}));

});

module.exports = router;
