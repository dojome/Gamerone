import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import SearchGame from './index';

const defaultGames = [
  {
    id: 1775,
    name: 'Xenoblade Chronicles X',
    cover: 'games/xenoblade_chronicles_x.jpg',
    logo: null,
    playerCount: 0,
  },
  {
    id: 493,
    name: 'Pokémon X/Y',
    cover: 'games/placeholder.jpg',
    logo: null,
    playerCount: 0,
  },
  {
    id: 1052,
    name: 'Final Fantasy X',
    cover: 'games/final_fantasy_x.jpg',
    logo: null,
    playerCount: 0,
  },
];

const searchGame = async (
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
        json: () => defaultGames,
      });
    });

  const utils = render(
    <MemoryRouter>
      <SearchGame
        multiple={multiple}
        navigate={navigate}
        clearInput={clearInput}
        initLoad={initLoad}
      />
      {additions}
    </MemoryRouter>,
  );

  act(() => {
    fireEvent.change(utils.getByLabelText(/search-games/), {
      target: { value: 'game' },
    });
  });

  await waitForElement(() => utils.getByLabelText(/search-dropdown/));
  await waitForElement(() => utils.getAllByLabelText(/game-list-item/));

  jestFetch.mockRestore();
  return { ...utils, jestFetch };
};

describe('basic functionality', () => {
  test('searches games, shows the dropdown and hides it on outside click', async () => {
    const { asFragment, getByLabelText, queryByLabelText } = await searchGame();
    expect(asFragment()).toMatchSnapshot();

    act(() => {
      fireEvent.mouseDown(getByLabelText(/search-form/));
    });

    expect(queryByLabelText(/search-dropdown/)).toBe(null);
  });

  test('input stays the focused after search', async () => {
    const { getByLabelText } = await searchGame();

    const input = getByLabelText(/search-games/);
    expect(document.activeElement).toBe(input);
  });
});

describe('option: multiple', () => {
  test('adds item to the list on click and not hide the dropdown', async () => {
    const { getByLabelText } = await searchGame({ multiple: true });

    const dropdown = getByLabelText(/search-dropdown/);
    expect(dropdown).toBeInTheDocument();

    const firstGame = dropdown.querySelectorAll('.game-list-item')[0];
    act(() => fireEvent.click(firstGame));

    const selectedList = getByLabelText(/selected-games-list/);
    expect(selectedList).toBeInTheDocument();

    const selectedGameName = selectedList.querySelectorAll('.game-name')[0];

    // ensure that same named item is added
    expect(firstGame.querySelector('.game-name').innerHTML).toBe(
      selectedGameName.innerHTML,
    );

    expect(dropdown).toBeInTheDocument();
  });
});

describe('option: navigate', () => {
  test('navigates to the game page on item click', async () => {
    let capturedlocation;
    const { getByLabelText } = await searchGame(
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

    const firstGame = dropdown.querySelectorAll('.game-list-item')[0];
    const gameName = firstGame.querySelector('.game-name').innerHTML;
    act(() => fireEvent.click(firstGame));

    expect(capturedlocation.pathname).toBe(`/${gameName}`);
  });
});

describe('option: clearInput', () => {
  test('clears the input after the item is clicked', async () => {
    const { getByLabelText, asFragment } = await searchGame({
      clearInput: true,
    });

    const dropdown = getByLabelText(/search-dropdown/);
    expect(dropdown).toBeInTheDocument();

    const firstGame = dropdown.querySelectorAll('.game-list-item')[0];
    act(() => fireEvent.click(firstGame));

    expect(asFragment()).toMatchSnapshot();
    const input = getByLabelText(/search-games/);

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
          json: () => defaultGames,
        });
      });

    const { getAllByLabelText, getByLabelText, asFragment } = render(
      <MemoryRouter>
        <SearchGame initLoad={true} />
      </MemoryRouter>,
    );

    await waitForElement(() => getByLabelText(/search-dropdown/));
    await waitForElement(() => getAllByLabelText(/game-list-item/));

    expect(asFragment()).toMatchSnapshot();

    expect(jestFetch).toBeCalled();
    expect(jestFetch).toHaveBeenCalledTimes(1);

    const items = getAllByLabelText(/game-list-item/);
    expect(items.length).toBe(defaultGames.length);

    jestFetch.mockRestore();
  });

  test('should not fetch data and not show the dropdown on load', async () => {
    const jestFetch = jest
      .spyOn(window, 'fetch')
      .mockImplementationOnce(async () => {
        return Promise.resolve({
          status: 200,
          json: () => defaultGames,
        });
      });

    const { queryAllByLabelText, getByLabelText, asFragment } = render(
      <MemoryRouter>
        <SearchGame initLoad={false} />
      </MemoryRouter>,
    );

    await waitForElement(() => getByLabelText(/search-dropdown/));

    const items = queryAllByLabelText(/game-list-item/);
    expect(items.length).toBe(0);

    expect(asFragment()).toMatchSnapshot();
    expect(jestFetch).toHaveBeenCalledTimes(0);

    jestFetch.mockRestore();
  });
});
