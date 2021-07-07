import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import SocialNetworkForm from './index';

// Snapshot testing for SocialNetworkForm Initial
test('social network list initial', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <SocialNetworkForm />
      </MemoryRouter>
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Mock input event to fill the form with social network id
 *
 * @return {Object}
 */
const renderSocialNetworkForm = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <SocialNetworkForm />
      </MemoryRouter>
    </Provider>,
  );
};

/**
 * Fill in and submit the form
 *
 * @param {Object} utils
 * @param {String} discord
 * @param {String} twitter
 * @param {String} snapshot
 * @param {String} facebook
 * @param {String} instagram
 */
const fillAndSubmitForm = (utils, { discord, twitter, snapshot }) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/discord/i), {
      target: { value: discord },
    });
    fireEvent.change(getByLabelText(/twitter/i), {
      target: { value: twitter },
    });
    fireEvent.submit(getByRole('button', { name: 'Save' }));
  });
};

test('update socials', async () => {
  const utils = renderSocialNetworkForm();
  const social = {
    discord: 'testdiscord',
    twitter: 'testtwitter',
    snapshot: 'testsnapshot',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/socials')) {
      success = social;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, social);

  spy.mockRestore();
});

test('delete a social', async () => {
  const utils = renderSocialNetworkForm();
  const social = {
    id: 5,
    discord: 'testdiscord',
    twitter: 'testtwitter',
    snapshot: 'testsnapshot',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/socials')) {
      success = social;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, social);

  spy.mockRestore();
});
