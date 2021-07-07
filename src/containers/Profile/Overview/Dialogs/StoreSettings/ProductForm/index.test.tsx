import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import StoreForm from './index';

// Snapshot testing for StoreForm Initial
test('stores list initial', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <StoreForm />
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
        <StoreForm />
      </MemoryRouter>
    </Provider>,
  );

  expect(queryByLabelText(/storeName/i)).toBeFalsy();
  expect(queryByLabelText(/storeUrl/i)).toBeFalsy();

  act(() => {
    fireEvent.click(getByText('Add'));
  });

  expect(queryByLabelText(/storeName/i)).toBeTruthy();
  expect(queryByLabelText(/storeUrl/i)).toBeTruthy();
});

/**
 * Mock input event to fill the form with store name and link
 *
 * @return {Object}
 */
const renderStoreForm = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <StoreForm />
      </MemoryRouter>
    </Provider>,
  );
};

/**
 * Fill in and submit the form
 *
 * @param {Object} utils
 * @param {String} storeName
 * @param {String} storeLink
 * @param {String} productImage
 */
const fillAndSubmitForm = (
  utils,
  {
    storeName,
    storeLink,
    productImage = 'user_content/1498/store/RtIgchfZlIPWlUdtIZWPpbQZJ1rZiV7evklzwzQt.jpeg',
  },
) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/storeName/i), {
      target: { value: storeName },
    });
    fireEvent.change(getByLabelText(/storeUrl/i), {
      target: { value: storeLink },
    });
    fireEvent.submit(getByRole('button', { name: 'Create a store' }));
  });
};

test('create a store', async () => {
  const utils = renderStoreForm();
  const store = {
    storeName: 'testStoreName',
    storeLink: 'testStoreLink',
    productImage:
      'user_content/1498/store/RtIgchfZlIPWlUdtIZWPpbQZJ1rZiV7evklzwzQt.jpeg',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/stores')) {
      success = store;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, store);

  spy.mockRestore();
});

test('update a store', async () => {
  const utils = renderStoreForm();
  const store = {
    id: 5,
    storeName: 'testStoreName',
    storeLink: 'testStoreLink',
    productImage:
      'user_content/1498/store/RtIgchfZlIPWlUdtIZWPpbQZJ1rZiV7evklzwzQt.jpeg',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/stores')) {
      success = store;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, store);

  spy.mockRestore();
});
