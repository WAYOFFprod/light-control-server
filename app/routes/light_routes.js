import axios from 'axios';

module.exports = function(app, db) {
  app.post('/light', (req, res) => {
    var data = req.body
    console.log(data)
    console.log(data.status)
    axios.post(data.ip + "/status", {
      "status": data.status
    })
    .then(response => {
      console.log(response.data.url);
      console.log(response.data.explanation);
    })
    .catch(error => {
      console.log(error);
    });
    res.send('Hello')
  });

  app.post('/status', (req, res) => {
    console.log(req.body)
    req.body.status
    res.send('LED Turned ' + req.body.status)
  });
};
