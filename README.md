# attn-github

A Chrome extension that shows lists of pull requests that require your attention.

## Installation/Usage

1. Clone this repository to your computer.
   ```sh
   git clone https://github.com/mmiller42/attn-github.git
   cd attn-github
   ```

1. Install dependencies.
   ```sh
   yarn
   ```

1. Build the project.
   ```sh
   yarn build
   ```

1. Navigate to the Chrome Extensions manager (chrome://extensions). Check the *Developer mode* checkbox if necessary.

1. Click the _Load unpacked extension…_ button. Locate the `attn-github` repository and select the `dist` directory.

1. Generate a GitHub Personal Access Token in [Settings](https://github.com/settings/tokens/new). Select all the scopes.

1. Click the ATTN: GitHub extension icon in the Chrome toolbar. Enter your personal access token and GitHub username in the appropriate fields, then click _Save_.

## Development

ATTN: GitHub is a [React](https://reactjs.org/) app built using [Poi](https://poi.js.org/).
