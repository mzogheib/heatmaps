const ctrlToshl = require('../controllers/toshl.controller');
const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  authenticate,
  deauthorize,
  listEntries: list
};

function authenticate(req, res) {
  const code = req.body.code;
  const userId = req.userId;

  if (!code) {
    respond({ status: 400, message: 'No authorization code provided.' });
  } else {
    ctrlToshl.authenticate(code)
      .then(token => ctrlUsers.setAccessToken(userId, 'toshl', token))
      .then(onSuccess)
      .catch(onError);
  }

  function onSuccess(response) {
    respond({ status: 200 });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function deauthorize(req, res) {
  const userId = req.userId;

  ctrlToshl.deauthorize()
    .then(() => ctrlUsers.setAccessToken(userId, 'toshl', null))
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200 });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function list(req, res) {
  const params = req.query;
  const userId = req.userId;

  ctrlUsers.getAccessToken(userId, 'toshl')
    .then(token => ctrlToshl.getEntries(params, token))
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200, message: response });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}
