import api from '../api';
import config from './config';
import moment from 'moment';

const Activities= { 
  Ride: { label: 'Bike', image: '🚲' },
  Run: { label: 'Run', image: '🏃‍♂️' },
  Walk: { label: 'Walk' , image: '🚶‍♂️' },
};

const getOauthUrl  = () => api.get({ endpoint: 'feed-auth', params: { source: 'strava' }});
const authenticate = payload => api.post({ endpoint: 'feed-auth', payload, params: { source: 'strava' }});
const deauthorize = () => api.delete({ endpoint: 'feed-auth', params: { source: 'strava' }});
const getActivities = params => api.get({ endpoint: 'feed', params: { source: 'strava', ...params }});

const makeMapData = activities => activities.map(activity => {
  const label = Activities[activity.type].label;
  const distance = formatDistance(activity.distance);
  return { 
    id: activity.id,
    encodedPath: activity.map.polyline,
    title: `${label} ${distance}`,
    subTitle: moment(activity.start_date).format('h:mm a'),
    description: activity.description || ''
  };
});

const formatDistance = distance => {
  const kms = (distance / 1000).toLocaleString(
    undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  return `${kms} km`;
}

const makeEntries = (activities) => {
  return activities.map(activity => {
    const stravaConfig = config.find(c => c.id === 'strava');
    const image = Activities[activity.type].image;
    const label = Activities[activity.type].label;
    const value = formatDistance(activity.distance);

    return {
      id: activity.id,
      logo: stravaConfig.image,
      timeStamp: moment(activity.start_date).unix(),
      timeLabel: moment(activity.start_date).format('h:mm a'),
      image,
      label,
      value
    };
  })
  .sort((a, b) => a.timeStamp - b.timeStamp);
}

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
  getActivities,
  makeMapData,
  makeEntries
};