import TagManager from 'react-gtm-module';

/**
 * Event - Add custom tracking event.
 * This is for tracking when event clicked something like that they'll send the data to GA
 */
export const GTMDataLayer = (event: string, data: any) => {
  TagManager.dataLayer({
    dataLayerName: 'GamerOne',
    dataLayer: {
      event: event,
      data: data,
    },
  });
};

export default GTMDataLayer;
