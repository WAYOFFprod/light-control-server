'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _light_routes = require('./light_routes');

var _light_routes2 = _interopRequireDefault(_light_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(function (req, res, next) {
  // console.log('Time:', Date.now())
  next();
});
router.get('/', function (req, res) {
  console.log('hiii');
  res.send('hi back');
});

router.use('/light', _light_routes2.default);

module.exports = router;