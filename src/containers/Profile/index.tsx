import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route as ReactRoute,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Grid from 'components/layout/Grid';
import withChrome from 'components/common/Chrome/withChrome';
import NotFound from 'containers/NotFound';
import { OverviewRoute, ProfileRoute } from './route';
import ProfileNav from './ProfileNav';

import { selectIsSelfProfile, selectProfileUser } from 'redux/selectors';

import ProfileActions from 'redux/profile/actions';
import { Route } from 'interfaces';
import * as ProfileApi from 'api/profile';
import usePromise from 'lib/usePromise';
import ProfileCover from './ProfileCover';
import { ProfileLayoutProcessTypeEnum } from 'redux/profile/types';

import UserCard from 'containers/Cards/UserCard';
import PostDetail from 'containers/Post/PostDetail';
import Page from 'components/layout/Page';
import LoaderFullScreen from 'components/common/LoaderFullScreen';

const ChromeGrid = withChrome(Grid);

const Profile: React.FC = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectProfileUser);
  const isSelf = useSelector(selectIsSelfProfile);
  const history = useHistory();
  const dispatch = useDispatch();

  const { username } = useParams();
  const [nameResolving, resolvedProfile, nameError] = usePromise<Route>(
    () => ProfileApi.resolveRoute(username),
    [username],
  );

  const onEditLayout = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.IsEdit,
      ),
    );
    setIsEditing(true);
  };

  const onSaveLayout = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(ProfileLayoutProcessTypeEnum.Save),
    );
    setIsEditing(false);
  };

  const onMakeLayoutDefault = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Default,
      ),
    );
    setIsEditing(false);
  };

  const onCancelEdit = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Cancel,
      ),
    );
    setIsEditing(false);
  };

  useEffect(() => {
    if (resolvedProfile) {
      dispatch(ProfileActions.setResolvedContent(resolvedProfile));
    }
    if (nameError) dispatch(ProfileActions.setCurrentProfile(null));
  }, [resolvedProfile, nameError, dispatch]);

  return (
    <>
      {nameResolving && !resolvedProfile && <LoaderFullScreen />}
      {!nameResolving && nameError && <NotFound username={username} />}
      {!nameResolving && resolvedProfile && (
        <>
          <ProfileCover />
          <ChromeGrid>
            {user &&
              (history.location.pathname === `/${user.username}` ? (
                <UserCard
                  user={user}
                  isSelf={isSelf}
                  allowEditLayout={true}
                  isEditing={isEditing}
                  onEdit={onEditLayout}
                  onSaveLayoutEdit={onSaveLayout}
                  onDefault={onMakeLayoutDefault}
                  onCancelEdit={onCancelEdit}
                />
              ) : (
                <UserCard type="short" user={user} isSelf={isSelf} />
              ))}
            <ProfileNav />
            <ProfileRoute />
          </ChromeGrid>
          <OverviewRoute />
        </>
      )}
    </>
  );
};

const ProfilePost = (): JSX.Element => {
  const match = useRouteMatch();
  // const { username } = useParams();
  return (
    <Page>
      <Switch>
        <ReactRoute
          exact
          path={`${match.path}/post/:postId(\\d+)`}
          component={withChrome(PostDetail, 200)}
        />
        <ReactRoute path={`${match.path}`} component={Profile} />
      </Switch>
    </Page>
  );
};

export default ProfilePost;
