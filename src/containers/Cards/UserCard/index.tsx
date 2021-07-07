import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card, { CardTypeEnum } from 'components/common/Card';
import { User } from 'interfaces';
import FollowStatusBlock from 'components/common/FollowStatus';
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import FollowBlock from 'containers/Profile/FollowBlock';
import { UserModel } from 'models/user';
import './style.scss';
import Avatar from 'components/common/Avatar';
import Badge from 'components/common/Badge';
import { Link } from 'react-router-dom';
import EditProfileDialog from 'containers/Profile/Overview/Dialogs/EditProfileDialog';
import CardVisibilitySettings from 'containers/Profile/Overview/Dialogs/CardVisibilitySettings';
import { selectUserSettingsIsOpen } from 'redux/dialogs/selectors';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';

export type UserCardType = 'standard' | 'compact' | 'short';
export enum UserCardTypeEnum {
  Standard = 'standard',
  Compact = 'compact',
  Short = 'short',
}

export interface UserCardProps {
  type?: UserCardType;
  user: User;
  isSelf: boolean;
  allowEditLayout?: boolean;
  isEditing?: boolean;
  onEdit?: (e?: any) => void;
  onSaveLayoutEdit?: (e?: any) => void;
  onDefault?: (e?: any) => void;
  onCancelEdit?: (e?: any) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  type = UserCardTypeEnum.Standard,
  user,
  isSelf = false,
  allowEditLayout = false,
  isEditing,
  onEdit,
  onSaveLayoutEdit,
  onDefault,
  onCancelEdit,
}: UserCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const settingsIsOpen = useSelector(selectUserSettingsIsOpen);
  const [visibilityForm, setVisibilityForm] = useState(false);
  const {
    avatar,
    firstName,
    lastName,
    username,
    birthDate,
    location,
    isPro,
    isStreamer,
    isInfluencer,
  } = user;
  const fullName = (firstName || '') + ' ' + (lastName || '');
  const { followCount, followerCount } = (user as UserModel).followStatus;
  const handleClickEdit = useCallback(() => {
    dispatch(DialogActions.showDialog(DialogTypeEnum.SETTINGS_USER, true));
  }, [dispatch]);

  const handleCloseUserSettings = useCallback(() => {
    dispatch(DialogActions.showDialog(DialogTypeEnum.SETTINGS_USER, false));
  }, [dispatch]);

  const handleCloseVisibilitySettings = useCallback(() => {
    setVisibilityForm(false);
  }, []);

  return (
    <>
      {type === UserCardTypeEnum.Standard ? (
        <>
          <Card
            type={CardTypeEnum.USER}
            isOwner={isSelf}
            onEdit={handleClickEdit}
            data-testid="card-user"
          >
            <div className="card__header">
              <Link to={`/${username}`}>
                <Avatar
                  src={avatar}
                  alt={username}
                  title={username}
                  size="huge"
                />
              </Link>
              <h1 className="username">
                <span className="at">@</span>
                {username}
                {isPro && <span className="user-type-badge">PRO</span>}
                {isStreamer && <span className="user-type-badge">STR</span>}
                {isInfluencer && <span className="user-type-badge">INF</span>}
              </h1>
              <h2 className="name">{fullName}</h2>
            </div>
            <div
              className="card__content status-wrapper"
              style={{ paddingTop: '0px' }}
            >
              {user.bio && (
                <div className="status">
                  <span className="icon">&ldquo;</span>
                  {user.bio}
                </div>
              )}
            </div>
            <div
              className="card__content"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <FollowStatusBlock
                username={username}
                followCount={followCount}
                followerCount={followerCount}
                location={location}
                birthDate={birthDate}
              />
            </div>

            <div className="card__actions">
              <FollowBlock isSelf={isSelf} />
              {isSelf && allowEditLayout && (
                <>
                  {!isEditing && (
                    <Button
                      onClick={onEdit}
                      className="button--transparent"
                      data-testid="edit-layout"
                    >
                      Edit layout
                    </Button>
                  )}
                  {isEditing && (
                    <>
                      <Button
                        scheme={ButtonSchemeEnum.PRIMARY}
                        size={ButtonSizeEnum.SMALL}
                        onClick={onSaveLayoutEdit}
                        data-testid="save-layout"
                      >
                        Save
                      </Button>
                      <Button
                        size={ButtonSizeEnum.SMALL}
                        onClick={onDefault}
                        data-testid="default-layout"
                      >
                        Default
                      </Button>
                      <Button
                        size={ButtonSizeEnum.SMALL}
                        onClick={onCancelEdit}
                        data-testid="cancel-layout"
                      >
                        Cancel
                      </Button>
                      <Button
                        size={ButtonSizeEnum.SMALL}
                        onClick={() => setVisibilityForm(true)}
                        data-testid="visibility-layout"
                      >
                        Visibility
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </Card>
          <CardVisibilitySettings
            visible={visibilityForm}
            onClose={handleCloseVisibilitySettings}
          />
          <EditProfileDialog
            visible={settingsIsOpen}
            onClose={handleCloseUserSettings}
          />
        </>
      ) : type === UserCardTypeEnum.Compact ? (
        <Card
          type={CardTypeEnum.USER_COMPACT}
          isOwner={false}
          onEdit={handleClickEdit}
        >
          <div className="card__header">
            <Link to={`/${username}`}>
              <Avatar
                src={avatar}
                alt={username}
                title={username}
                size="xlarge"
              />
            </Link>

            <h3 className="username">
              <span className="at">@</span>
              {username}
              {isPro && <span className="user-type-badge">PRO</span>}
              {isStreamer && <span className="user-type-badge">STR</span>}
              {isInfluencer && <span className="user-type-badge">INF</span>}
            </h3>
            <h4 className="name">{fullName}</h4>
          </div>
          <div
            className="card__content"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              textAlign: 'center',
            }}
          >
            <Link to={`${username}/following`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Badge type="flat" testid="follow-badge">
                  {followCount}
                </Badge>
                <label style={{ margin: '0.5rem 0 0' }}>following</label>
              </div>
            </Link>
            <Link to={`${username}/followers`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Badge type="flat" testid="follower-badge">
                  {followerCount}
                </Badge>
                <label style={{ margin: '0.5rem 0 0' }}>followers</label>
              </div>
            </Link>
          </div>
          <div className="card__actions" style={{ justifyContent: 'center' }}>
            <Link to={'/' + username}>
              <Button>My Profile</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card
          type={CardTypeEnum.USER}
          onEdit={handleClickEdit}
          data-testid="card-user-short"
          className="card--user-1-row"
        >
          <div className="card__header">
            <Link to={`/${username}`}>
              <Avatar
                src={avatar}
                alt={username}
                title={username}
                size="huge"
              />
            </Link>
            <h1 className="username">
              <span className="at">@</span>
              {username}
              {isPro && <span className="user-type-badge">PRO</span>}
              {isStreamer && <span className="user-type-badge">STR</span>}
              {isInfluencer && <span className="user-type-badge">INF</span>}
            </h1>
            <h2 className="name">{fullName}</h2>
          </div>
          <div
            className="card__content"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            <FollowBlock isSelf={isSelf} />
          </div>
        </Card>
      )}
    </>
  );
};

export default UserCard;
