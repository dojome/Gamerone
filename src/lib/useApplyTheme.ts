import { useRef, useLayoutEffect } from 'react';
import { useThemeState } from 'provider/theme';
import { G1_THEMES } from 'utils/constants';

export default function useApplyTheme() {
  const classRef = useRef<string[]>([]);
  const { theme, isSystemDefault, isDarkMode } = useThemeState();

  // Light/dark mode
  useLayoutEffect(() => {
    const htmlEl = document.querySelector('html');

    if (htmlEl) {
      classRef.current = htmlEl.classList
        .toString()
        .split(' ')
        .filter((s) => s);
      if (isSystemDefault) {
        htmlEl.classList.remove('prefersDarkMode', 'prefersLightMode');
      } else {
        htmlEl.classList.add(
          isDarkMode ? 'prefersDarkMode' : 'prefersLightMode',
        );
      }
    }

    // Clean up
    return () => {
      const htmlEl = document.querySelector('html');
      if (htmlEl && classRef.current) {
        const classes = htmlEl.classList
          .toString()
          .split(' ')
          .filter((s) => s);
        if (classes.length > 0) htmlEl.classList.remove(...classes);
        if (classRef.current.length > 0)
          htmlEl.classList.add(...classRef.current);
      }
    };
  }, [isSystemDefault, isDarkMode]);

  // Apply theme
  useLayoutEffect(() => {
    const bodyEl = document.querySelector('body');
    if (bodyEl) {
      bodyEl.classList.add(G1_THEMES[theme]);
    }

    // Clean up
    return () => {
      const bodyEl = document.querySelector('body');
      if (bodyEl) {
        bodyEl.classList.remove(G1_THEMES[theme]);
      }
    };
  }, [theme]);
}
