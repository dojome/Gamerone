import React from 'react';
import { Provider } from 'react-redux';
import { RouterProps } from 'react-router';
import { Router } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import { store, history } from 'redux/store';
import { AuthProvider } from 'provider/auth';
import Profile from '../index';

export const renderWithAuthContext = (
  component = <Profile />,
  isAuthenticated = false,
): RenderResult => {
  return {
    ...render(
      <AuthProvider isAuthenticated={isAuthenticated}>
        {component}
      </AuthProvider>,
    ),
  };
};

export const renderWithRedux = (
  component = <Profile />,
  route: string,
): RenderResult & RouterProps => {
  if (route) history.push(route);
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>,
    ),
    history,
  };
};

export const mockFetchSuccess = (success = {}) => {
  return jest.spyOn(window, 'fetch').mockImplementationOnce(
    (): Promise<any> => {
      return Promise.resolve({
        status: 200,
        json: () => success,
      });
    },
  );
};

// TODO: Use jest-fetch-mock
// https://www.npmjs.com/package/jest-fetch-mock#typescript-importing
export const mockFetchError = (errorCode = 404) => {
  return jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
    const error = new Error();
    console.log('errorCode', errorCode);
    // error.code = errorCode;
    return Promise.reject(error);
  });
};
