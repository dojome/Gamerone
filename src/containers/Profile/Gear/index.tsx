import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProfileActions from 'redux/profile/actions';
import SettingsActions from 'redux/settings/actions';

import {
  selectGears,
  selectIsSelfProfile,
  selectGearsStatus,
  selectProfileUser,
} from 'redux/selectors';
import { selectCurrentProfileId } from 'redux/profile/selectors';
import Loader from 'components/common/Loader';
import UserGearCard from './UserGearCard';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import GearSettings from '../Overview/Dialogs/GearSettings';
import Card from 'components/common/Card';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';
import { SITE_URL } from 'utils/constants';

export function useGears() {
  const isOwner = useSelector(selectIsSelfProfile);
  const userId = useSelector(selectCurrentProfileId);
  const gears = useSelector(selectGears);
  const status = useSelector(selectGearsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(
        isOwner
          ? SettingsActions.loadInitialPage('gears')
          : ProfileActions.loadInitialPage('gears'),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return [gears, status] as const;
}

const Gear: React.FC = (): JSX.Element => {
  const [gears, status] = useGears();
  const isOwner = useSelector(selectIsSelfProfile);
  const [gearSettingsIsOpen, setGearSettingsIsOpen] = useState(false);

  const handleClickGearEdit = useCallback(() => {
    setGearSettingsIsOpen(true);
  }, []);

  const handleCloseGearSettings = useCallback(() => {
    setGearSettingsIsOpen(false);
  }, []);

  // Page Meta
  const user = useSelector(selectProfileUser);
  const pageTitle = user?.username + "'s Gear";
  const gearMeta = {
    title: 'Check out ' + user?.username + "'s " + gears?.length + ' items',
    description:
      user?.username +
      ' has a total of ' +
      gears?.length +
      ' hardware items listed on their Gamer One profile',
    image: user?.avatar,
    url: SITE_URL + '/' + user?.username + '/gear',
    type: 'profile',
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  } as PageMeta;

  return (
    <>
      <OpenGraph title={pageTitle} meta={gearMeta} />
      <div className="games-meta">
        <Card type="flat">
          <h4 className="card__header card__title">Gear</h4>
          <div className="card__content"></div>
          {isOwner && (
            <div className="card__actions">
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-keyboard"
                onClick={handleClickGearEdit}
                data-testid="add"
              >
                Manage
              </Button>
            </div>
          )}
        </Card>
      </div>

      {status?.isFetching && gears.length === 0 && (
        <div style={{ gridColumn: '2 / span 4', marginTop: '6rem', zIndex: 1 }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            <Loader />
          </h1>
        </div>
      )}

      {status?.isSuccess && gears.length === 0 && (
        <div style={{ gridColumn: '2 / span 4', marginTop: '6rem', zIndex: 1 }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>No Gear.</h1>
        </div>
      )}

      {gears.map((userGear) => {
        return <UserGearCard key={userGear.id} userGear={userGear} />;
      })}
      {isOwner && (
        <GearSettings
          visible={gearSettingsIsOpen}
          onClose={handleCloseGearSettings}
        />
      )}
    </>
  );
};

export default Gear;
