import React, { useState, useEffect } from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import { UserExperience, ExperienceType } from 'interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'components/utility/Notify';
import * as ReferenceDataApi from 'api/referenceData';
import ExperienceSettings from './ExperienceSettings';
import './style.scss';
import Loader from 'components/common/Loader';
import ExperienceItem from './ExperienceItem';
import {
  selectIsSelfProfile,
  selectExperience,
  selectExperienceStatus,
} from 'redux/selectors';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { SelectOption } from 'components/common/Form/Input';
import Button from 'components/common/Button';
import { LOAD_EXPERIENCES } from 'redux/types';
import ExperienceSummary from './ExperienceSummary';

export function useExperiences() {
  const experiences = useSelector(selectExperience);
  const experiencesStatus = useSelector(selectExperienceStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_EXPERIENCES,
    });
  }, [dispatch]);

  return [experiences, experiencesStatus, dispatch] as const;
}

const Experiences: React.FC = (): JSX.Element => {
  const [experiences, experiencesStatus, dispatch] = useExperiences();
  const isOwner = useSelector(selectIsSelfProfile);

  // Experience Type
  // Loading here as workaround for FormInput select on edit
  const [ExperienceTypeOptions, setExperienceTypeOptions] = useState<
    SelectOption[]
  >([]);

  useEffect(() => {
    const fetchExperienceTypes = async () => {
      try {
        const experienceTypes = ((await ReferenceDataApi.experienceTypes()) as unknown) as ExperienceType[];

        setExperienceTypeOptions(
          experienceTypes.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      } catch (err) {
        Notify.warning('Unable to load experience types.');
      }
    };
    fetchExperienceTypes();
  }, []);

  // Form Dialog Handlers
  const handleAddClick = () => {
    dispatch(
      DialogActions.showDialog(DialogTypeEnum.SETTINGS_EXPERIENCE, true),
    );
  };

  const handleSetCurrentExperience = (experience: UserExperience) => {
    dispatch(
      DialogActions.showDialog(
        DialogTypeEnum.SETTINGS_EXPERIENCE,
        true,
        experience,
      ),
    );
  };

  return (
    <>
      <ExperienceSummary />
      <Card
        type={CardTypeEnum.EXPERIENCE}
        isOwner={isOwner}
        editIcon="icon-add"
        onEdit={handleAddClick}
      >
        <h4 className="card__header card__title">Gaming Experience</h4>
        <div className="experience-items">
          {experiencesStatus?.isFetching && !experiences && (
            <div
              className="experience-item"
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Loader />
            </div>
          )}
          {experiencesStatus?.isSuccess && experiences?.length === 0 && (
            <div
              className="experience-item empty"
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p>No Experience yet</p>

              {isOwner && (
                <Button
                  onClick={handleAddClick}
                  data-testid="add-product"
                  iconLeft="icon-single-neutral-id-card-1"
                >
                  Add experience
                </Button>
              )}
            </div>
          )}
          {experiences?.map((exp: UserExperience) => {
            return (
              <ExperienceItem
                key={exp.id}
                experience={exp}
                isOwner={isOwner}
                onEdit={handleSetCurrentExperience}
              />
            );
          })}
        </div>
      </Card>
      {isOwner && (
        <>
          <ExperienceSettings experienceTypeOptions={ExperienceTypeOptions} />
        </>
      )}
    </>
  );
};

export default Experiences;
