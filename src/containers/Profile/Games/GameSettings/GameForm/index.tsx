import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { connect } from 'react-redux';

import { GameAddRequest, UserGame, Game } from 'interfaces';
import SettingsActions from 'redux/settings/actions';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import { compose } from 'redux';
import { RootState } from 'redux/types';
import InputSearch from 'components/common/Form/InputSearch';
import { SelectOption } from 'components/common/Form/Input';
import {
  selectAddUserGameStatus,
  selectUpdateUserGameStatus,
  selectDeleteGameStatus,
} from 'redux/request-status/selectors';
import {
  ERROR_MSG_MIN_LENGTH_3,
  ERROR_MSG_MIN_LENGTH_2,
} from 'utils/formErrors';
import FormInput from 'components/common/Form/FormInput';
import ListItem from 'components/common/ListItem';
import Badge from 'components/common/Badge';
import Image from 'components/common/Image';
import { GAME_PLACEHOLDER } from 'utils/constants';
import { searchGame } from 'api/game';
import ToastMessage from 'components/common/ToastMessage';

interface GameFormProps {
  userGame: UserGame | undefined;
  platformOptions: SelectOption[];
  onCancel: () => void;
}

export interface UserGameForm {
  game: string;
  gamerTag: string;
  platform: string;
  region: string;
}

const GameForm: React.FC<GameFormProps & MappedProps> = ({
  userGame,
  platformOptions,
  onCancel,
  addStatus,
  updateStatus,
  deleteStatus,
  dispatchAdd,
  dispatchUpdate,
  dispatchDelete,
}: GameFormProps & MappedProps): JSX.Element => {
  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const formMethods = useForm<UserGameForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      game: userGame?.game.name || '',
      gamerTag: userGame?.gamertag || '',
      platform: userGame?.platform?.id.toString() || '',
      region: userGame?.region || '',
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    errors,
    clearErrors,
  } = formMethods;

  const { isDirty } = formState;

  const onSubmit = async (
    data: Record<string, any>,
    id: number | undefined,
  ) => {
    const request = {
      gameId: searchedGame?.id,
      gamePlatformId: data.platform,
      gamertag: data.gamerTag,
      region: data.region,
    } as GameAddRequest;

    if (id) {
      dispatchUpdate(request, id);
    } else {
      dispatchAdd(request);
    }
  };

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (userGame && userGame.game) return true;
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

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentUserGame: UserGame,
  ) => {
    e.stopPropagation();
    dispatchDelete(currentUserGame.id);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit((e) => onSubmit(e, userGame?.id))}
        data-testid="form"
        autoComplete="off"
      >
        <DialogContent>
          {addStatus?.isError && (
            <ToastMessage
              type="inline"
              text={addStatus?.error?.message}
              icon="icon-remove-circle"
            />
          )}
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
            initItem={userGame?.game || undefined}
            renderItem={renderGameItem}
            appendLeft={renderSelectedGameItem}
            onSearchFinish={setGameSearchResults}
            disabled={userGame !== undefined}
          />

          <FormInput
            name="gamerTag"
            label="Gamer Tag"
            validationRules={{
              minLength: {
                value: 3,
                message: ERROR_MSG_MIN_LENGTH_3,
              },
              maxLength: 30,
            }}
            maxLength={30}
          />

          <FormInput
            type="select"
            name="platform"
            label="Platform"
            selectEmptyOption={true}
            selectOptions={platformOptions}
          />

          <FormInput
            name="region"
            label="Region"
            validationRules={{
              minLength: {
                value: 2,
                message: ERROR_MSG_MIN_LENGTH_2,
              },
              maxLength: 30,
            }}
            maxLength={30}
          />
        </DialogContent>
        <DialogActions alignRight={true}>
          {userGame && (
            <div style={{ marginRight: 'auto' }}>
              <Button
                schemes={[ButtonSchemeEnum.SQUARE]}
                iconLeft="icon-bin"
                onClick={(e) => handleDelete(e, userGame)}
                submitting={deleteStatus?.isFetching}
              />
            </div>
          )}
          <Button onClick={onCancel} data-testid="cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isDirty}
            scheme={ButtonSchemeEnum.PRIMARY}
            submitting={addStatus?.isFetching || updateStatus?.isFetching}
            iconLeft="icon-video-game-pacman"
            data-testid="save"
          >
            {userGame ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = (state: RootState) => ({
  addStatus: selectAddUserGameStatus(state),
  updateStatus: selectUpdateUserGameStatus(state),
  deleteStatus: selectDeleteGameStatus(state),
});

const mapDispatchToProps = {
  dispatchAdd: SettingsActions.addUserGame,
  dispatchUpdate: SettingsActions.updateUserGame,
  dispatchDelete: SettingsActions.deleteUserGame,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(GameForm) as React.ElementType;
