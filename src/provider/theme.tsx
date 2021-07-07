import React from 'react';
import { G1_THEMES } from 'utils/constants';

export type G1ThemeName = keyof typeof G1_THEMES;
export type G1ThemeValue = typeof G1_THEMES[G1ThemeName];

type Action =
  | { type: 'SET_THEME'; payload: G1ThemeName }
  | { type: 'SET_SYSTEM_DEFAULT'; payload: boolean }
  | { type: 'SET_DARK_MODE'; payload: boolean };

type Dispatch = (action: Action) => void;
type State = {
  theme: G1ThemeName;
  isSystemDefault: boolean;
  isDarkMode: boolean;
};

type ThemeProviderProps = { children: React.ReactNode };

const ThemeStateContext = React.createContext<State | undefined>(undefined);
const ThemeDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

function themeReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_THEME': {
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    }

    case 'SET_SYSTEM_DEFAULT': {
      localStorage.setItem('systemDefault', action.payload ? 'on' : 'off');
      return { ...state, isSystemDefault: action.payload };
    }

    case 'SET_DARK_MODE': {
      localStorage.setItem('darkMode', action.payload ? 'on' : 'off');
      return { ...state, isDarkMode: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const systemDefault = localStorage.getItem('systemDefault');
  const darkMode = localStorage.getItem('darkMode');
  const savedTheme = localStorage.getItem('theme') || 'Default';

  if (!Object.keys(G1_THEMES).includes(savedTheme)) {
    throw new Error('Unidentifed theme name');
  }

  const [state, dispatch] = React.useReducer(themeReducer, {
    theme: savedTheme as G1ThemeName,
    isSystemDefault: systemDefault
      ? systemDefault === 'on'
        ? true
        : false
      : true,
    isDarkMode: darkMode ? (darkMode === 'on' ? true : false) : false,
  });

  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
}

function useThemeState() {
  const context = React.useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error('useThemeState must be used within a ThemeProvider');
  }

  return context;
}

function useThemedispatch() {
  const context = React.useContext(ThemeDispatchContext);

  if (context === undefined) {
    throw new Error('useThemeDispatch must be used within a ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useThemeState, useThemedispatch };
