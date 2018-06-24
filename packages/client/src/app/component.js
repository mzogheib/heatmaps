import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.css';
import routes from '../routes';
import Header from '../components/header';
import SideBar from '../components/side-bar';
import WelcomeModal from '../components/welcome-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWelcomeCancel = this.handleWelcomeCancel.bind(this);
    this.handleWelcomeConnectFeeds = this.handleWelcomeConnectFeeds.bind(this);
    this.handleSideBarHelpClick = this.handleSideBarHelpClick.bind(this);
    this.state = {
      isLoading: true,
      showWelcomeModal: false
    }
  }

  componentDidMount() {
    this.props.onMount().then(() => this.setState({ 
      isLoading: false,
      showWelcomeModal: !this.props.feedsConnected
    }));
  }

  handleWelcomeCancel() {
    this.setState({ showWelcomeModal: false });
  }

  handleWelcomeConnectFeeds() {
    this.setState({ showWelcomeModal: false });
    this.props.history.push('/settings')
  }

  handleSideBarHelpClick() {
    this.setState({ showWelcomeModal: true });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderApp() {
    return (
      <div className='app'>
        <SideBar onHelpClick={this.handleSideBarHelpClick}/>
        <div className='app__right'>
          <Header />
          <div className='app__main'>
            <Switch>
              {routes.map((route, index) => <Route key={index} path={route.path} exact={route.exact} component={route.mainComponent} />)}
            </Switch>
          </div>
        </div>
        <WelcomeModal isOpen={this.state.showWelcomeModal} onCancel={this.handleWelcomeCancel} onConnectFeeds={this.handleWelcomeConnectFeeds} />
      </div>
    );
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderApp();
  }
}

export default App;