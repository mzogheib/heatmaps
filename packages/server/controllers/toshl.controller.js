const axios = require('axios');
const toshlToken = require('./private/toshl-auth.json').token;

module.exports = {
  list: list
};

const baseUrl = 'https://api.toshl.com/';

function list(endpoint, parameters) {
  let url;
  let urlParams = [];
  let options = { auth: { username: toshlToken, password: null }};

  for (var param in parameters) {
    urlParams.push(param + '=' + parameters[param]);
  }

  url = baseUrl + endpoint + '?' + urlParams.join('&');
  
  return axios.get(url, options);
}