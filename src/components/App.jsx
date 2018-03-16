import React, { PureComponent } from 'react';
import Attention from './Attention';
import Setup from './Setup';
import { getConfig, setConfig } from '../services/config';

class App extends PureComponent {
  state = {
    config: null,
    apiError: null,
  };

  async componentDidMount() {
    this.setState({ config: await getConfig() });
  }

  setConfig = config => {
    setConfig(config);
    this.setState({
      config,
      apiError: null,
    });
  };

  setApiError = apiError => this.setState({
    config: {
      GITHUB_PERSONAL_ACCESS_TOKEN: '',
      GITHUB_USERNAME: '',
    },
    apiError,
  });

  render() {
    return (
      <div style={{ padding: '1em' }}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    if (!this.state.config) {
      return null;
    } else if (this.state.config.GITHUB_PERSONAL_ACCESS_TOKEN && this.state.config.GITHUB_USERNAME) {
      return <Attention config={this.state.config} setApiError={this.setApiError} />;
    } else {
      return <Setup config={this.state.config} onSave={this.setConfig} apiError={this.state.apiError} />;
    }
  }
}

export default App;
