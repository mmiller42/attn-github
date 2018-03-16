import React, { PureComponent } from 'react';
import PrLinkList from './PrLinkList';
import findPullRequests from '../services/findPullRequests';

class Attention extends PureComponent {
  state = {
    requestsPendingMyReview: [],
    myUnreviewedRequests: [],
    myReadyRequests: [],
    myRejectedRequests: [],
    prompt: false,
  };

  componentDidMount() {
    this.loadData().catch(err => this.props.setApiError(err.message));
  }

  handleConfigureClick = () => this.setState({ prompt: true });

  handleConfirmClick = () => {
    this.setState({ prompt: false });
    this.props.setApiError(null);
  };

  handleCancelClick = () => this.setState({ prompt: false });

  render() {
    const { requestsPendingMyReview, myUnreviewedRequests, myReadyRequests, myRejectedRequests } = this.state;
    return (
      <div className="ui container">
        {
          this.state.prompt
            ? (
              <div className="ui warning message">
                <i onClick={this.handleCancelClick} className="close icon" />
                <div className="header">
                  Are you sure you want to reconfigure?
                </div>
                <p>
                  Reconfiguring will clear your current GitHub Personal Access Token, so you will need to generate a new one.
                </p>
                <button onClick={this.handleConfirmClick} className="ui yellow button">Continue</button>
              </div>
            )
            : (
              <button
                onClick={this.handleConfigureClick}
                title="Reconfigure"
                className="mini circular ui icon button"
                style={{ position: 'absolute', top: '3px', right: 0 }}
              >
                <i className="cog icon" />
              </button>
            )
        }
        <div style={{ marginTop: '-1rem' }}>
          <PrLinkList title="Requests Pending My Review" pullRequests={requestsPendingMyReview} color="yellow" />
          <PrLinkList title="My Ready Requests" pullRequests={myReadyRequests} color="green" />
          <PrLinkList title="My Rejected Requests" pullRequests={myRejectedRequests} color="red" />
          <PrLinkList title="My Unreviewed Requests" pullRequests={myUnreviewedRequests} color="grey" />
        </div>
      </div>
    )
  }

  loadData() {
    return findPullRequests(this.props.config, updater => this.setState(updater));
  }
}

export default Attention;
