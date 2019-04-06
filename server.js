var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();
var port = process.env.PORT || 80;

//This is the section where it will access an endpoint such as:
//https://desolate-atoll-59781.herokuapp.com/api/test (note /api/test/)
router.get('/test', function(req, res) {
    res.status(200).send('Hello world');
});

app.use('/api', router);

app.listen(port, function() {
    console.log("Node app is running at localhost:" + port)
  });