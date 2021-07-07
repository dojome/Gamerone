import Experiences from './index';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';

const templateExperiencesData = [
  {
    id: 1,
    title: 'experience title 1',
    companyName: 'ACME',
    startDate: 2010 - 10 - 10,
    endDate: 2010 - 10 - 10,
    achievements: 'achievements text',
    game: null,
    type: 2,
    club: null,
  },
  {
    id: 2,
    title: 'experience title 1',
    companyName: 'ACME',
    startDate: 2010 - 10 - 10,
    endDate: 2010 - 10 - 10,
    achievements: 'achievements text',
    game: null,
    type: 2,
    club: null,
  },
];

const renderForm = async () => {
  let utils;

  await act(async () => {
    utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <Experiences />
        </MemoryRouter>
      </Provider>,
    );
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return { ...utils };
};

test('Fetch experiences data from API', async () => {
  const spy = jest
    .spyOn(window, 'fetch')
    .mockImplementationOnce(async (url) => {
      return Promise.resolve({
        status: 200,
        json: () => templateExperiencesData,
      });
    });

  const utils = await renderForm();

  expect(utils.asFragment()).toMatchSnapshot();

  await spy.mockRestore();
});
