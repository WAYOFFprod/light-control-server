import express from 'express';
import ipWare from 'ipware';
import mongoose from 'mongoose'

import Controller from '../models/controller';
import axios from '../../config/axios';

const router = express.Router();
const getIp = ipWare().get_ip;

var controllers = []
router.post('/', (req, res) => {
  var ip = getIp(req);
  if (ip.clientIp.substr(0, 7) == "::ffff:") {
    ip.clientIp = ip.clientIp.substr(7)
  }
  console.log("connect: ", typeof ip.clientIp)
  const controller = new Controller ({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    controller_type: req.body.controller_type,
    status: true,
    ip: ip.clientIp,
    updated: Date.now()
  });
  controller.save().then(result => {
    res.status(201).json({success: true, i_message: "connection to api successful", objectAdded: controller})
  })
  .catch(err => {
    res.status(500).json({success: false, error: err})
  });
});
router.get('/', (req, res, next) => {
  Controller.find().exec().then(data => {
    res.status(200).json({success: true, controllers: data})
  }).catch(err => {
    res.status(500).json({error: err})
  })
})
router.get('/:controllerId', (req, res) => {
  const id = req.params.controllerId
  Controller.findOne({
    _id: id
  }).exec()
    .then(data => {
      console.log(data);
      if (data) {
        res.status(200).json({success: true, i_message: "controller found", controller: data})
      } else {
        res.status(404).json({success: false, i_message: "controller not found in database"})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, error: err})
    })
});
router.delete('/:controllerId', (req, res) => {
  const id = req.params.controllerId
  Controller.remove({
    _id: id
  }).exec()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({success: false, error: err})
    })
});
router.patch('/:controllerId', (req, res) => {
  const id = req.params.controllerId
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  console.log(updateOps, id);
  Controller.findOneAndUpdate({
    _id: id
  }, updateOps).exec()
    .then(response => {
      if(response.ok == 1) {
        res.status(200).json({success: true, response: response})
      } else {
        res.status(500).json({success: false, i_message: "controller could not be updates", response: response})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, error: err})
    });
})

module.exports = router;
