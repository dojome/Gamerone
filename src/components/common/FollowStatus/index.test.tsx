import React from 'react';
import { render } from '@testing-library/react';
import FollowStatus from './index';

test('shows followerCount and followCount', () => {
  const followerCount = 2;
  const followCount = 5;
  const { getByLabelText } = render(
    <FollowStatus followCount={followCount} followerCount={followerCount} />,
  );

  expect(getByLabelText(/follower-count/).textContent).toBe(`${followerCount}`);
  expect(getByLabelText(/follow-count/).textContent).toBe(`${followCount}`);
});
