import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import SponsorForm from './index';

// Snapshot testing for SponsorForm Initial
test('sponsors list initial', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <SponsorForm />
      </MemoryRouter>
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// DOM testing to show edit form
afterEach(cleanup);
it('show edit form after click Add button', () => {
  const { queryByLabelText, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SponsorForm />
      </MemoryRouter>
    </Provider>,
  );

  expect(queryByLabelText(/sponsorName/i)).toBeFalsy();
  expect(queryByLabelText(/sponsorUrl/i)).toBeFalsy();

  act(() => {
    fireEvent.click(getByText('Add'));
  });

  expect(queryByLabelText(/sponsorName/i)).toBeTruthy();
  expect(queryByLabelText(/sponsorUrl/i)).toBeTruthy();
});

/**
 * Mock input event to fill the form with sponsor name and link
 *
 * @return {Object}
 */
const renderSponsorForm = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <SponsorForm />
      </MemoryRouter>
    </Provider>,
  );
};

/**
 * Fill in and submit the form
 *
 * @param {Object} utils
 * @param {String} sponsorName
 * @param {String} sponsorLink
 * @param {String} sponsorImage
 */
const fillAndSubmitForm = (
  utils,
  {
    sponsorName,
    sponsorLink,
    sponsorImage = 'user_content/1498/sponsor/RtIgchfZlIPWlUdtIZWPpbQZJ1rZiV7evklzwzQt.jpeg',
  },
) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/sponsorName/i), {
      target: { value: sponsorName },
    });
    fireEvent.change(getByLabelText(/sponsorUrl/i), {
      target: { value: sponsorLink },
    });
    fireEvent.submit(getByRole('button', { name: 'Create a sponsor' }));
  });
};

test('create a sponsor', async () => {
  const utils = renderSponsorForm();
  const sponsor = {
    sponsorName: 'testSponsorName',
    sponsorLink: 'testSponsorLink',
    sponsorImage:
      'user_content/1498/sponsor/RtIgchfZlIPWlUdtIZWPpbQZJ1rZiV7evklzwzQt.jpeg',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/sponsors')) {
      success = sponsor;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, sponsor);

  spy.mockRestore();
});

test('update a sponsor', async () => {
  const utils = renderSponsorForm();
  const sponsor = {
    id: 5,
    sponsorName: 'testSponsorName',
    sponsorLink: 'testSponsorLink',
    sponsorImage:
      'user_content/1498/sponsor/RtIgchfZlIPWlUdtIZWPpbQZJ1rZiV7evklzwzQt.jpeg',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/sponsors')) {
      success = sponsor;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, sponsor);

  spy.mockRestore();
});
