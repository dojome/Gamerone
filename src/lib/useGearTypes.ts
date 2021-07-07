import { useEffect, useState } from 'react';

import * as ReferenceDataApi from 'api/referenceData';
import { SelectOption } from 'components/common/Form/Input';
import { GearType } from 'interfaces';
import { Notify } from 'components/utility/Notify';

export default function useGearTypes() {
  const [gearTypeOptions, setGearTypeOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchGearTypes = async () => {
      try {
        const gearTypes = (await ReferenceDataApi.gearTypes()) as GearType[];

        setGearTypeOptions(
          gearTypes
            .sort((a, b) => a.ordinal - b.ordinal)
            .map(
              (type) =>
                ({
                  label: type.name,
                  value: type.id,
                } as SelectOption),
            ),
        );
      } catch (err) {
        Notify.warning('Gear ref data are missing');
      }
    };

    fetchGearTypes();
  }, []);

  return gearTypeOptions;
}
