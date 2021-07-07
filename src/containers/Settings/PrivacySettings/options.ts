import { VisibilityEnum } from 'interfaces';
import { SelectOption } from 'components/common/Form/Input';
import { capFLetter } from 'utils/caseConversion';

export const VISIBILITY_OPTIONS: SelectOption[] = [
  {
    value: VisibilityEnum.Private,
    label: capFLetter(VisibilityEnum.Private),
    description: 'No one can see',
  },
  {
    value: VisibilityEnum.Public,
    label: capFLetter(VisibilityEnum.Public),
    description: 'Everyone can see',
  },
  {
    value: VisibilityEnum.Followers,
    label: capFLetter(VisibilityEnum.Followers),
    description: 'Only followers can see',
  },
  {
    value: VisibilityEnum.Friends,
    label: capFLetter(VisibilityEnum.Friends),
    description: 'Only mutual follows can see',
  },
  {
    value: VisibilityEnum.Squad,
    label: capFLetter(VisibilityEnum.Squad),
    description: 'Only certain people I added to squad can see',
  },
];
