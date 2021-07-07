import Achievements from './index';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';

const templateAchievementsData = [
  {
    id: 1,
    date: null,
    badge: {
      id: 1,
      name: 'bir',
      description: 'cds',
      logo: 'badges/placeholder.svg',
    },
  },
  {
    id: 3,
    date: null,
    badge: {
      id: 2,
      name: 'iki',
      description: 'fgergfwegwergewrgwe',
      logo: 'badges/placeholder.svg',
    },
  },
];

const renderForm = async () => {
  let utils;

  await act(async () => {
    utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <Achievements />
        </MemoryRouter>
      </Provider>,
    );
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return { ...utils };
};

test('Fetch achievements data from API', async () => {
  const spy = jest
    .spyOn(window, 'fetch')
    .mockImplementationOnce(async (url) => {
      return Promise.resolve({
        status: 200,
        json: () => templateAchievementsData,
      });
    });

  const utils = await renderForm();

  expect(utils.asFragment()).toMatchSnapshot();

  await spy.mockRestore();
});
