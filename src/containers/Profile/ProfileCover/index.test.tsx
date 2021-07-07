import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createProduct } from 'redux';
import { render, waitForElement } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import profileReducer from 'redux/profile/reducer';
import authReducer from 'redux/auth/reducer';
import ProfileHeader from './index';

const testProfile = {
  slug: 'vadim',
  contentType: 'user',
  contentId: 1449,
  content: {
    id: 1449,
    username: 'vadim',
    email: 'vadimas.workteam@gmail.com',
    firstName: 'frontend',
    lastName: 'dev',
    bio: null,
    avatar: 'profile/vadim.svg',
    banner: null,
    playCount: 0,
    gameCount: 0,
    badgeCount: 0,
    followCount: 0,
    followerCount: 0,
    birthDate: null,
  },
};

const renderWithProfileReducer = (
  component = <ProfileHeader />,
  route,
  {
    initialState,
    store = createProduct(profileReducer, { Profile: initialState }),
  } = {},
) => {
  const history = createMemoryHistory();
  if (route) history.push(route);

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>,
    ),
    history,
  };
};

const renderWithAuthReducer = (
  component = <ProfileHeader />,
  route,
  {
    initialState,
    store = createProduct(authReducer, { Auth: initialState }),
  } = {},
) => {
  const history = createMemoryHistory();
  if (route) history.push(route);

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>,
    ),
    history,
  };
};

describe('header render on Profile and Home page', () => {
  test('shows username on profile page', async () => {
    const username = 'vadim';

    await act(async () => {
      const { getByLabelText, asFragment } = renderWithProfileReducer(
        <ProfileHeader />,
        '/' + username,
        {
          initialState: { currentProfile: testProfile },
        },
      );

      await waitForElement(() => getByLabelText(/username/));
      expect(asFragment(<ProfileHeader />)).toMatchSnapshot();
      expect(getByLabelText(/username/)).toHaveTextContent(username);
    });
  });

  test('shows username on home page when authenticated', async () => {
    const username = 'vadim';

    await act(async () => {
      const { getByLabelText, asFragment } = renderWithAuthReducer(
        <ProfileHeader />,
        '/',
        {
          initialState: { user: testProfile.content },
        },
      );

      await waitForElement(() => getByLabelText(/username/));
      expect(asFragment(<ProfileHeader />)).toMatchSnapshot();
      expect(getByLabelText(/username/)).toHaveTextContent(username);
    });
  });
});

describe('header elements', () => {
  test('renders username, fullname and avatar', async () => {
    await act(async () => {
      const { firstName, lastName, username } = testProfile.content;
      const {
        getByLabelText,
        asFragment,
        getByAltText,
      } = renderWithProfileReducer(<ProfileHeader />, '/vadim', {
        initialState: { currentProfile: testProfile },
      });

      expect(asFragment(<ProfileHeader />)).toMatchSnapshot();

      // renders full name
      await waitForElement(() => getByLabelText(/fullname/));
      expect(getByLabelText(/fullname/)).toHaveTextContent(
        firstName + ' ' + lastName,
      );

      // renders username
      expect(getByLabelText(/username/)).toHaveTextContent(username);

      // renders avatar
      expect(getByAltText(username)).toBeInTheDocument();
    });
  });

  test('shows club text after username when profile is club', async () => {
    await act(async () => {
      const { getByLabelText, asFragment } = renderWithProfileReducer(
        <ProfileHeader club />,
        '/vadim',
        {
          initialState: {
            currentProfile: { ...testProfile, contentType: 'club' },
          },
        },
      );

      expect(asFragment(<ProfileHeader club />)).toMatchSnapshot();

      // shows club text
      await waitForElement(() => getByLabelText(/username/));
      expect(getByLabelText(/username/)).toHaveTextContent(
        testProfile.content.username + ' (Club)',
      );
    });
  });

  test('should show default placeholder when avatar is empty', async () => {
    await act(async () => {
      const { getByAltText, asFragment } = renderWithProfileReducer(
        <ProfileHeader />,
        '/vadim',
        {
          initialState: {
            currentProfile: {
              ...testProfile,
              content: { ...testProfile.content, avatar: null },
            },
          },
        },
      );

      expect(asFragment(<ProfileHeader />)).toMatchSnapshot();

      // shows club text
      await waitForElement(() => getByAltText('vadim'));

      const avatar = getByAltText('vadim');

      expect(avatar.src).toMatch(/placeholder.svg$/);
    });
  });
});
