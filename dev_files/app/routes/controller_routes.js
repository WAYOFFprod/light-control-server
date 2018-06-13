import express from 'express';
const router = express.Router();
import axios from '../../config/axios';


var controllers = []
router.post('/connect', (req, res) => {
  console.log("connect: ", req.body);
  res.send(req.body.type + ' connected to the server')
});

router.get('/hi', (req, res) => {
  console.log("go here somehow!")
  res.send('hi backs');
});

module.exports = router;
