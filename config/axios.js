import axios from 'axios';
module.exports = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
