import express from 'express';
import ipWare from 'ipware';
import mongoose from 'mongoose'

import Light from '../models/light';
import axios from '../../config/axios';
import Hue from '../middleware/hue-lights'

const router = express.Router();
const getIp = ipWare().get_ip;

router.get('/fetch-hue', Hue.fetchLightBridge, Hue.fetchHueLights, (req, res) => {
  console.log("done?");
  res.status(200).json( { success: true } )
})

router.post('/', (req, res) => {
  var ip = getIp(req);
  if (ip.clientIp.substr(0, 7) == "::ffff:") {
    ip.clientIp = ip.clientIp.substr(7)
  }
  console.log("connect: ", typeof ip.clientIp)
  const light = new Controller ({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    controller_type: req.body.controller_type,
    status: true,
    ip: ip.clientIp,
    updated: Date.now()
  });
  light.save().then(result => {
    res.status(201).json({success: true, i_message: "connection to api successful", objectAdded: controller})
  })
  .catch(err => {
    res.status(500).json({success: false, error: err})
  });
});
router.get('/', (req, res, next) => {
  Light.find().populate('state').select('_id alternate_id name light_type color_type dimable ip state').exec().then(data => {
    res.status(200).json({success: true, count: data.length, controllers: data})
  }).catch(err => {
    res.status(500).json({error: err})
  })
})
router.get('/:lightId', (req, res) => {
  const id = req.params.lightId
  Light.findOne({
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
router.delete('/:lightId', (req, res) => {
  const id = req.params.lightId
  Light.remove({
    _id: id
  }).exec()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({success: false, error: err})
    })
});
router.patch('/:lightId', (req, res) => {
  const id = req.params.lightId
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  console.log(updateOps, id);
  Light.findOneAndUpdate({
    _id: id
  }, updateOps).exec()
    .then(response => {
      if(response.ok == 1) {
        res.status(200).json({success: true, response: response})
      } else {
        res.status(500).json({success: false, i_message: "light could not be updates", response: response})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, error: err})
    });
})

router.post('/light-toggle', (req, res) => {
  var data = req.body
  //console.log(data)
  if(light !== undefined) {
    // console.log(light);
    // console.log('light', light)
    var returnData = {
      "status": 1,
      "r": Math.round(data.r/16),
      "g": Math.round(data.g/16),
      "b": Math.round(data.b/16),
    }
    axios.post("http://" + light + ":8060/status", returnData)
    .then(response => {
      console.log("success");
      res.status(201).json({success: true, i_message: 'send new status to light'});
    })
    .catch(err => {
      console.log("error");
      res.status(500).json({success: false, i_message: 'could not sent new status to light', error: err});
    });
  } else {
    res.status(404).json({ success: false, i_message: 'light not found'})
  }
});


/**
* MIDDLEWARE
**/


module.exports = router;
