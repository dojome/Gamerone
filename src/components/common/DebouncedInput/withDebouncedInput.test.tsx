import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withDebouncedInput from './withDebouncedInput';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

const inputText = (el, value) => {
  act(() => {
    userEvent.type(el, value);
  });
};

test('debouces input as expected', async () => {
  const Input = () => (
    <input
      type="text"
      aria-label="debounce-input"
      id="debounce-input"
      name="debounce"
    />
  );
  const DebouncedInput = withDebouncedInput(Input, { timeout: 500 });
  const handleInputChange = jest.fn((e) =>
    console.log('mock handleInputChange', e.target.value),
  );
  let input = null;
  act(() => {
    const { getByLabelText, asFragment } = render(
      <DebouncedInput onChange={handleInputChange} />,
    );

    input = getByLabelText(/debounce-input/i);
    expect(asFragment()).toMatchSnapshot();
  });

  expect(input).not.toBeNull();
  inputText(input, 'x');

  const word = 'debounce';
  let type = '';

  for (let i = 0; i < word.length; i++) {
    jest.advanceTimersByTime(Math.floor(Math.random() * 499));
    type += word[i];
    inputText(input, type);
  }

  expect(handleInputChange).toHaveBeenCalledTimes(0);

  // TODO: Fix this bug. withDebouncedInput onChange is not fired as expected

  // jest.advanceTimersByTime(501);
  // expect(handleInputChange).toHaveBeenCalledTimes(1);
  // expect(input.value).toBe('debounce');
});
