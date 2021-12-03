import axios from 'axios';

const request = axios.create({
  baseURL: 'url_api',
  timeout: 20000,
});

export default request;
