const axios = require('axios');
const utils = require('../../utils');

module.exports = {
  authenticate,
  deauthorize,
  me: {
    get: getMe
  },
  entries: {
    list: listEntries
  },
  tags: {
    list: listTags
  }
};

const baseApiUrl = 'https://api.toshl.com';
let auth = {};

// Sets the auth to be used in each request
function authenticate(token) {
  auth = {
    username: token,
    password: null
  };
}

function deauthorize() {
  auth = {};
}

const get = url => {
  const options = {
    auth: auth
  };
  return new Promise((resolve, reject) => {
    axios.get(url, options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.description }));
  });
}

function getMe() {
  const url = `${baseApiUrl}/me`;
  return get(url);
}

function listEntries(params) {
  const url = `${baseApiUrl}/entries${utils.makeUrlParams(params)}`;
  return get(url);
}

function listTags() {
  const url = `${baseApiUrl}/tags`;
  return get(url);
}