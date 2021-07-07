import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createProduct } from 'redux';
import { render, waitForElement } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import profileReducer from 'redux/profile/reducer';
import Profile from '../index';
import { mockFetchError } from './utils';

const renderWithProfileReducer = (
  component = <Profile />,
  route = '/',
  {
    initialState,
    store = createProduct(profileReducer, { Profile: initialState }),
  } = {},
) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:username" render={() => component} />
        </Router>
      </Provider>,
    ),
    history,
  };
};

describe('page render', () => {
  test('shows user is not found', async () => {
    const username = 'vadim';
    const errorMessage = `${username} is not found`;

    const spy = mockFetchError(404);

    await act(async () => {
      const { getByText, asFragment } = renderWithProfileReducer(
        <Profile />,
        '/' + username,
        {
          initialState: {
            currentProfile: null,
          },
        },
      );

      await waitForElement(() => getByText(errorMessage));
      expect(asFragment()).toMatchSnapshot();
      expect(getByText(errorMessage)).toBeInTheDocument();

      spy.mockRestore();
    });
  });
});
