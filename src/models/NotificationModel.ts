import {
  Notification,
  PostMentionNotification,
  SquadRequestNotification,
  SquadRequestAcceptedNotification,
} from 'interfaces';

export class NotificationModel {
  id = '';
  username = '';
  title = '';
  imageSrc = '';

  fromDTO = (notification: Notification) => {
    this.id = notification.id;

    switch (notification.type) {
      case 'G1\\Notifications\\PostMention':
        const postUser = (notification as PostMentionNotification).data.user;
        this.username = postUser.username;
        this.title = postUser.username + ' mentioned you.';
        this.imageSrc = postUser.avatar;
        break;

      case 'G1\\Notifications\\SquadRequest':
        const squadRequestUser = (notification as SquadRequestNotification).data
          .source;
        this.username = squadRequestUser.username;
        this.title = squadRequestUser.username + ' invited you to their squad.';
        this.imageSrc = squadRequestUser.avatar;
        break;

      case 'G1\\Notifications\\SquadRequestAccepted':
        const squadAcceptedUser = (notification as SquadRequestAcceptedNotification)
          .data.source;
        this.username = squadAcceptedUser.username;
        this.title =
          squadAcceptedUser.username + ' accepted your squad invite.';
        this.imageSrc = squadAcceptedUser.avatar;
        break;

      default:
        break;
    }

    return this;
  };
}
