import mongoose from 'mongoose'
import Error from './error-catcher'
import axios from '../../config/axios';
import Light from '../models/light';
import LightState from '../models/light-state';

var hueIp;
var hueLights = [];
const Hue = {
  fetchLightBridge (req, res, next) {
    axios.get('https://www.meethue.com/api/nupnp')
    .then(response => {
      hueIp = response.data[0].internalipaddress
      next()
    })
    .catch(err => {
      console.log('error getting url');
      res.status(500).json({error: err})
    })
  },
  fetchHueLights (req, res, next) {
    axios.get('http://' + hueIp + '/api/tzLiWi5iyVvZzB2vJTODhkw1MDnvNtEYSm0GqvDw/lights')
      .then(response => {
        hueLights = Hue.formatHueLights(response.data)
        next();
      })
      .catch(err => {
        console.log('error getting hue lights', err);
      })
  },
  formatHueLights(data) {
    var formatedLights = [];
    var i = 0;
    for (const [key, value] of Object.entries(data)) {
      if (Hue.checkIfLightExists(value)) {
        console.log('light already in db');
      } else {
        value.hueid = key
        var idLight = new mongoose.Types.ObjectId();
        var idState = new mongoose.Types.ObjectId();
        Hue.saveHueLights(idLight, value, idState)
        Hue.saveHueState(idState, value.state, idLight)
      }
    }
    return formatedLights;
  },
  saveHueLights (idLight, data, idState) {
    var light = new Light({
      _id: idLight,
      alternate_id: data.hueid,
      name: data.name,
      light_type: 'hue',
      color_type: 'rgb',
      dimable: true,
      ip: hueIp,
      state: idState
    })

    light.save().then(result => {
      console.log('added light: ', idLight);
    }).catch(err => {
      Error.log(err);
    })
  },
  saveHueState (idState, data, lightId) {
    var state = new LightState({
      _id: idState,
      status: data.on,
      bri: data.bri,
      hue: data.hue,
      sat: data.sat,
      ct: data.ct,
      colormode: data.colormode,
      reachable: data.reachable,
      light: lightId
    })
    console.log(state);
    state.save().then(result => {
      console.log('added LightState: ', idState);
    }).catch(err => {
      console.log('failed to add LightState: ', idState);
      Error.log(err);
    })
  },
  checkIfLightExists (data) {
    Light.findOne({
      name: data.name,
      light_type: 'hue'
    }).exec()
      .then(data => {
        if(data) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        Error.log(err);
        console.log('error finding light', data.name, err);
        return false;
      })
  },
  getHueLights () {
    return hueLights
  }
}
export default Hue
