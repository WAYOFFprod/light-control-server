'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _axios = require('../../config/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


var light,
    button = null;
router.post('/connect', function (req, res) {
  console.log("connect: ", req.body);
  if (req.body.type === 'light') {
    light = req.body.ip;
  } else if (req.body.type === 'button') {
    button = req.body.ip;
  }
  res.send(req.body.type + ' connected to the server');
});

router.get('/hi', function (req, res) {
  console.log("go here somehow!");
  res.send('hi backs');
});

router.post('/light-toggle', function (req, res) {
  var data = req.body;
  //console.log(data)
  if (light !== undefined) {
    // console.log(light);
    // console.log('light', light)
    var returnData = {
      "status": 1,
      "r": Math.round(data.r / 16),
      "g": Math.round(data.g / 16),
      "b": Math.round(data.b / 16)
    };
    _axios2.default.post("http://" + light + ":8060/status", returnData).then(function (response) {
      console.log("success");
    }).catch(function (error) {
      console.log("error");
      // console.log("error", error);
    });
    res.send('send new status to light');
  } else {
    res.send('no light');
  }
});

module.exports = router;