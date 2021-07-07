import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { SITE_NAME } from 'utils/constants';
import IsAuthenticated from 'components/utility/IsAuthenticated';
import ToastContainer from 'components/common/ToastContainer';

import NewPostDialog from 'containers/Post/NewPostDialog';
import ShareDialog from 'components/common/ShareDialog';

import Footer from '../Footer';
import { RootState } from 'redux/types';
import {
  selectCurrentUser,
  selectCurrentUserAvatar,
} from 'redux/auth/selectors';
import { selectNewPostDialogIsOpen } from 'redux/dialogs/selectors';
import AuthActions from 'redux/auth/actions';
import DialogActions from 'redux/dialogs/actions';
import Header from 'components/layout/Header';
import MobileNav from '../MobileNav';
import { DialogTypeEnum } from 'redux/dialogs/types';
import MediaDialog from 'containers/Dialogs/MediaDialog';

export interface PageProps {
  title?: string;
  showHeader?: boolean;
  children?: React.ReactNode;
}

const Page: React.FC<PageProps & MappedProps> = ({
  title,
  showHeader = true,
  children,
  user,
  userAvatar,
  newPostIsOpen,
  dispatchLogout,
  dispatchShowDialog,
}: PageProps & MappedProps): JSX.Element => {
  const handleNewPostOpen = useCallback(() => {
    dispatchShowDialog(DialogTypeEnum.NEW_POST, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewPostClose = useCallback(() => {
    dispatchShowDialog(DialogTypeEnum.NEW_POST, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {title && (
        <Helmet>
          <title>
            {title} | {SITE_NAME}
          </title>
        </Helmet>
      )}
      <MediaDialog />
      {showHeader && (
        <>
          <Header
            avatar={userAvatar}
            username={user.username}
            handleLogout={dispatchLogout}
            handleNewPost={handleNewPostOpen}
          />
          <MobileNav
            avatar={userAvatar}
            username={user.username}
            handleLogout={dispatchLogout}
            handleNewPost={handleNewPostOpen}
          />
        </>
      )}
      <main>{children}</main>
      <Footer />
      <IsAuthenticated>
        <NewPostDialog
          isOpen={newPostIsOpen}
          handleClose={handleNewPostClose}
        />
      </IsAuthenticated>
      <ShareDialog />

      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: selectCurrentUser(state),
  userAvatar: selectCurrentUserAvatar(state),
  newPostIsOpen: selectNewPostDialogIsOpen(state),
});

const mapDispatchToProps = {
  dispatchLogout: AuthActions.logout,
  dispatchShowDialog: DialogActions.showDialog,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
