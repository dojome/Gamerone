import { LayoutSettings } from 'interfaces';

export class LayoutSettingsModel implements LayoutSettings {
  settings = null;
  visibility = null;

  fromDto = (layoutSettings?: LayoutSettings) => {
    Object.assign(this, layoutSettings);
    return this;
  };
}
