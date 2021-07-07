import { Route, User, RouteContentType } from 'interfaces';
import { UserModel } from './user';

export class RouteModel implements Route {
  contentId?: number;
  contentType?: RouteContentType;
  slug?: string;
  content?: User;

  fromDto = (route?: Route) => {
    this.contentId = route?.contentId;
    this.slug = route?.slug;
    this.contentType = route?.contentType;
    this.content = new UserModel().fromDto(route?.content);

    return this;
  };
}
