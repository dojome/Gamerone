import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import SignUpPage from './index';

import { waitForSec } from 'lib/testHelper';

/**
 * Mock input event to fill the form with email and password
 *
 * @param {String} email
 * @param {String} password
 * @return {Object}
 */
const renderSignUpPage = () => {
  const utils = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    </Provider>,
  );

  return {
    ...utils,
  };
};

/**
 * Fill in the form and submit the form
 *
 * @param {Object} utils
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @param {String} username
 * @param {String} password
 */
const fillAndSubmitSignUpForm = async (
  utils,
  { firstName, lastName, email, username, password = 'password' },
) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/firstname/i), {
      target: { value: firstName },
    });
    fireEvent.change(getByLabelText(/lastname/i), {
      target: { value: lastName },
    });
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: username },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: password },
    });
    fireEvent.submit(getByRole('button', { name: 'Sign Up' }));
  });
};

test('checks validation for firstName, lastName and username fields', async () => {
  const { getByText, getByLabelText } = renderSignUpPage();
  const checkValidationText = async (elm, value, errorText) => {
    fireEvent.change(elm, { target: { value } });
    fireEvent.blur(elm);
    await waitForElement(() => getByText(errorText));
    expect(getByText(errorText)).toBeInTheDocument();
  };

  const firstNameElm = getByLabelText(/firstname/i);
  const usernameElm = getByLabelText(/username/i);
  const lastNameElm = getByLabelText(/lastname/i);

  // 1) Set 'firstName' empty
  await checkValidationText(firstNameElm, '', 'First name is required');

  // 2) Set a letter to 'firstName'
  await checkValidationText(
    firstNameElm,
    'x',
    'First name must be at least 2 letters long',
  );

  // 3) Set 'username' empty
  await checkValidationText(usernameElm, '', 'Username is required');

  // 4) Set 2 letters to 'username'
  await checkValidationText(
    usernameElm,
    'xx',
    'Username must be at least 3 letters long',
  );

  // 5) Set 'lastName' empty
  await checkValidationText(lastNameElm, '', 'Last name is required');

  // 6) Set a letter to 'lastName'
  await checkValidationText(
    lastNameElm,
    'y',
    'Last name must be at least 2 letters long',
  );
});

test('checks validation for email field', async () => {
  const { getByRole, getByText, getByLabelText } = renderSignUpPage();
  const submitForm = async () => {
    await act(async () => {
      fireEvent.submit(getByRole('button', { name: 'Sign Up' }));
    });
  };

  const emailElm = getByLabelText(/email/i);

  // 1) Set 'email' empty
  fireEvent.change(emailElm, { target: { value: '' } });
  await submitForm();
  expect(getByText('Email is required')).toBeInTheDocument();

  // 2) Set an incorrect email
  fireEvent.change(emailElm, { target: { value: 'xyz' } });
  await submitForm();
  expect(getByText('This is not correct email format')).toBeInTheDocument();

  // 3) Set an incorrect email
  fireEvent.change(emailElm, { target: { value: 'xyz@yy.' } });
  await submitForm();
  expect(getByText('This is not correct email format')).toBeInTheDocument();
});

test('checks duplicated email', async () => {
  const { getByText, getByLabelText, queryByLabelText } = renderSignUpPage();
  const duplicationMessage = 'This email is already registered';

  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
    const error = new Error();
    error.code = 409;
    return Promise.reject(error);
  });

  const emailElm = getByLabelText(/email/i);

  // checks error message
  fireEvent.change(emailElm, { target: { value: 'duplicated@email.com' } });
  await waitForElement(() => getByText(duplicationMessage));
  expect(getByText(duplicationMessage)).toBeInTheDocument();

  // checks whether spinner is invisible
  expect(queryByLabelText(/spinner/i)).toBe(null);
});

test('checks duplicated username', async () => {
  const { getByText, getByLabelText, queryByLabelText } = renderSignUpPage();
  const duplicationMessage = 'This username is duplicated';

  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
    const error = new Error();
    error.code = 409;
    return Promise.reject(error);
  });

  const usernameElm = getByLabelText(/username/i);

  // checks error message
  fireEvent.change(usernameElm, { target: { value: 'duplicated-username' } });
  await waitForElement(() => getByText(duplicationMessage));
  expect(getByText(duplicationMessage)).toBeInTheDocument();

  // checks whether spinner is invisible
  expect(queryByLabelText(/spinner/i)).toBe(null);
});

test('creates a new user and saves token inside localStorage', async () => {
  const utils = renderSignUpPage();
  const user = {
    email: 'xyz@domain.com',
    firstName: 'test',
    lastName: 'user',
    username: 'testuser',
    password: 'P@s2wordal',
    id: 6574,
  };
  const idToken = 'test_token';

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('/signup')) {
      success = { user, token: idToken };
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  await fillAndSubmitSignUpForm(utils, user);

  await waitForSec(1000);

  // check token with one from localStorage
  expect(utils.asFragment()).toMatchSnapshot();
  expect(localStorage.getItem('id_token')).toBe(idToken);

  // check user with one from the state
  expect(store.getState().Auth.user).toStrictEqual(user);

  spy.mockRestore();
});
