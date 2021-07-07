import { UserAttributes } from 'interfaces/userAttributes';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';

export class UserAttributesModel implements UserAttributes {
  experienceSummary: string | null = null;

  fromDto = (attr: UserAttributes) => {
    this.experienceSummary = attr.experienceSummary;
    return this;
  };
}

export class UserExperienceSummaryModel implements UserExperienceSummary {
  experienceSummary: string | null = null;

  fromDto = (attr: UserAttributes) => {
    this.experienceSummary = attr.experienceSummary;
    return this;
  };
}
