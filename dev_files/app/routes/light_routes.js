import express from 'express';
const router = express.Router();
import axios from '../../config/axios';


var light, button = null
router.post('/connect', (req, res) => {
  console.log("connect: ", req.body);
  if (req.body.type === 'light') {
    light = req.body.ip
  } else if (req.body.type === 'button') {
    button = req.body.ip
  }
  res.send(req.body.type + ' connected to the server')
});

router.get('/hi', (req, res) => {
  console.log("go here somehow!")
  res.send('hi backs');
});


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
    })
    .catch(error => {
      console.log("error");
      // console.log("error", error);
    });
    res.send('send new status to light');
  } else {
    res.send('no light')
  }
});

module.exports = router;
