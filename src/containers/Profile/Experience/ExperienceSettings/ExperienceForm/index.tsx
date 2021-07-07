import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { connect } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import InputSearch from 'components/common/Form/InputSearch';

import { Game, UserExperience, UserExperienceAddRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';

import { searchGame } from 'api/game';
import {
  selectAddExperienceStatus,
  selectDeleteExperienceStatus,
  selectUpdateExperienceStatus,
} from 'redux/request-status/selectors';
import ListItem from 'components/common/ListItem';
import { GAME_PLACEHOLDER } from 'utils/constants';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import FormInput from 'components/common/Form/FormInput';
import Badge from 'components/common/Badge';
import Image from 'components/common/Image';
import { SelectOption } from 'components/common/Form/Input';
import { RootState } from 'redux/types';
import { compose } from 'redux';

interface UserExperienceFormProps {
  experience: UserExperience | undefined;
  experienceTypeOptions: SelectOption[];
  onCancel: () => void;
}

export interface ExperienceForm {
  title: string;
  type: string;
  companyName: string;
  game: string;
  startDate: string;
  endDate: string;
  achievements: string;
}

const ExperienceForm: React.FC<UserExperienceFormProps & MappedProps> = ({
  experience,
  experienceTypeOptions,
  onCancel,
  addStatus,
  updateStatus,
  deleteStatus,
  dispatchAdd,
  dispatchUpdate,
  dispatchDelete,
}: UserExperienceFormProps & MappedProps): JSX.Element => {
  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const formMethods = useForm<ExperienceForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      title: experience?.title || '',
      type: experience?.type.id.toString() || '',
      companyName: experience?.companyName || '',
      game: experience?.game.name || '',
      startDate: experience?.startDate
        ? experience?.startDate.substr(0, experience?.startDate.indexOf('T'))
        : '',
      endDate: experience?.endDate
        ? experience?.endDate.substr(0, experience?.endDate.indexOf('T'))
        : '',
      achievements: experience?.achievements || '',
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
      experienceTypeId: data.type,
      title: data.title,
      gameId: searchedGame?.id,
      startDate: data.startDate,
      endDate: data.endDate,
      companyName: data.companyName,
      achievements: data.achievements,
    } as UserExperienceAddRequest;

    if (id) {
      dispatchUpdate(request, id);
    } else {
      dispatchAdd(request);
    }
  };

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (experience && experience.game) return true;
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
    experience: UserExperience,
  ) => {
    e.stopPropagation();
    dispatchDelete(experience.id);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit((e) => onSubmit(e, experience?.id))}
        data-testid="form"
        autoComplete="off"
      >
        <DialogContent>
          <div className="content--2-col" style={{ marginTop: '-0.5rem' }}>
            <FormInput
              type="select"
              name="type"
              label="Type"
              validationRules={{ required: true }}
              selectEmptyOption={true}
              selectOptions={experienceTypeOptions}
            />
            <FormInput
              name="companyName"
              label="Company Name"
              validationRules={{
                required: true,
              }}
            />
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
              initItem={experience?.game || undefined}
              renderItem={renderGameItem}
              appendLeft={renderSelectedGameItem}
              onSearchFinish={setGameSearchResults}
              disabled={experience !== undefined}
            />

            <FormInput
              name="title"
              label="Title"
              validationRules={{
                required: true,
                minLength: 2,
                maxLength: 100,
              }}
              minLength={2}
              maxLength={100}
            />

            <FormInput
              name="startDate"
              label="Start date"
              type="date"
              hint="format: YYYY-MM-DD"
              validationRules={{ required: true }}
            />
            <FormInput
              name="endDate"
              label="End Date"
              type="date"
              hint="format: YYYY-MM-DD"
            />
          </div>
          <FormInput
            type="textarea"
            name="achievements"
            label="Achievements"
            maxLength={250}
          />
        </DialogContent>
        <DialogActions alignRight={true}>
          {experience && (
            <div style={{ marginRight: 'auto' }}>
              <Button
                schemes={[ButtonSchemeEnum.SQUARE]}
                iconLeft="icon-bin"
                onClick={(e) => handleDelete(e, experience)}
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
            iconLeft="icon-single-neutral-id-card-1"
            data-testid="save"
          >
            {experience ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = (state: RootState) => ({
  addStatus: selectAddExperienceStatus(state),
  updateStatus: selectUpdateExperienceStatus(state),
  deleteStatus: selectDeleteExperienceStatus(state),
});

const mapDispatchToProps = {
  dispatchAdd: SettingsActions.createExperience,
  dispatchUpdate: SettingsActions.updateExperience,
  dispatchDelete: SettingsActions.deleteExperience,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(ExperienceForm) as React.ElementType;
