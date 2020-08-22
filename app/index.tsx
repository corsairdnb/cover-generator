import React, { Fragment } from 'react';
import { RouterState } from 'connected-react-router';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { history, configuredStore } from './store';
import './app.global.scss';
import { initialContentState } from './features/cover/slice';

const store = configuredStore({
  content: initialContentState,
  counter: {
    value: 0
  },
  router: {} as RouterState
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  /* eslint-disable-next-line global-require */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});
