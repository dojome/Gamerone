import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  selectIsSelfProfile,
  selectGamesStatus,
  selectGames,
  selectHasMoreGames,
  selectProfileUser,
} from 'redux/selectors';
import Loader from 'components/common/Loader';
import UserGameCard from './UserGameCard';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import GameSettings from './GameSettings';
import Card from 'components/common/Card';
import { LOAD_INITIAL_GAMES, LOAD_NEXT_GAMES } from 'redux/types';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';
import { SITE_URL } from 'utils/constants';
import { UserGame } from 'interfaces';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { selectGamePlatforms } from 'redux/settings/selectors';
import { SelectOption } from 'components/common/Form/FormInput';
import SettingsActions from 'redux/settings/actions';

export function useGames() {
  const games = useSelector(selectGames);
  const status = useSelector(selectGamesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_INITIAL_GAMES,
    });
  }, [dispatch]);

  return [games, status, dispatch] as const;
}

const Games: React.FC = (): JSX.Element => {
  const [games, status, dispatch] = useGames();
  const isOwner = useSelector(selectIsSelfProfile);
  const hasMoreGames = useSelector(selectHasMoreGames);

  const fetchMoreData = useCallback(() => {
    dispatch({
      type: LOAD_NEXT_GAMES,
    });
  }, [dispatch]);

  const gamePlatforms = useSelector(selectGamePlatforms);
  const [gamePlatformOptions, setGamePlatformOptions] = useState<
    SelectOption[]
  >([]);

  // Get Game Platforms
  useEffect(() => {
    dispatch(SettingsActions.getGamePlatforms());
    // eslint-disable-next-line
  }, []);

  // Build Select options
  useEffect(() => {
    if (gamePlatforms) {
      const mappedPlatforms: SelectOption[] = gamePlatforms.map((platform) => {
        return { value: platform.id.toString(), label: platform.name };
      });
      setGamePlatformOptions(mappedPlatforms);
    }
  }, [gamePlatforms]);

  const handleAddClick = () => {
    dispatch(DialogActions.showDialog(DialogTypeEnum.SETTINGS_GAME, true));
  };

  const handleSetCurrentUserGame = (userGame: UserGame) => {
    dispatch(
      DialogActions.showDialog(DialogTypeEnum.SETTINGS_GAME, true, userGame),
    );
  };

  // Page Meta
  const user = useSelector(selectProfileUser);
  const pageTitle = user?.username + "'s Games";
  const gamesMeta = {
    title: 'Check out ' + user?.username + "'s " + games?.length + ' games',
    description:
      user?.username +
      ' has a total of ' +
      games?.length +
      ' games listed on their Gamer One profile',
    image: user?.avatar,
    url: SITE_URL + '/' + user?.username + '/games',
    type: 'profile',
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  } as PageMeta;

  return (
    <>
      <OpenGraph title={pageTitle} meta={gamesMeta} />
      <div className="games-meta">
        <Card type="flat">
          <h4 className="card__header card__title">Games</h4>
          <div className="card__content"></div>
          {isOwner && (
            <div className="card__actions">
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-video-game-pacman"
                onClick={handleAddClick}
                data-testid="add"
              >
                Add Game
              </Button>
            </div>
          )}
        </Card>
      </div>

      {status?.isFetching && games.length === 0 && (
        <div style={{ gridColumn: '2 / span 4', marginTop: '6rem', zIndex: 1 }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            <Loader />
          </h1>
        </div>
      )}

      {status?.isSuccess && games.length === 0 && (
        <div style={{ gridColumn: '2 / span 4', marginTop: '6rem', zIndex: 1 }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>No Games.</h1>
        </div>
      )}
      <InfiniteScroll
        dataLength={games.length}
        next={fetchMoreData}
        hasMore={hasMoreGames}
        loader={Loader}
        className="infinite-grid"
        style={{ overflow: 'inherit' }}
      >
        {games.map((userGame) => {
          return (
            <UserGameCard
              key={userGame.id}
              usergame={userGame}
              isOwner={isOwner}
              onEditClick={handleSetCurrentUserGame}
            />
          );
        })}
      </InfiniteScroll>

      {isOwner && <GameSettings platformOptions={gamePlatformOptions} />}
    </>
  );
};

export default Games;
