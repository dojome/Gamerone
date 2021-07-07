import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import DebouncedInput from './index';

test('ref should target actual input element', async () => {
  let inputRef = null;

  renderHook(() => (inputRef = useRef(null)));
  act(() => {
    render(<DebouncedInput ref={inputRef} type="text" id="debounce-input" />);
  });

  expect(inputRef.current).not.toBeUndefined();
  expect(inputRef.current).not.toBeNull();

  expect(inputRef.current.type).toBe('text');
  expect(inputRef.current.id).toBe('debounce-input');
});
