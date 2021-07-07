import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';

import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import InputSearch from 'components/common/Form/InputSearch';
import Checkbox from 'components/common/Form/Checkbox';
import { searchGame } from 'api/game';

import { Game } from 'interfaces';
import {
  selectSettingsNowPlaying,
  selectProfileSocialNetworks,
} from 'redux/settings/selectors';
import SettingsActions from 'redux/settings/actions';

import {
  selectUpdateNowPlayingStatus,
  selectDeleteNowPlayingStatus,
} from 'redux/request-status/selectors';
import { createSelector } from 'reselect';
import {
  STREAM_MEDIAS,
  SOCIAL_NETWORK_ICON_LIST,
  GAME_PLACEHOLDER,
} from 'utils/constants';
import { NowPlayingSettings, NowPlayingSettingsModel } from './types';
import ListItem from 'components/common/ListItem';
import Dialog, { DialogContent, DialogActions } from 'components/common/Dialog';
import Icon from 'components/common/Icon';
import Badge from 'components/common/Badge';
import Image from 'components/common/Image';

interface NowPlayingSettingsModalProps {
  visible?: boolean;
  onClose: () => void;
}

const selectWatchList = createSelector(
  selectProfileSocialNetworks,
  (networks) =>
    networks.filter((social) =>
      STREAM_MEDIAS.includes(social.name.toLowerCase()),
    ),
);

export default function NowPlayingSettingsModal({
  visible = false,
  onClose,
}: NowPlayingSettingsModalProps) {
  const dispatch = useDispatch();
  const watchList = useSelector(selectWatchList);
  const currentGame = useSelector(selectSettingsNowPlaying);
  const updateStatus = useSelector(selectUpdateNowPlayingStatus);
  const deleteStatus = useSelector(selectDeleteNowPlayingStatus);

  const {
    register,
    errors,
    formState,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm<NowPlayingSettings>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);
  const { isDirty } = formState;

  useEffect(() => {
    if (currentGame) {
      setSearchedGame(currentGame.game || undefined);
      setIsPlaying(currentGame.game ? true : false);
      reset(new NowPlayingSettingsModel().fromGame(currentGame));
    } else {
      reset(new NowPlayingSettingsModel());
    }
  }, [currentGame, reset]);

  useEffect(() => {
    if (!updateStatus?.isSuccess || !deleteStatus?.isSuccess) {
      onClose();
    }
  }, [updateStatus, deleteStatus, onClose]);

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (currentGame.game) return true;
    const matchedGame = gameSearchResults.find(
      (game) => game.name === inputtedGame,
    );

    if (matchedGame && matchedGame.id !== searchedGame?.id) {
      setSearchedGame(matchedGame);
    }

    return matchedGame !== undefined || 'Invalid';
  };

  const renderGameItem = (
    game: Game,
    handleSearchResultClick: (it: Game) => void,
  ) => (
    <ListItem
      key={game.id}
      title={game.name}
      image={game.cover}
      badgeSize="tiny"
      testId="list-item-game"
      onClick={() => {
        setValue('game', game.name);
        if (errors['game']) clearErrors('game');

        handleSearchResultClick(game);
        setSearchedGame(game);
      }}
    />
  );

  const renderSelectedGameItem = (game: Game) => (
    <Badge size="tiny" testid="list-item-badge">
      <Image
        src={game.cover || GAME_PLACEHOLDER}
        alt={game.name}
        title={game.name}
        width={28}
      />
    </Badge>
  );

  const onSubmit = (data: NowPlayingSettings) => {
    dispatch(
      SettingsActions.updateNowPlayingGame(
        new NowPlayingSettingsModel(data).toRequest(searchedGame),
      ),
    );
  };

  const onDeleteNowPlaying = () => {
    dispatch(SettingsActions.deleteNowPlayingGame());
  };

  return (
    <Dialog
      type="narrow"
      title="Now Playing"
      testid="now-playing"
      show={visible}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <DevTool control={control} /> */}
      <DialogContent>
        <p style={{ marginBottom: '0.5rem' }}>
          Select which game you are playing:
        </p>

        <InputSearch<Game>
          name="game"
          label="Game"
          register={register}
          validationRules={{
            required: true,
            validate: validateInputtedGame,
          }}
          error={errors['game']}
          api={searchGame}
          initItem={currentGame?.game || undefined}
          renderItem={renderGameItem}
          appendLeft={renderSelectedGameItem}
          onSearchFinish={setGameSearchResults}
        />
        <p style={{ marginBottom: '0.5rem' }} data-testid="watchHere-label">
          Show &apos;Watch now&apos; buttons:
        </p>
        <div data-testid="watchHere">
          {watchList.length ? (
            watchList.map((social) => (
              <Checkbox
                key={social.id}
                name={social.name.toLowerCase()}
                label={social.name}
                iconLeft={SOCIAL_NETWORK_ICON_LIST[social.name.toLowerCase()]}
                inputRef={register({ required: false })}
              />
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '1.5rem',
                paddingLeft: '0.5rem',
              }}
            >
              <Icon
                name={'icon-information-circle'}
                size="125x"
                style={{ marginRight: '1rem', color: 'var(--theme-color)' }}
              />
              <p style={{ lineHeight: '1.25rem', opacity: 0.5 }}>
                Add social networks to your profile in order to show &apos;Watch
                now&apos; buttons.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onDeleteNowPlaying}
          disabled={!isPlaying}
          data-testid="delete"
        >
          Deactivate
        </Button>
        <span className="last">
          <Button
            type="submit"
            scheme={ButtonSchemeEnum.PRIMARY}
            size={ButtonSizeEnum.LARGE}
            disabled={!isDirty}
            data-testid="save"
          >
            Save
          </Button>
        </span>
      </DialogActions>
    </Dialog>
  );
}
