import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}
