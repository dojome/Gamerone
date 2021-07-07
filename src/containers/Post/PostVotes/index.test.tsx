import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { PostVotes } from './index';
import { MappedProps as PostVotesStoreProps } from './index';
import { PostModel } from 'models/post';
import { PostIsVotedEnum } from 'interfaces';

const post = new PostModel().fromDto({
  id: 20,
  title: 'First Post',
  description: 'This is my first post!!!',
  privacy: 'public',
  commentsEnabled: true,
  html: '',
  url: '',
  image: 'assets/placeholder/post.svg',
  createdAt: '2020-05-22T21:57:57.000000Z',
  upCount: 5,
  downCount: 3,
  commentCount: 0,
  user: {
    id: 1481,
    username: 'specialk',
    email: null,
    firstName: 'Kevin',
    lastName: 'Manship',
    websiteUrl: 'https://www.g1.gg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque lacus quis euismod ultricies. Ut ullamcorper porta eros vel mollis. Praesent non est nulla. Curabitur sit amet convallis odio. Praesent et augue erat.',
    status: null,
    location: 'Vancouver, CA',
    avatar:
      'user_content/1481/avatar/rKURZsZcbXHrfPtktVnSD0SM147bgyokvfqoI9GZ.png',
    banner:
      'user_content/1481/banner/FwWhmQnzxZrYlxndnGKtbvs7BoPfAVlNbZg8IYoQ.png',
    playCount: 0,
    gameCount: 0,
    badgeCount: 0,
    followCount: 1,
    followerCount: 5,
    birthDate: null,
    isFollowing: false,
  },
  images: [
    {
      filename:
        'user_content/1481/post/P64y8PuF5hqQT2QfOttqhDV8VHAR1583M1GZSCog.jpeg',
    },
    {
      filename:
        'user_content/1481/post/tiKMdzxeH5jrY4Fk9JUPj1x5mpn6r1ZyVHADPq2T.jpeg',
    },
  ],
  games: [],
  isVoted: null,
});

const renderComponent = ({
  isAuthenticated,
  dispatchUpVote,
  dispatchDownVote,
}: PostVotesStoreProps): RenderResult | undefined => {
  let utils;

  act(() => {
    utils = render(
      <PostVotes
        post={post}
        isAuthenticated={isAuthenticated}
        dispatchUpVote={dispatchUpVote}
        dispatchDownVote={dispatchDownVote}
      />,
    );
  });

  return utils;
};

test('renders correct number counts', () => {
  const dispatchUpVote = jest.fn();
  const dispatchDownVote = jest.fn();
  const { asFragment, container } = renderComponent({
    isAuthenticated: true,
    dispatchUpVote,
    dispatchDownVote,
  }) as RenderResult;

  expect(asFragment()).toMatchSnapshot();

  expect(container.querySelector('#up-vote-count')?.textContent).toEqual(
    post.upCount.toString(),
  );

  expect(container.querySelector('#down-vote-count')?.textContent).toEqual(
    post.downCount.toString(),
  );

  expect(container.querySelector('#comment-count')?.textContent).toEqual(
    post.commentCount.toString(),
  );
});

test('up/vote actions should be disabled when not authenticated', () => {
  const dispatchUpVote = jest.fn();
  const dispatchDownVote = jest.fn();
  const { getByLabelText } = renderComponent({
    isAuthenticated: false,
    dispatchUpVote,
    dispatchDownVote,
  }) as RenderResult;

  act(() => {
    fireEvent.click(getByLabelText('up-vote'));
  });

  expect(dispatchUpVote).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.click(getByLabelText('down-vote'));
  });

  expect(dispatchDownVote).toHaveBeenCalledTimes(0);
});

test('shows up voted status when isVoted is up', () => {
  const dispatchUpVote = jest.fn();
  const dispatchDownVote = jest.fn();

  // set isVoted up
  post.isVoted = PostIsVotedEnum.Up;

  const { getByLabelText } = renderComponent({
    isAuthenticated: false,
    dispatchUpVote,
    dispatchDownVote,
  }) as RenderResult;

  expect(
    getByLabelText('up-vote').classList.contains('button--primary'),
  ).toBeTruthy();
});

test('shows down voted status when isVoted is down', () => {
  const dispatchUpVote = jest.fn();
  const dispatchDownVote = jest.fn();

  // set isVoted down
  post.isVoted = PostIsVotedEnum.Down;

  const { getByLabelText } = renderComponent({
    isAuthenticated: false,
    dispatchUpVote,
    dispatchDownVote,
  }) as RenderResult;

  expect(
    getByLabelText('down-vote').classList.contains('button--primary'),
  ).toBeTruthy();
});

test('increases up voted count when up vote', () => {
  const dispatchUpVote = jest.fn();
  const dispatchDownVote = jest.fn();

  post.isVoted = null;

  const { container, getByLabelText, rerender } = renderComponent({
    isAuthenticated: true,
    dispatchUpVote,
    dispatchDownVote,
  }) as RenderResult;

  act(() => {
    fireEvent.click(getByLabelText('up-vote'));

    post.isVoted = PostIsVotedEnum.Up;
    post.upCount += 1;
    rerender(
      <PostVotes
        isAuthenticated
        post={post}
        dispatchUpVote={dispatchUpVote}
        dispatchDownVote={dispatchDownVote}
      />,
    );
  });

  expect(dispatchUpVote).toHaveBeenCalledTimes(1);
  expect(container.querySelector('#up-vote-count')?.textContent).toEqual(
    post.upCount.toString(),
  );
});

test('increases down voted count when down vote click', () => {
  const dispatchUpVote = jest.fn();
  const dispatchDownVote = jest.fn();

  post.isVoted = null;

  const { container, getByLabelText, rerender } = renderComponent({
    isAuthenticated: true,
    dispatchUpVote,
    dispatchDownVote,
  }) as RenderResult;

  act(() => {
    fireEvent.click(getByLabelText('down-vote'));

    post.isVoted = PostIsVotedEnum.Down;
    post.downCount -= 1;
    rerender(
      <PostVotes
        isAuthenticated
        post={post}
        dispatchUpVote={dispatchUpVote}
        dispatchDownVote={dispatchDownVote}
      />,
    );
  });

  expect(dispatchDownVote).toHaveBeenCalledTimes(1);
  expect(container.querySelector('#down-vote-count')?.textContent).toEqual(
    post.downCount.toString(),
  );
});
