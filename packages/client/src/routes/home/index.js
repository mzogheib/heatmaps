import { connect } from 'react-redux';
import { refreshFeeds } from '../../store/feeds';
import Home from './component';

const mapDispatchToProps = dispatch => ({
  onMount: () => {
    dispatch(refreshFeeds());
  }
});

export default connect(null, mapDispatchToProps)(Home);