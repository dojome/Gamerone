import React from 'react';
import { Router } from 'react-router-dom';
import { render, waitForElement } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { waitForSec } from 'lib/testHelper';

import EmailVerify from './index';

test('shows spinner during verify-email API call', () => {
  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
    await waitForSec(1000);
    const error = new Error();
    error.code = 404;
    return Promise.reject(error);
  });

  const history = createMemoryHistory();
  history.push('/account/email-verify/waylen.keontre@iillii.org/ASSK6Plvto');

  const { getByLabelText } = render(
    <Router history={history}>
      <EmailVerify />
    </Router>,
  );

  const spinner = getByLabelText(/spinner/i);
  const style = window.getComputedStyle(spinner);

  expect(spinner).toBeInTheDocument();
  expect(style.display).toBe('block');
});

test('shows success message for correct email and token', async () => {
  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
    const success = { status: 'success' };
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  const history = createMemoryHistory();
  history.push('/account/email-verify/waylen.keontre@iillii.org/ASSK6Plvto');

  const { getByLabelText, queryByLabelText } = render(
    <Router history={history}>
      <EmailVerify />
    </Router>,
  );

  await waitForElement(() => getByLabelText(/success-message/));

  expect(queryByLabelText(/spinner/i)).toBe(null);
});

test('shows error message for incorrect email and token', async () => {
  // mock out window.fetch for the test
  jest.spyOn(window, 'fetch').mockImplementationOnce(async () => {
    const error = new Error();
    error.code = 404;
    return Promise.reject(error);
  });

  const history = createMemoryHistory();
  history.push('/account/email-verify/waylen.keontre@iillii.org/ASSK6Plvto');

  const { getByLabelText, queryByLabelText } = render(
    <Router history={history}>
      <EmailVerify />
    </Router>,
  );

  await waitForElement(() => getByLabelText(/error-message/));
  expect(queryByLabelText(/spinner/i)).toBe(null);
});
