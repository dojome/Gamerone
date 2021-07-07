import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import CardVisibilitySettingsModal from './index';

// Snapshot
test('cards visibility section initial', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CardVisibilitySettingsModal />
      </MemoryRouter>
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// DOM testing
afterEach(cleanup);
it('check and save', () => {
  const { queryByLabelText, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <CardVisibilitySettingsModal />
      </MemoryRouter>
    </Provider>,
  );

  expect(queryByLabelText(/sponsors/i)).toBeFalsy();
  expect(queryByLabelText(/gear/i)).toBeFalsy();

  act(() => {
    fireEvent.click(getByText('Save'));
  });

  expect(queryByLabelText(/gear/i)).toBeTruthy();
  expect(queryByLabelText(/sponsors/i)).toBeTruthy();
});

/**
 * Mock input event to do check
 *
 * @return {Object}
 */
const renderCardVisibilityForm = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CardVisibilitySettingsModal />
      </MemoryRouter>
    </Provider>,
  );
};

/**
 * Fill in and submit the form
 *
 * @param {Object} utils
 * @param {String} sponsors
 * @param {String} socialNetworks
 * @param {String} gear
 * @param {String} store
 * @param {String} nowPlaying
 * @param {String} achievements
 */
const fillAndSubmitForm = (
  utils: import('@testing-library/react').RenderResult<
    typeof import('@testing-library/dom/queries')
  >,
  {
    sponsors = true,
    socialNetworks = false,
    gear = true,
    store = true,
    nowPlaying = false,
    achievements = true,
  }: {
    sponsors: boolean;
    socialNetworks: boolean;
    currentlyPlaying: boolean;
    achievements: boolean;
    gear: boolean;
    store: boolean;
  },
) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/sponsors/i), {
      target: { value: sponsors },
    });
    fireEvent.change(getByLabelText(/socialNetworks/i), {
      target: { value: socialNetworks },
    });
    fireEvent.change(getByLabelText(/nowPlaying/i), {
      target: { value: nowPlaying },
    });
    fireEvent.change(getByLabelText(/achievements/i), {
      target: { value: achievements },
    });
    fireEvent.change(getByLabelText(/gear/i), {
      target: { value: gear },
    });
    fireEvent.change(getByLabelText(/store/i), {
      target: { value: store },
    });
    fireEvent.submit(getByRole('button', { name: 'Save' }));
  });
};

test('update layoutsettings', async () => {
  const utils = renderCardVisibilityForm();
  const visibility = {
    sponsors: true,
    socialNetworks: false,
    nowPlaying: true,
    achievements: true,
    gear: true,
    store: true,
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = {};
    if (url.endsWith('profile/layout-settings')) {
      success = visibility;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Save'));
  });

  fillAndSubmitForm(utils, visibility);

  spy.mockRestore();
});
