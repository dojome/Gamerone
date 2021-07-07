import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Input, { SelectOption } from 'components/common/Form/Input';
import InputSearch from 'components/common/Form/InputSearch';

import { Game, GameAddRequest, UserGame, GameUpdateRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectAddUserGameStatus,
  selectUpdateUserGameStatus,
  selectDeleteGameStatus,
} from 'redux/request-status/selectors';
import { searchGame } from 'api/game';

import './style.scss';
import {
  ERROR_MSG_MIN_LENGTH_2,
  ERROR_MSG_MIN_LENGTH_3,
} from 'utils/formErrors';
import ListItem from 'components/common/ListItem';
import { GAME_PLACEHOLDER } from 'utils/constants';
import Dialog, { DialogContent, DialogActions } from 'components/common/Dialog';

interface GameSettingsProps {
  show: boolean;
  usergame: UserGame | null;
  gamePlatformOptions: SelectOption[];
  onCancel: () => void;
}

function GameSettings({
  usergame,
  show = false,
  onCancel,
  gamePlatformOptions,
}: GameSettingsProps) {
  const gameAddStatus = useSelector(selectAddUserGameStatus);
  const gameUpdateStatus = useSelector(selectUpdateUserGameStatus);
  const gameDeleteStatus = useSelector(selectDeleteGameStatus);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;

  // const [isAddInfo, setIsAddInfo] = useState(false);

  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (usergame) return true;

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
    handleSearchResultClick: (g: Game) => void,
  ) => (
    <ListItem
      key={game.id}
      title={game.name}
      image={game.cover || GAME_PLACEHOLDER}
      testId="list-item-game"
      onClick={() => {
        setValue('game', game.name);
        if (errors['game']) clearErrors('game');

        handleSearchResultClick(game);
        setSearchedGame(game);
      }}
    />
  );

  // useEffect(() => {
  //   if (searchedGame) {
  //     setIsAddInfo(true);
  //   }
  // }, [searchedGame]);

  const onCancelModal = useCallback(() => {
    // setIsAddInfo(false);
    setSearchedGame(undefined);
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (
      (!gameUpdateStatus?.isFetching && !gameUpdateStatus?.isError) ||
      (!gameDeleteStatus?.isFetching && !gameDeleteStatus?.isError)
    )
      onCancelModal();
  }, [gameUpdateStatus, gameDeleteStatus, onCancelModal]);

  useEffect(() => {
    if (!gameAddStatus?.isFetching && !gameAddStatus?.isError) {
      onCancelModal();
    }
  }, [gameAddStatus, onCancelModal]);

  useEffect(() => {
    if (usergame) {
      const formData = {
        game: usergame.game.name,
        gamerTag: usergame.gamertag,
        platform: usergame?.platform?.id.toString() || '',
        region: usergame.region,
      };
      setSearchedGame(usergame.game);
      reset(formData);
    } else {
      const formData = {
        game: '',
        gamerTag: '',
        platform: '0',
        region: '',
      };
      reset(formData);
    }
  }, [usergame, reset]);

  const onSubmit = async (data: Record<string, any>) => {
    if (usergame) {
      dispatch(
        SettingsActions.updateUserGame(
          {
            gameId: searchedGame?.id,
            gamePlatformId: data.platform,
            gamertag: data.gamerTag,
            region: data.region,
          } as GameUpdateRequest,
          usergame.id,
        ),
      );
      return;
    }

    dispatch(
      SettingsActions.addUserGame({
        gameId: searchedGame?.id,
        gamePlatformId: data.platform,
        gamertag: data.gamerTag,
        region: data.region,
      } as GameAddRequest),
    );
  };

  const onDeleteUserGame = () => {
    if (usergame) dispatch(SettingsActions.deleteUserGame(usergame.id));
  };

  return (
    <Dialog
      title={usergame?.game?.name || 'Add Game'}
      testid="add-game"
      show={show}
      onClose={onCancelModal}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogContent>
        <InputSearch<Game>
          name="game"
          label="Game"
          placeholder="Search ..."
          register={register}
          validationRules={{
            required: usergame ? false : true,
            validate: validateInputtedGame,
          }}
          error={errors['game']}
          api={searchGame}
          renderItem={renderGameItem}
          onSearchFinish={setGameSearchResults}
          disabled={usergame !== null}
        />
        <Input
          name="gamerTag"
          label="Gamer Tag"
          inputRef={register({
            minLength: {
              value: 3,
              message: ERROR_MSG_MIN_LENGTH_3,
            },
            maxLength: 30,
          })}
          maxLength={30}
          error={errors['gamerTag']}
        />

        <Input
          type="select"
          name="platform"
          label="Platform"
          selectRef={register}
          selectEmptyOption={true}
          selectOptions={gamePlatformOptions}
          selectInitValue={usergame?.platform?.id.toString() || ''}
        />

        <Input
          name="region"
          label="Region"
          inputRef={register({
            minLength: {
              value: 2,
              message: ERROR_MSG_MIN_LENGTH_2,
            },
            maxLength: 30,
          })}
          maxLength={30}
          error={errors['region']}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          disabled={!isDirty}
          scheme={ButtonSchemeEnum.PRIMARY}
          submitting={gameAddStatus?.isFetching}
          data-testid="save"
        >
          {usergame ? 'Update' : 'Save'}
        </Button>
        {usergame && (
          <Button
            onClick={onDeleteUserGame}
            submitting={gameDeleteStatus?.isFetching}
            data-testid="delete"
          >
            Delete
          </Button>
        )}
        <Button onClick={onCancelModal} data-testid="cancel">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(GameSettings);
