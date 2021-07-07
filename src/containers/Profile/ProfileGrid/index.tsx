import React, { ReactNode } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import {
  PROFILE_LAYOUT_BREAKPOINTS,
  PROFILE_LAYOUT_COLUMNS,
} from '../layoutConstants';

// type LayoutType = 'achievements' | 'experience' | 'games' | 'gear';

export enum ProfileLayout {
  ACHIEVEMENTS = 'achievements',
  EXPERIENCE = 'experience',
  GAMES = 'games',
  GEAR = 'gear',
}

export interface ProfileGridProps {
  layout: any;
  children: ReactNode;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const ProfileGrid: React.FC<ProfileGridProps> = ({
  layout,
  children,
}: ProfileGridProps): JSX.Element => {
  // let useLayout;

  // switch (layout) {
  //   case ProfileLayout.ACHIEVEMENTS:
  //     useLayout = PROFILE_ACHIEVEMENTS;
  //     break;
  //   case ProfileLayout.EXPERIENCE:
  //     useLayout = PROFILE_EXPERIENCE;
  //     break;
  //   case ProfileLayout.GAMES:
  //     useLayout = PROFILE_GAMES;
  //     break;
  //   case ProfileLayout.GEAR:
  //     useLayout = PROFILE_GEAR;
  //     break;
  // }

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layout}
      breakpoints={PROFILE_LAYOUT_BREAKPOINTS}
      cols={PROFILE_LAYOUT_COLUMNS}
      margin={[40, 40]}
      rowHeight={180}
      isResizable={false}
      isDraggable={false}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default ProfileGrid;
