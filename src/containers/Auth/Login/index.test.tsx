import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import LoginPage from './index';
import { MemoryRouter } from 'react-router-dom';

/**
 * Mock input event to fill the form with email and password
 *
 * @param {String} email
 * @param {String} password
 * @return {Object}
 */
const fillLogInForm = (email = '', password = '') => {
  const utils = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );

  const emailElement = utils.getByRole('textbox', { name: 'email' });
  const passwordElement = utils.getByLabelText(/password/i);

  fireEvent.change(emailElement, { target: { value: email } });
  fireEvent.change(passwordElement, { target: { value: password } });

  return {
    emailElement,
    passwordElement,
    ...utils,
  };
};

test('shows required error text when trying to submit empty form', async () => {
  const { getByRole, getByText } = fillLogInForm();

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: 'Log In' }));
  });

  expect(getByText('Email is required')).toBeInTheDocument();
  expect(getByText('Password is required')).toBeInTheDocument();
});

test('shows incorrect credentials message', async () => {
  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    const error = new Error();
    error.code = 401;
    return Promise.reject(error);
  });

  const { getByRole, getByLabelText } = fillLogInForm(
    'xyzc@cc.com',
    'password',
  );

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: 'Log In' }));
  });

  await waitForElement(() => getByLabelText(/message/i));

  expect(getByLabelText(/message/i)).toHaveTextContent(
    'Email or password is not correct',
  );
});

test('works correctly for correct credentials and sets localStorage', async () => {
  const email = 'xyz@domain.com';
  const idToken = 'test_token';

  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    const success = { user: { email }, token: idToken };
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  const { getByRole } = fillLogInForm(email, 'password');

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: 'Log In' }));
  });

  expect(localStorage.getItem('id_token')).toBe(idToken);
});
