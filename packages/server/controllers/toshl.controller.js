const apiToshl = require('../vendor-apis/toshl');

module.exports = {
  authenticate,
  deauthorize,
  getEntries
};

const cache = {};

function authenticate(code) {
  return new Promise((resolve, reject) => {
    if (!code) {
      reject();
    } else {
      apiToshl.authenticate(code);
      resolve();
    }
  });
}

function deauthorize() {
  return new Promise((resolve, reject) => {
    apiToshl.deauthorize();
    cache = {};
    resolve();
  });
}

function getTags () {
  if (cache.tags) {
    return Promise.resolve(cache.tags);
  } else {
    return apiToshl.tags.list()
      .then(tags => {
        // Map the array of tags to an object and cache
        cache.tags = tags.reduce((map, tag) => (map[tag.id] = tag.name, map), {});
        return cache.tags;
      });
  }
}

const decorateEntryWithTags = entry => {
  return getTags()
    .then(tags => {
      entry.tags = entry.tags.map(tagId => {
        return {
          id: tagId,
          name: tags[tagId]
        };
      });
      return entry;
    });
}

function getEntries (parameters) {
  var decoratedEntries;
  return apiToshl.entries.list(parameters)
    .then(entries => { decoratedEntries = entries })
    .then(getTags)
    .then(tags => {
      decoratedEntries.forEach(decoratedEntry => {
        decoratedEntry.tags = decoratedEntry.tags.map(tagId => {
          return { id: tagId, name: tags[tagId] || 'No tag' };
        });
      });
      return decoratedEntries;
    });
}