import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PasswordResetNew from './index';
import { act } from 'react-dom/test-utils';

/**
 * Mock input change events and fill in the form
 *
 * @param {String} password
 * @param {String} confirmPassword
 */
const fillInForm = (password = '', confirmPassword = '', route) => {
  const history = createMemoryHistory();
  const utils = render(
    <Router history={history}>
      <PasswordResetNew />
    </Router>,
  );

  if (route) history.push(route);

  const pwdElm = utils.getByLabelText(/^password$/);
  const conPwdElm = utils.getByLabelText(/^confirm-password$/);

  act(() => {
    if (password) fireEvent.change(pwdElm, { target: { value: password } });
    if (confirmPassword)
      fireEvent.change(conPwdElm, { target: { value: confirmPassword } });

    fireEvent.blur(conPwdElm);
    fireEvent.blur(pwdElm);
  });

  return {
    pwdElm,
    conPwdElm,
    history,
    ...utils,
  };
};

const SUBMIT_BUTTON_NAME = 'Set new password';

describe('form validation', () => {
  test('shows required text', async () => {
    const { getByLabelText } = fillInForm('', '');

    await waitForElement(() => getByLabelText(/^password-error/));
    expect(getByLabelText(/^password-error/)).toHaveTextContent(
      'Password is required',
    );

    await waitForElement(() => getByLabelText(/^confirm-password-error/));
    expect(getByLabelText(/^confirm-password-error/)).toHaveTextContent(
      'Confirm password is required',
    );
  });

  test('shows min length error text', async () => {
    const { getByLabelText } = fillInForm('2letter', '3letter');

    await waitForElement(() => getByLabelText(/^password-error/));
    expect(getByLabelText(/^password-error/)).toHaveTextContent(
      'Password must be at least 8 characters long',
    );

    await waitForElement(() => getByLabelText(/^confirm-password-error/));
    expect(getByLabelText(/^confirm-password-error/)).toHaveTextContent(
      'Confirm password must be at least 8 characters long',
    );
  });

  test('tests password strength', async () => {
    const { getByLabelText } = fillInForm('xyzsterxwP$#');

    await waitForElement(() => getByLabelText(/^password-error/));
    expect(getByLabelText(/^password-error/)).toHaveTextContent(
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  test('tests password strength again', async () => {
    const { getByLabelText } = fillInForm('pwd#saPx');

    await waitForElement(() => getByLabelText(/^password-error/));
    expect(getByLabelText(/^password-error/)).toHaveTextContent(
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  test('matches each other', async () => {
    const { getByLabelText } = fillInForm('Pwd@xs3y', 'pwd@xs3y');

    await waitForElement(() => getByLabelText(/^confirm-password-error/));
    expect(getByLabelText(/^confirm-password-error/)).toHaveTextContent(
      'Passwords do not match',
    );
  });
});

describe('functionality test', () => {
  test('should not show success message when token is missing', async () => {
    const route = '/account/password-reset-new?email=tokenismissing';
    const { getByLabelText, getByRole } = fillInForm(
      'P2s2W$aosr',
      'P2s2W$aosr',
      route,
    );

    await act(async () => {
      fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
    });

    await waitForElement(() => getByLabelText(/^message/));
    expect(getByLabelText(/^message/)).not.toHaveTextContent(
      'Password is reset successfully',
    );
  });

  test('should not show success message when email is missing', async () => {
    const route = '/account/password-reset-new?token=emailismissing';
    const { getByLabelText, getByRole } = fillInForm(
      'P2s2W$aosr',
      'P2s2W$aosr',
      route,
    );

    await act(async () => {
      fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
    });

    await waitForElement(() => getByLabelText(/^message/));
    expect(getByLabelText(/^message/)).not.toHaveTextContent(
      'Password is reset successfully',
    );
  });

  test('should not show success message when token or email is not correct', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
      const error = new Error('Email is not found');
      error.code = 404;
      return Promise.reject(error);
    });

    const route = '/account/password-reset-new?token=xyz&email=xyz@cc.com';
    const { getByLabelText, getByRole } = fillInForm(
      'P2s2W$aosr',
      'P2s2W$aosr',
      route,
    );

    await act(async () => {
      fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
    });

    await waitForElement(() => getByLabelText(/^message/));
    expect(getByLabelText(/^message/)).not.toHaveTextContent(
      'Password is reset successfully',
    );
  });

  test('should show success message when token and email are correct', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      const success = { status: 'success' };
      return Promise.resolve({
        status: 200,
        json: () => success,
      });
    });

    const route = '/account/password-reset-new?token=xyz&email=xyz@cc.com';
    const { getByLabelText, getByRole } = fillInForm(
      'P2s2W$aosr',
      'P2s2W$aosr',
      route,
    );

    await act(async () => {
      fireEvent.submit(getByRole('button', { name: SUBMIT_BUTTON_NAME }));
    });

    await waitForElement(() => getByLabelText(/^message/));
    expect(getByLabelText(/^message/)).toHaveTextContent(
      'Password is reset successfully',
    );
  });
});
