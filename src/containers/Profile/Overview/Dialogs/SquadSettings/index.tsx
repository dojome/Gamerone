import React from 'react';
import { connect } from 'react-redux';
import ListItemProfile from 'components/common/ListItem';

import { AVATAR_PLACEHOLDER } from 'utils/constants';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { RootState } from 'redux/types';
import {
  selectProfileSquad,
  selectCurrentProfileId,
} from 'redux/profile/selectors';
import {
  selectSettingsPendingSquad,
  selectSettingsOutgoingSquad,
} from 'redux/settings/selectors';
import ProfileActions from 'redux/profile/actions';
import SettingsActions from 'redux/settings/actions';
import './style.scss';
import Icon from 'components/common/Icon';
import { useHistory } from 'react-router-dom';
import { User } from 'interfaces';

const SquadSettings: React.FC<MappedProps> = ({
  currentProfileId,
  squadList,
  squadPendingList,
  squadOutgoingList,
  dispatchGetSquadList,
  dispatchGetPendingSquadList,
  dispatchGetOutgoingSquadList,
  dispatchAcceptRequest,
  dispatchDeclineRequest,
  dispatchDeleteSquad,
}: MappedProps): JSX.Element => {
  const history = useHistory();

  React.useEffect(() => {
    dispatchGetPendingSquadList();
    dispatchGetOutgoingSquadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (currentProfileId) dispatchGetSquadList(currentProfileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfileId]);

  const onItemClick = (friend: User) => {
    history.push('/' + friend.username);
  };

  const SquadList = React.useMemo(
    () =>
      squadList.map(({ friend }) => (
        <ListItemProfile
          key={friend.id}
          title={friend.username}
          description={(friend.firstName || '') + ' ' + (friend.lastName || '')}
          image={friend.avatar || AVATAR_PLACEHOLDER}
          onClick={() => onItemClick(friend)}
          appendRight={
            <Button
              schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
              iconLeft="icon-bin"
              onClick={(e) => {
                e.stopPropagation();
                dispatchDeleteSquad(friend.id);
              }}
            />
          }
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [squadList],
  );

  const PendingSquadList = React.useMemo(
    () =>
      squadPendingList.map(({ user }) => (
        <ListItemProfile
          key={user.id}
          title={user.username}
          description={(user.firstName || '') + ' ' + (user.lastName || '')}
          image={user.avatar || AVATAR_PLACEHOLDER}
          onClick={() => onItemClick(user)}
          appendRight={
            <div style={{ display: 'flex' }}>
              <Button
                schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                iconLeft="icon-check-1"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatchAcceptRequest(user.id);
                }}
              />
              <Button
                schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                iconLeft="icon-bin"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatchDeclineRequest(user.id);
                }}
              />
            </div>
          }
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [squadPendingList],
  );

  const OutgoingSquadList = React.useMemo(
    () =>
      squadOutgoingList.map(({ friend }) => (
        <ListItemProfile
          key={friend.id}
          title={friend.username}
          description={(friend.firstName || '') + ' ' + (friend.lastName || '')}
          image={friend.avatar || AVATAR_PLACEHOLDER}
        />
      )),
    [squadOutgoingList],
  );

  return (
    <div className="squad-settings">
      {squadPendingList.length === 0 &&
        squadOutgoingList.length === 0 &&
        squadList.length === 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: 0.5 }}>
              <Icon name="icon-video-game-controller-team" size="3x" />
            </div>
            <p style={{ margin: '0.5rem', opacity: 0.3 }}>No Squad yet.</p>
          </div>
        )}
      {squadPendingList.length > 0 && (
        <div className="squad-pending-list">
          <h5>Waiting invites</h5>
          {PendingSquadList}
        </div>
      )}
      {squadPendingList.length > 0 && squadList.length > 0 && <hr />}
      {squadList.length > 0 && (
        <div className="squad-list">
          <h5>Your squad</h5>
          {SquadList}
        </div>
      )}
      {squadOutgoingList.length > 0 && squadList.length > 0 && <hr />}
      {squadOutgoingList.length > 0 && (
        <div className="squad-outgoing-list">
          <h5>Outgoing requests</h5>
          {OutgoingSquadList}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentProfileId: selectCurrentProfileId(state),
  squadList: selectProfileSquad(state),
  squadPendingList: selectSettingsPendingSquad(state),
  squadOutgoingList: selectSettingsOutgoingSquad(state),
});

const mapDispatchToProps = {
  dispatchGetSquadList: ProfileActions.getSquad,
  dispatchGetPendingSquadList: SettingsActions.getPendingSquad,
  dispatchGetOutgoingSquadList: SettingsActions.getOutgoingSquad,
  dispatchAcceptRequest: SettingsActions.acceptSquad,
  dispatchDeclineRequest: SettingsActions.declineSquad,
  dispatchDeleteSquad: SettingsActions.deleteSquad,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SquadSettings);
