import express from 'express';

import controllerModel from '../models/controller';
import axios from '../../config/axios';

const router = express.Router();


var controllers = []
router.post('/connect', (req, res) => {
  console.log("connect: ", req.body);
  var controller = {
    id: req.body.id,
    name: req.body.name,
    controller_type: req.body.controller_type,
    controller_model: req.body.controller_model,
    status: 'on',
    ip: req.body.ip
  }
  var controllerData = controllerModel (controller);
  controllerData.save();
  res.send(req.body.type + ' connected to the server')
});

router.get('/hi', (req, res) => {
  console.log("go here somehow!")
  res.send('hi backs');
});

module.exports = router;
