import express from 'express';
import ipWare from 'ipware';

import controllerModel from '../models/controller';
import axios from '../../config/axios';

const router = express.Router();
const getIp = ipWare().get_ip;

var controllers = []
router.post('/connect', (req, res) => {
  var ip = getIp(req);
  if (ip.clientIp.substr(0, 7) == "::ffff:") {
    ip.clientIp = ip.clientIp.substr(7)
  }
  console.log("connect: ", ip)
  console.log("hi");
  var controller = {
    name: req.body.name,
    controller_type: req.body.controller_type,
    status: 'on',
    ip: ip.clientIp
  }
  // var controllerData = controllerModel (controller);
  // controllerData.save();
  res.send({success: true, i_message: "connection to api successful"})
});

router.get('/hi', (req, res) => {
  console.log("go here somehow!")
  res.send('hi backs');
});

module.exports = router;
