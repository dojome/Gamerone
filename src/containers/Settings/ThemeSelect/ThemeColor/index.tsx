import React from 'react';
import { G1ThemeValue, G1ThemeName } from 'provider/theme';

interface ThemeColorProps {
  label: G1ThemeName;
  value: G1ThemeValue;
  selected?: boolean;
  onSelected?: Function;
}

export default function ThemeColor({
  value,
  label,
  selected,
  onSelected,
}: ThemeColorProps) {
  return (
    <div
      className={`theme ${value}` + (selected ? ' is-selected' : '')}
      onClick={(e: any) => {
        e.stopPropagation();
        if (onSelected) onSelected();
      }}
    >
      <div className="colour-swatch">
        <div className="colour-swatch__highlight"></div>
      </div>
      <span className="text">{label}</span>
    </div>
  );
}
