import { useEffect, useState } from 'react';

import * as ReferenceDataApi from 'api/referenceData';
import { SocialNetwork } from 'interfaces';
import { Notify } from 'components/utility/Notify';

export default function useSocialNetworks() {
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  useEffect(() => {
    const fetchSocialNetworks = async () => {
      try {
        const socialNetworks = (await ReferenceDataApi.socialNetworks()) as SocialNetwork[];

        setSocialNetworks(socialNetworks.sort((a, b) => a.ordinal - b.ordinal));
      } catch (err) {
        Notify.warning('Social network ref data is missing.');
      }
    };

    fetchSocialNetworks();
  }, []);

  return socialNetworks;
}
