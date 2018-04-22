import Api from '../_utils/api';
import utils from '../_utils';

const getOauthUrl  = () => Api.get('toshl-auth');
const authenticate = payload => Api.post('toshl-auth', payload);
const deauthorize = () => Api.post('toshl-deauth');
const getEntries = params => Api.get('toshl', params);

const makeMarkerDataFromEntries = entries => {
  return entries.filter(entry => entry.location).map(entry => {
    return {
      latitude: entry.location.latitude,
      longitude: entry.location.longitude
    };
  });
};

// TODO: Dynamically calculate the user's locale instead of hardcoding en-AU
const formatAmount = (amount, currencyCode) => {
  return Math.abs(amount).toLocaleString(
    'en-AU', { style: 'currency', currency: currencyCode }
  );
}

// TODO: Handle multiple currencies. This implementation assumes the first currency is the same as the rest.
// TODO: Handle incomes. This implementation assumes expenses only
const makeSummary = entries => {
  const totalAmount = entries.reduce((accumulator, entry) => accumulator + entry.amount, 0);
  return entries.length ? formatAmount(totalAmount, entries[0].currency.code) : 'None';
};

const makeSummaryList = entries => {
  return entries.map(entry => {
    const timeLabel = utils.extractTimeString(entry.desc) || '12:00:00';
    const timeStamp = new Date(`${entry.date} ${timeLabel}`);

    const label = entry.tags.map(tag => tag.name).join(', ');

    const value = formatAmount(entry.amount, entry.currency.code);

    return {
      timeStamp: timeStamp.getTime(),
      timeLabel: timeLabel,
      label: label,
      value: value
    };
  })
  .sort((a, b) => a.timeStamp - b.timeStamp);
};

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
  getEntries,
  makeMarkerDataFromEntries,
  makeSummary,
  makeSummaryList
};