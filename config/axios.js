import axios from 'axios';
module.exports = axios.create({
  baseURL: 'http://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
