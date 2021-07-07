import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { AuthProvider } from 'provider/auth';
import { store } from 'redux/store';
import FollowBlock from './index';

const renderFollowBlock = (follows, dispatches = {}) => {
  const utils = render(
    <Provider store={store}>
      <AuthProvider isAuthenticated>
        <FollowBlock follows={follows} {...dispatches}></FollowBlock>
      </AuthProvider>
    </Provider>,
  );
  return utils;
};

describe('render FollowBlock', () => {
  test('should render the block and match the snapshot', () => {
    const { asFragment } = renderFollowBlock({
      followCount: 0,
      followerCount: 0,
      isFollowing: true,
      isBlocking: false,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('FollowBlock actions', () => {
  test('increases follower count on Follow click', () => {
    // TODO: Complete tests after block/unblock are done using profile reducer
  });
});
