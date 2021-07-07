import React from 'react';
import { Provider } from 'react-redux';

import Routes from './router';
import { store, history } from 'redux/store';
import { ThemeProvider } from 'provider/theme';

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Routes history={history} />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
