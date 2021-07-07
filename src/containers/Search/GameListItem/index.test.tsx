import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import GameListItem from './index';

describe('as a dropdown item', () => {
  test('should call handleClick', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <GameListItem game={{}} handleClick={handleClick} />,
    );

    fireEvent.click(getByLabelText(/game-list-item/));

    expect(handleClick).toBeCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should have hover class on item hover', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <GameListItem game={{}} handleClick={handleClick} />,
    );

    const item = getByLabelText(/game-list-item/);
    act(() => {
      fireEvent.mouseEnter(item);
    });

    expect(item.classList.contains('hover')).toBe(true);
    expect(handleClick).not.toBeCalled();
  });

  test('should not have hover class on item leave', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <GameListItem game={{}} handleClick={handleClick} />,
    );

    const item = getByLabelText(/game-list-item/);
    act(() => {
      fireEvent.mouseLeave(item);
    });

    expect(item.classList.contains('hover')).toBe(false);
    expect(handleClick).not.toBeCalled();
  });
});

describe('as a chosen list item', () => {
  test('should not call handleClick', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <GameListItem game={{}} handleClick={handleClick} chosen />,
    );

    fireEvent.click(getByLabelText(/game-list-item/));

    expect(handleClick).not.toBeCalled();
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('should not have hover class on item hover', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <GameListItem game={{}} handleClick={handleClick} chosen />,
    );

    const item = getByLabelText(/game-list-item/);
    act(() => {
      fireEvent.mouseEnter(item);
    });

    expect(item.classList.contains('hover')).toBe(false);
    expect(handleClick).not.toBeCalled();
  });
});
