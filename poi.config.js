module.exports = {
  presets: [
    require('poi-preset-react')(),
  ],
  entry: {
    client: './src/index.jsx',
    poll: './src/poll.js',
  },
  hash: false,
};
