import React from 'react';
import { Sponsor } from 'interfaces';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { DialogActions, DialogContent } from 'components/common/Dialog';
import ListItem from 'components/common/ListItem';
import { selectDeleteSponsorStatus } from 'redux/request-status/selectors';
import { RootState } from 'redux/types';
import SettingsActions from 'redux/settings/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Icon from 'components/common/Icon';

interface SponsorListProps {
  sponsors: Sponsor[];
  onAddClick: () => void;
  onItemClick: (sponsor: Sponsor) => void;
  onClose: () => void;
}

const SponsorList: React.FC<SponsorListProps & MappedProps> = ({
  sponsors,
  onAddClick,
  onItemClick,
  onClose,
  deleteStatus,
  dispatchDelete,
}: SponsorListProps & MappedProps): JSX.Element => {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentSponsor: Sponsor,
  ) => {
    e.stopPropagation();
    dispatchDelete(currentSponsor.id);
  };

  return (
    <>
      <DialogContent>
        {sponsors.length > 0 ? (
          sponsors.map((sponsor) => (
            <ListItem
              key={sponsor.id}
              title={sponsor.name}
              description={sponsor.link}
              image={sponsor.image}
              badgeType="wide"
              onClick={() => onItemClick(sponsor)}
              appendRight={
                <>
                  <Button
                    schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                    iconLeft="icon-bin"
                    onClick={(e) => handleDelete(e, sponsor)}
                    submitting={deleteStatus?.isFetching}
                  />
                  {/* <div className="list-item__drag" /> */}
                </>
              }
            />
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: 0.5 }}>
              <Icon name="icon-monetization-sponsor" size="3x" />
            </div>
            <p style={{ margin: '0.5rem', opacity: 0.3 }}>No Sponsors yet.</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
              }}
            >
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-monetization-sponsor"
                onClick={onAddClick}
              >
                Add sponsor
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
      {sponsors.length > 0 && (
        <DialogActions showDoneButton={sponsors.length > 0} onClose={onClose}>
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            iconLeft="icon-monetization-sponsor"
            onClick={onAddClick}
            disabled={sponsors.length >= 5}
          >
            Add sponsor
          </Button>
        </DialogActions>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  deleteStatus: selectDeleteSponsorStatus(state),
});

const mapDispatchToProps = {
  dispatchDelete: SettingsActions.deleteSponsor,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(SponsorList) as React.ElementType;
