import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import PasswordReset from './index';
import { act } from 'react-dom/test-utils';

/**
 * Mock input event to email element and set value
 *
 * @param {String} email
 */
const setEmail = async (email = '') => {
  const utils = render(<PasswordReset />);
  const emailElement = utils.getByRole('textbox', { name: 'email' });

  await act(async () => {
    fireEvent.change(emailElement, { target: { value: email } });
  });

  return {
    emailElement,
    ...utils,
  };
};

const SUBMIT_BUTTON_NAME = 'Reset';

test('renders reset password form title', () => {
  const { getByText } = render(<PasswordReset />);

  const titleElement = getByText('Password Reset');
  expect(titleElement).toBeInTheDocument();
});

test('shows required error when no email is inputted', async () => {
  const { getByRole, getByText } = await setEmail('');

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
  });

  expect(getByText('Email is required')).toBeInTheDocument();
});

test('shows invalid email error when incorrect email is inputted', async () => {
  const { getByRole, getByText } = await setEmail('xyzc@cc.');

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
  });

  expect(getByText('This is not correct email format')).toBeInTheDocument();
});

test('shows not found message when forgot password API fails', async () => {
  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    const error = new Error();
    error.code = 404;
    error.message = "Not Found, email couldn't found";
    return Promise.reject(error);
  });

  const { getByRole, getByLabelText } = await setEmail('abc@domain.xyz');

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
  });

  await waitForElement(() => getByLabelText(/message/i));

  expect(getByLabelText(/message/i)).toHaveTextContent('Not Found');
});

test('shows success message when forgot password API works successfully', async () => {
  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    const success = { status: 'success' };
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  const { getByRole, getByLabelText } = await setEmail('vadim@gmail.com');

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
  });

  await waitForElement(() => getByLabelText(/message/i));

  expect(getByLabelText(/message/i)).toHaveTextContent(
    'Password reset email is sent to this address',
  );
});
