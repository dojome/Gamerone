import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './index';

test('should show a spinner', () => {
  const { getByLabelText } = render(<Spinner show />);

  const spinner = getByLabelText(/spinner/i);

  const style = window.getComputedStyle(spinner);

  expect(style.display).not.toBe('none');
});

test('should hide a spinner', () => {
  const { container } = render(<Spinner />);

  expect(container.firstChild).toEqual(null);
});
