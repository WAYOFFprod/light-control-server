import axios from 'axios';

module.exports = function(app, db) {
  app.post('/light', (req, res) => {
    var data = req.body
    console.log(data.status)
    axios.post(data.ip + "/status", {
      "status": data.status
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    res.send('Hello')
  });

  app.post('/status', (req, res) => {
    console.log(req.body)
    console.log(req.body.status);
    res.send('LED Turned ' + req.body.status)
  });
};
