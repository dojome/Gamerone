import React from 'react';
import Card from 'components/common/Card';
import './style.scss';
import Checkbox from 'components/common/Form/Checkbox';
import ThemeColor from './ThemeColor';
import { useThemeState, useThemedispatch, G1ThemeName } from 'provider/theme';
import { G1_THEMES } from 'utils/constants';

const ThemeSelect: React.FC = (): JSX.Element => {
  const { theme, isSystemDefault, isDarkMode } = useThemeState();
  const dispatch = useThemedispatch();
  const handleThemeSelect = (selectedTheme: G1ThemeName) => {
    dispatch({ type: 'SET_THEME', payload: selectedTheme });
  };

  return (
    <Card>
      <h4 className="card__header card__title">Interface</h4>

      <div className="card__content" style={{ paddingTop: 0 }}>
        Light/Dark mode:
        <br />
        <br />
        <Checkbox
          name="systemDefault"
          label="Follow system setting"
          checked={isSystemDefault}
          onChange={() =>
            dispatch({ type: 'SET_SYSTEM_DEFAULT', payload: !isSystemDefault })
          }
        />
        <Checkbox
          name="darkMode"
          label="Dark mode"
          checked={isDarkMode}
          disabled={isSystemDefault}
          onChange={() =>
            dispatch({ type: 'SET_DARK_MODE', payload: !isDarkMode })
          }
        />
      </div>

      <div className="card__content" style={{ paddingBottom: '1.5rem' }}>
        <label>Theme colour:</label>
        <br />
        <br />
        <div className="theme-select">
          {Object.keys(G1_THEMES).map((v: string) => {
            const name = v as G1ThemeName;
            const value = G1_THEMES[name];
            return (
              <ThemeColor
                key={value}
                label={name}
                value={value}
                selected={theme === name}
                onSelected={() => handleThemeSelect(name)}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ThemeSelect;
