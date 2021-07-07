import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

import PostCard from 'containers/Cards/PostCard';
import ProfileActions from 'redux/profile/actions';
import {
  selectProfileLayoutProcess,
  selectProfileLayoutTemp,
  selectProfileSquad,
} from 'redux/profile/selectors';

import { LayoutSettings } from 'interfaces';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Timeline from '../Timeline';

import {
  PROFILE_LAYOUT_DEFAULT,
  PROFILE_LAYOUT_BREAKPOINTS,
  PROFILE_LAYOUT_COLUMNS,
} from '../layoutConstants';
import {
  selectSocialNetworks,
  selectSponsors,
  selectProducts,
  selectIsSelfProfile,
  selectProfileLayout,
  selectGears,
  selectNowPlaying,
  selectLatestAchievements,
  selectProfileLatestPost,
  selectProfileUser,
} from 'redux/selectors';
import { ProfileLayoutProcessTypeEnum } from 'redux/profile/types';
import { DEFAULT_USER_VISIBILITY, SITE_URL } from 'utils/constants';

import AchievementsCard from './Cards/AchievementsCard';
import SponsorsCard from './Cards/SponsorsCard';
import GearCard from './Cards/GearCard';
import SocialNetworksCard from './Cards/SocialNetworksCard';
import SquadCard from './Cards/SquadCard';
import StoreCard from './Cards/StoreCard';
import NowPlayingCard from './Cards/NowPlayingCard';

import GearSettings from './Dialogs/GearSettings';
import StoreSettings from './Dialogs/StoreSettings';
import SocialNetworkSettings from './Dialogs/SocialNetworkSettings';
import NowPlayingSettings from './Dialogs/NowPlayingSettings';
import SquadSettingsModal from './Dialogs/SquadSettingsModal';
import SponsorSettings from './Dialogs/SponsorSettings';

import './style.scss';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Overview: React.FC = (): JSX.Element => {
  const [nowPlayingSettingsIsOpen, setNowPlayingSettingsIsOpen] = useState(
    false,
  );
  const [
    socialNetworkSettingsIsOpen,
    setSocialNetworkSettingsIsOpen,
  ] = useState(false);
  const [sponsorSettingsIsOpen, setSponsorSettingsIsOpen] = useState(false);
  const [storeSettingsIsOpen, setStoreSettingsIsOpen] = useState(false);
  const [squadSettingsIsOpen, setSquadSettingsIsOpen] = useState(false);
  const [gearSettingsIsOpen, setGearSettingsIsOpen] = useState(false);

  const profileLayout = useSelector(selectProfileLayout);
  // current layouts that will be applied to the react-grid-layout
  const [layouts, setLayouts] = useState(
    profileLayout?.settings || PROFILE_LAYOUT_DEFAULT,
  );

  // a user can change only his profile layout
  const [layoutsBeforeEdit, setLayoutsBeforeEdit] = useState(layouts);

  const isOwner = useSelector(selectIsSelfProfile);
  const socialNetworks = useSelector(selectSocialNetworks);
  const sponsors = useSelector(selectSponsors);
  const latestAchievements = useSelector(selectLatestAchievements);
  const products = useSelector(selectProducts);
  const gears = useSelector(selectGears);
  const nowPlayingGame = useSelector(selectNowPlaying);
  const squadList = useSelector(selectProfileSquad);
  const latestPost = useSelector(selectProfileLatestPost);

  const profileLayoutProcess = useSelector(selectProfileLayoutProcess);
  const dispatch = useDispatch();

  const tempLayout = useSelector(selectProfileLayoutTemp);
  useEffect(() => {
    if (tempLayout?.settings) {
      setLayouts(tempLayout?.settings);
    }
  }, [tempLayout]);
  /**
   * get current react-grid-layout layouts from user's edition
   * @param layout current screen size
   * @param layouts all screen sizes
   */
  const onLayoutChange = (_: any, layouts: any) => {
    dispatch(ProfileActions.getProfileLayoutTemp(layouts));
    setLayouts(layouts);
  };

  const onSaveLayout = () => {
    const layoutSettings: LayoutSettings = {
      settings: tempLayout,
      visibility: profileLayout?.visibility || DEFAULT_USER_VISIBILITY,
    };
    dispatch(ProfileActions.setCurrentProfileLayout(layoutSettings));
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Initial,
      ),
    );
  };

  const onDefaultLayout = () => {
    setLayouts(PROFILE_LAYOUT_DEFAULT);
    const layoutSettings: LayoutSettings = {
      settings: PROFILE_LAYOUT_DEFAULT,
      visibility: DEFAULT_USER_VISIBILITY,
    };
    dispatch(ProfileActions.setCurrentProfileLayout(layoutSettings));
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Initial,
      ),
    );
  };

  const onCancelLayoutEdit = () => {
    setLayouts(layoutsBeforeEdit);
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Initial,
      ),
    );
  };

  useEffect(() => {
    if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.IsEdit) {
      setLayoutsBeforeEdit(layouts);
    } else if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.Save) {
      onSaveLayout();
    } else if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.Default) {
      onDefaultLayout();
    } else if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.Cancel) {
      onCancelLayoutEdit();
    }
    // eslint-disable-next-line
  }, [profileLayoutProcess]);

  // handlers to show/hide card modals
  const handleClickNowPlayingEdit = useCallback(() => {
    setNowPlayingSettingsIsOpen(true);
  }, []);

  const handleCloseNowPlayingSettings = useCallback(() => {
    setNowPlayingSettingsIsOpen(false);
  }, []);

  const handleClickSocialNetworkEdit = useCallback(() => {
    setSocialNetworkSettingsIsOpen(true);
  }, []);

  const handleCloseSocialNetworkSettings = useCallback(() => {
    setSocialNetworkSettingsIsOpen(false);
  }, []);

  const handleClickSponsorsEdit = useCallback(() => {
    setSponsorSettingsIsOpen(true);
  }, []);

  const handleCloseSponsorSettings = useCallback(() => {
    setSponsorSettingsIsOpen(false);
  }, []);

  const handleClickStoreEdit = useCallback(() => {
    setStoreSettingsIsOpen(true);
  }, []);

  const handleCloseStoreSettings = useCallback(() => {
    setStoreSettingsIsOpen(false);
  }, []);

  const handleClickSquadEdit = useCallback(() => {
    setSquadSettingsIsOpen(true);
  }, []);

  const handleCloseSquadSettings = useCallback(() => {
    setSquadSettingsIsOpen(false);
  }, []);

  const handleClickGearEdit = useCallback(() => {
    setGearSettingsIsOpen(true);
  }, []);

  const handleCloseGearSettings = useCallback(() => {
    setGearSettingsIsOpen(false);
  }, []);

  // Page Meta
  const user = useSelector(selectProfileUser);
  const pageTitle = user?.username + "'s Profile";
  const profileMeta = {
    title: pageTitle,
    description: user?.bio,
    image: user?.avatar,
    url: SITE_URL + '/' + user?.username,
    type: 'profile',
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  } as PageMeta;

  return (
    <>
      <OpenGraph title={pageTitle} meta={profileMeta} />
      <ResponsiveGridLayout
        className="layout overview"
        margin={[40, 40]}
        rowHeight={210}
        layouts={layouts}
        cols={PROFILE_LAYOUT_COLUMNS}
        breakpoints={PROFILE_LAYOUT_BREAKPOINTS}
        isResizable={
          isOwner &&
          profileLayoutProcess === ProfileLayoutProcessTypeEnum.IsEdit
            ? true
            : false
        }
        isDraggable={
          isOwner &&
          profileLayoutProcess === ProfileLayoutProcessTypeEnum.IsEdit
            ? true
            : false
        }
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        useCSSTransforms={false}
      >
        <div key="block-user"></div>
        <div key="block-nav"></div>
        <div key="block-sponsors" className={'grid-card'}>
          {sponsors && profileLayout?.visibility?.sponsors && (
            <SponsorsCard
              sponsors={sponsors}
              isOwner={isOwner}
              handleClickEdit={handleClickSponsorsEdit}
            />
          )}
        </div>
        <div key="block-achievements" className={'grid-card'}>
          {profileLayout?.visibility?.achievements && (
            <AchievementsCard achievements={latestAchievements} />
          )}
        </div>
        <div key="block-latest-post" className={'grid-card'}>
          <PostCard post={latestPost} isLatest={true} />
        </div>
        <div key="block-gears" className={'grid-card'}>
          {profileLayout?.visibility?.gear && (
            <GearCard
              gears={gears}
              isOwner={isOwner}
              handleClickEdit={handleClickGearEdit}
            />
          )}
        </div>
        <div key="block-social-networks" className={'grid-card'}>
          {profileLayout?.visibility?.socialNetworks && (
            <SocialNetworksCard
              networks={socialNetworks}
              isOwner={isOwner}
              handleClickEdit={handleClickSocialNetworkEdit}
            />
          )}
        </div>
        <div key="block-now-playing" className={'grid-card'}>
          {profileLayout?.visibility?.nowPlaying && (
            <NowPlayingCard
              playing={nowPlayingGame}
              isOwner={isOwner}
              handleClickEdit={handleClickNowPlayingEdit}
            />
          )}
        </div>
        <div key="block-store" className={'grid-card'}>
          {products && profileLayout?.visibility?.store && (
            <StoreCard
              products={products}
              isOwner={isOwner}
              handleClickEdit={handleClickStoreEdit}
            />
          )}
        </div>
        <div key="block-squad" className={'grid-card'}>
          {profileLayout?.visibility?.squad && (
            <SquadCard
              isOwner={isOwner}
              handleClickEdit={handleClickSquadEdit}
              squadList={squadList}
            />
          )}
        </div>
        {/* <div key="block-schedule" className={'grid-card'}>
          {profileLayout?.visibility?.schedule && (
            <ScheduleCard isOwner={isOwner} />
          )}
        </div> */}
      </ResponsiveGridLayout>

      <Timeline />

      <NowPlayingSettings
        visible={nowPlayingSettingsIsOpen}
        onClose={handleCloseNowPlayingSettings}
      />

      <SocialNetworkSettings
        visible={socialNetworkSettingsIsOpen}
        onClose={handleCloseSocialNetworkSettings}
      />

      <SponsorSettings
        visible={sponsorSettingsIsOpen}
        onClose={handleCloseSponsorSettings}
      />

      <GearSettings
        visible={gearSettingsIsOpen}
        onClose={handleCloseGearSettings}
      />

      <StoreSettings
        visible={storeSettingsIsOpen}
        onClose={handleCloseStoreSettings}
      />

      <SquadSettingsModal
        visible={squadSettingsIsOpen}
        onClose={handleCloseSquadSettings}
      />
    </>
  );
};

export default Overview;
