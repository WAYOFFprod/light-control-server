import axios from 'axios';
module.exports = axios.create({
  baseURL: 'http://192.168.0.227:8060',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': 0
  }
});
