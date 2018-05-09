const axios = require('axios');
const auth = require('./private/toshl-auth');
const querystring = require('querystring');

module.exports = {
  oauth: {
    url: oauthUrl,
    token,
    deauthorize,
    refresh: refreshAuth
  },
  entries: {
    list: listEntries
  },
  tags: {
    list: listTags
  }
};

const baseApiUrl = 'https://api.toshl.com';
const baseOauthUrl = 'https://toshl.com/oauth2';
const makeBasicAuthHeader = (username, password) => { return { username: auth.client_id, password: auth.client_secret }; };

function get({ baseURL = baseApiUrl, url, headers, params }) {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'GET',
      baseURL,
      url,
      headers,
      params
    };
    axios.request(config)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.description }));
  });
}

function post(url, payload, options) {
  return new Promise((resolve, reject) => {
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.post(url, querystring.stringify(payload), options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data }));
  });
}

function oauthUrl () {
  return `${baseOauthUrl}/authorize?client_id=${auth.client_id}&response_type=code&redirect_uri=http://localhost:3000`;
}

function token(code) {
  const url = `${baseOauthUrl}/token`;
  const payload = {
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000'
  };
  options = {
    auth: makeBasicAuthHeader(auth.client_id, auth.client_secret)
  };
  return post(url, payload, options);
}

function deauthorize(auth) {
  const url = `${baseOauthUrl}/revoke`;
  const payload = {
    refresh_token: auth.refresh_token
  };
  const options = {
    headers: { Authorization: `Bearer ${auth.access_token}` }
  };
  return post(url, payload, options);
}

function refreshAuth(expiredAuth) {
  const url = `${baseOauthUrl}/token`;
  const payload = {
    grant_type: 'refresh_token',
    refresh_token: expiredAuth.refresh_token
  };
  options = {
    auth: makeBasicAuthHeader(auth.client_id, auth.client_secret)
  };
  return post(url, payload, options);
}

function listEntries(params, token) {
  return get({ url: '/entries', headers: { Authorization: `Bearer ${token}` }, params: { ...params } });
}

function listTags(token) {
  return get({ url: '/tags', headers: { Authorization: `Bearer ${token}` }});
}