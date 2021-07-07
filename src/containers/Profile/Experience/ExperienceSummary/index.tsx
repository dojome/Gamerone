import React, { useEffect } from 'react';
import Card from 'components/common/Card';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsSelfProfile,
  selectExperienceSummary,
  selectExperienceSummaryStatus,
} from 'redux/selectors';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import Button from 'components/common/Button';
import { LOAD_EXPERIENCE_SUMMARY } from 'redux/types';
import ExperienceSummarySettings from './ExperienceSummarySettings';
import Loader from 'components/common/Loader';

export function useExperienceSummary() {
  const experienceSummary = useSelector(selectExperienceSummary);
  const experienceSummaryStatus = useSelector(selectExperienceSummaryStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_EXPERIENCE_SUMMARY,
    });
  }, [dispatch]);

  return [experienceSummary, experienceSummaryStatus, dispatch] as const;
}

const ExperienceSummary: React.FC = (): JSX.Element => {
  const [
    experienceSummary,
    experienceSummaryStatus,
    dispatch,
  ] = useExperienceSummary();
  const isOwner = useSelector(selectIsSelfProfile);

  // Form Dialog Handlers
  const handleAddClick = () => {
    dispatch(
      DialogActions.showDialog(
        DialogTypeEnum.SETTINGS_EXPERIENCE_SUMMARY,
        true,
        experienceSummary,
      ),
    );
  };

  return (
    <>
      <div className="experience-summary">
        <Card
          type="experience-summary"
          isOwner={isOwner && experienceSummary !== null}
          onEdit={handleAddClick}
        >
          <h4 className="card__header card__title">Experience Summary</h4>
          <div className="card__content">
            {experienceSummaryStatus?.isFetching && !experienceSummary && (
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
            {experienceSummaryStatus?.isSuccess && !experienceSummary && (
              <div
                className="experience-item empty"
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p>No summary yet.</p>

                {isOwner && (
                  <Button
                    onClick={handleAddClick}
                    data-testid="add-product"
                    iconLeft="icon-single-neutral-id-card-1"
                  >
                    Add summary
                  </Button>
                )}
              </div>
            )}
            {experienceSummaryStatus?.isSuccess && experienceSummary && (
              <div className="status">
                <span className="icon">&ldquo;</span>
                <p>{experienceSummary}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      {isOwner && (
        <>
          <ExperienceSummarySettings />
        </>
      )}
    </>
  );
};

export default ExperienceSummary;
