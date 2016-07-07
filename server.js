var express = require('express');
var http = require("http");
var request = require('request');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js/ngCart'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));


var router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'welcome to my api!'});
});


router.route('/year')
    .get(function (req, res) {
        request('http://api.tiresync.com//v1/oe/years/1111-1111-1111-1111/localhost', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var payload = JSON.parse(body);
                res.json(payload.items);
            }
        })
    });

router.route('/make')
    .post(function(req, res) {
        var address = 'http://api.tiresync.com/v1/oe/makes/1111-1111-1111-1111/localhost';
        address = address + '/' + req.body.year;
        request(address, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                var payload = JSON.parse(body);
                res.json(payload.items);
            }
        })
    });

router.route('/models')
    .post(function (req, res) {
        var address = 'http://api.tiresync.com/v1/oe/models/1111-1111-1111-1111/localhost';
        address = address + '/' + req.body.year +'/'+req.body.make;
        request('address', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var payload = JSON.parse(body);
                res.json(payload.items);
            }
        })
    });

router.route('/options')
    .post(function (req, res) {
        var address = 'http://api.tiresync.com/v1/oe/options/1111-1111-1111-1111/localhost';
        address = address + '/' + req.body.year +'/'+req.body.make + '/'+req.body.model;
        request('address', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var payload = JSON.parse(body);
                res.json(payload.items);
            }
        })
    });


app.use('/api', router);
app.listen(port);
console.log("App listening on port " + port);
