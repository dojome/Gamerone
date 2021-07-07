import React from 'react';
import { UserGear } from 'interfaces';
import Icon from 'components/common/Icon';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import ListItem from 'components/common/ListItem';
import { RootState } from 'redux/types';
import { selectDeleteGearStatus } from 'redux/request-status/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SettingsActions from 'redux/settings/actions';

interface UserGearListProps {
  userGears: UserGear[];
  onAddClick: () => void;
  onItemClick: (userGear: UserGear) => void;
  onClose: () => void;
}

const UserGearList: React.FC<UserGearListProps & MappedProps> = ({
  userGears,
  onAddClick,
  onItemClick,
  onClose,
  deleteStatus,
  dispatchDelete,
}: UserGearListProps & MappedProps): JSX.Element => {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentUserGear: UserGear,
  ) => {
    e.stopPropagation();
    dispatchDelete(currentUserGear.id);
  };

  return (
    <>
      <DialogContent>
        {userGears.length > 0 ? (
          userGears.map((userGear) => (
            <ListItem
              key={userGear.id}
              title={userGear.gear.name}
              description={userGear.link}
              image={userGear.image}
              onClick={() => onItemClick(userGear)}
              appendRight={
                <>
                  <Button
                    schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                    iconLeft="icon-bin"
                    onClick={(e) => handleDelete(e, userGear)}
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
              <Icon name="icon-keyboard" size="3x" />
            </div>
            <p style={{ margin: '0.5rem', opacity: 0.3 }}>No Gear yet.</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
              }}
            >
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-keyboard"
                onClick={onAddClick}
              >
                Add gear
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
      {userGears.length > 0 && (
        <DialogActions showDoneButton={userGears.length > 0} onClose={onClose}>
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            iconLeft="icon-video-game-controller"
            onClick={onAddClick}
            disabled={userGears.length >= 10}
          >
            Add gear
          </Button>
        </DialogActions>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  deleteStatus: selectDeleteGearStatus(state),
});

const mapDispatchToProps = {
  dispatchDelete: SettingsActions.deleteUserGear,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(UserGearList) as React.ElementType;
