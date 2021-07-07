import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import SearchProfile from './index';
import { AVATAR_PLACEHOLDER } from 'utils/constants';

const defaultProfiles = [
  {
    id: 11,
    username: 'pokimane',
    email: 'reserved+pokimane@gamerone.gg',
    firstName: 'Pokimane',
    lastName: 'User',
    bio: null,
    avatar: AVATAR_PLACEHOLDER,
    banner: null,
    playCount: 0,
    gameCount: 0,
    badgeCount: 0,
    followCount: 0,
    followerCount: 0,
    birthDate: null,
  },
  {
    id: 13,
    username: 'drlupo',
    email: 'reserved+drlupo@gamerone.gg',
    firstName: 'Drlupo',
    lastName: 'User',
    bio: null,
    avatar: AVATAR_PLACEHOLDER,
    banner: null,
    playCount: 0,
    gameCount: 0,
    badgeCount: 0,
    followCount: 0,
    followerCount: 0,
    birthDate: null,
  },
  {
    id: 16,
    username: 'nickmercs',
    email: 'reserved+nickmercs@gamerone.gg',
    firstName: 'Nickmercs',
    lastName: 'User',
    bio: null,
    avatar: AVATAR_PLACEHOLDER,
    banner: null,
    playCount: 0,
    gameCount: 0,
    badgeCount: 0,
    followCount: 0,
    followerCount: 0,
    birthDate: null,
  },
];

const searchProfile = async (
  {
    multiple = false,
    navigate = false,
    clearInput = false,
    initLoad = false,
  } = {},
  additions = null,
) => {
  const jestFetch = jest
    .spyOn(window, 'fetch')
    .mockImplementationOnce(async () => {
      return Promise.resolve({
        status: 200,
        json: () => defaultProfiles,
      });
    });

  const utils = render(
    <MemoryRouter>
      <SearchProfile
        multiple={multiple}
        navigate={navigate}
        clearInput={clearInput}
        initLoad={initLoad}
      />
      {additions}
    </MemoryRouter>,
  );

  act(() => {
    fireEvent.change(utils.getByLabelText(/search-profiles/), {
      target: { value: 'profile' },
    });
  });

  await waitForElement(() => utils.getByLabelText(/search-dropdown/));
  await waitForElement(() => utils.getAllByLabelText(/profile-list-item/));

  jestFetch.mockRestore();
  return { ...utils, jestFetch };
};

describe('basic functionality', () => {
  test('searches profiles, shows the dropdown and hides it on outside click', async () => {
    const {
      asFragment,
      getByLabelText,
      queryByLabelText,
    } = await searchProfile();
    expect(asFragment()).toMatchSnapshot();

    act(() => {
      fireEvent.mouseDown(getByLabelText(/search-form/));
    });

    expect(queryByLabelText(/search-dropdown/)).toBe(null);
  });

  test('input stays the focused after search', async () => {
    const { getByLabelText } = await searchProfile();

    const input = getByLabelText(/search-profiles/);
    expect(document.activeElement).toBe(input);
  });
});

describe('option: multiple', () => {
  test('adds item to the list on click and not hide the dropdown', async () => {
    const { getByLabelText } = await searchProfile({ multiple: true });

    const dropdown = getByLabelText(/search-dropdown/);
    expect(dropdown).toBeInTheDocument();

    const firstProfile = dropdown.querySelectorAll('.profile-list-item')[0];
    act(() => fireEvent.click(firstProfile));

    const selectedList = getByLabelText(/selected-profiles-list/);
    expect(selectedList).toBeInTheDocument();

    const selectedProfileName = selectedList.querySelectorAll(
      '.profile-name',
    )[0];

    // ensure that same named item is added
    expect(firstProfile.querySelector('.profile-name').innerHTML).toBe(
      selectedProfileName.innerHTML,
    );

    expect(dropdown).toBeInTheDocument();
  });
});

describe('option: navigate', () => {
  test('navigates to the profile page on item click', async () => {
    let capturedlocation;
    const { getByLabelText } = await searchProfile(
      { navigate: true },
      <Route
        path="*"
        render={({ history, location }) => {
          capturedlocation = location;
          return null;
        }}
      />,
    );

    const dropdown = getByLabelText(/search-dropdown/);
    expect(dropdown).toBeInTheDocument();

    const firstProfile = dropdown.querySelectorAll('.profile-list-item')[0];
    const profileName = firstProfile
      .querySelector('.profile-name span')
      .innerHTML.substring(1);
    act(() => fireEvent.click(firstProfile));

    expect(capturedlocation.pathname).toBe(`/${profileName}`);
  });
});

describe('option: clearInput', () => {
  test('clears the input after the item is clicked', async () => {
    const { getByLabelText, asFragment } = await searchProfile({
      clearInput: true,
    });

    const dropdown = getByLabelText(/search-dropdown/);
    expect(dropdown).toBeInTheDocument();

    const firstProfile = dropdown.querySelectorAll('.profile-list-item')[0];
    act(() => fireEvent.click(firstProfile));

    expect(asFragment()).toMatchSnapshot();
    const input = getByLabelText(/search-profiles/);

    expect(input.value).toBe('');
  });
});

describe('option: initLoad', () => {
  test('should fetch data and show the dropdown initially', async () => {
    const jestFetch = jest
      .spyOn(window, 'fetch')
      .mockImplementationOnce(async () => {
        return Promise.resolve({
          status: 200,
          json: () => defaultProfiles,
        });
      });

    const { getAllByLabelText, getByLabelText, asFragment } = render(
      <MemoryRouter>
        <SearchProfile initLoad={true} />
      </MemoryRouter>,
    );

    await waitForElement(() => getByLabelText(/search-dropdown/));
    await waitForElement(() => getAllByLabelText(/profile-list-item/));

    expect(asFragment()).toMatchSnapshot();

    expect(jestFetch).toBeCalled();
    expect(jestFetch).toHaveBeenCalledTimes(1);

    const items = getAllByLabelText(/profile-list-item/);
    expect(items.length).toBe(defaultProfiles.length);

    jestFetch.mockRestore();
  });

  test('should not fetch data and not show the dropdown on load', async () => {
    const jestFetch = jest
      .spyOn(window, 'fetch')
      .mockImplementationOnce(async () => {
        return Promise.resolve({
          status: 200,
          json: () => defaultProfiles,
        });
      });

    const { queryAllByLabelText, getByLabelText, asFragment } = render(
      <MemoryRouter>
        <SearchProfile initLoad={false} />
      </MemoryRouter>,
    );

    await waitForElement(() => getByLabelText(/search-dropdown/));

    const items = queryAllByLabelText(/profile-list-item/);
    expect(items.length).toBe(0);

    expect(asFragment()).toMatchSnapshot();
    expect(jestFetch).toHaveBeenCalledTimes(0);

    jestFetch.mockRestore();
  });
});
