import React, { PureComponent } from 'react';

class Setup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...this.props.config,
      },
      errors: {
        GITHUB_PERSONAL_ACCESS_TOKEN: null,
        GITHUB_USERNAME: null,
      },
    };
  }

  handleChange = event => {
    const name = event.target.getAttribute('name');
    const { value } = event.target;

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
      errors: {
        ...this.state.errors,
        [name]: null,
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let hasError = false;

    for (const option of Object.keys(this.state.values)) {
      const value = this.state.values[option];
      const required = event.target.hasAttribute('required');

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [option]: value || !required ? null : 'required',
        },
      }));

      if (!value && required) {
        hasError = true;
      }
    }

    if (!hasError) {
      this.props.onSave(this.state.values);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="ui large form container">
        {this.props.apiError && (
          <div className="ui negative message">{this.props.apiError}</div>
        )}
        <h4 className="ui dividing header" style={{ marginTop: '2rem' }}>ATTN: GitHub Setup</h4>
        <div className={`required field${this.state.errors.GITHUB_PERSONAL_ACCESS_TOKEN ? ' error' : ''}`}>
          <label htmlFor="githubPersonalAccessToken">GitHub Personal Access Token</label>
          <input
            type="text"
            id="githubPersonalAccessToken"
            name="GITHUB_PERSONAL_ACCESS_TOKEN"
            value={this.state.values.GITHUB_PERSONAL_ACCESS_TOKEN}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className={`required field${this.state.errors.GITHUB_USERNAME ? ' error' : ''}`}>
          <label htmlFor="githubUsername">GitHub Username</label>
          <input
            type="text"
            id="githubUsername"
            name="GITHUB_USERNAME"
            value={this.state.values.GITHUB_USERNAME}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="minReviewsMap">Min Reviews per Repo</label>
          <textarea
            id="minReviewsMap"
            name="MIN_REVIEWS_MAP"
            value={this.state.values.MIN_REVIEWS_MAP}
            onChange={this.handleChange}
          />
        </div>
        <button className="ui button" type="submit">Save</button>
      </form>
    );
  }
}

export default Setup;
