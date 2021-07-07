import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/react';
import App from './containers/App';
import TagManager from 'react-gtm-module';
import 'styles/icon-font.scss';
import 'styles/style.scss';
import { GTM_ID, GTM_AUTH, GTM_PREVIEW } from 'utils/constants';
import { sentryConfig } from 'utils/sentry';
import FallbackComponent from 'components/common/FallbackComponent';

const tagManagerArgs = {
  gtmId: GTM_ID,
  auth: GTM_AUTH,
  preview: GTM_PREVIEW,
  dataLayerName: 'GamerOne',
};

TagManager.initialize(tagManagerArgs);

Sentry.init(sentryConfig);

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
