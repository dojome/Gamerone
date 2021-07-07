import React from 'react';
import { SocialNetwork } from 'interfaces';
import Icon from 'components/common/Icon';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { DialogActions, DialogContent } from 'components/common/Dialog';
import ListItem from 'components/common/ListItem';
import { RootState } from 'redux/types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SettingsActions from 'redux/settings/actions';
import { selectDeleteSocialStatus } from 'redux/request-status/selectors';
import SocialNetworkIcon from 'containers/Profile/Overview/Cards/SocialNetworksCard/SocialNetworkIcon';

interface SocialNetworkListProps {
  socialNetworks: SocialNetwork[];
  onAddClick: () => void;
  onItemClick: (socialNetwork: SocialNetwork) => void;
  onClose: () => void;
}

const SocialNetworkList: React.FC<SocialNetworkListProps & MappedProps> = ({
  socialNetworks,
  onAddClick,
  onItemClick,
  onClose,
  deleteStatus,
  dispatchDelete,
}: SocialNetworkListProps & MappedProps): JSX.Element => {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentSocialNetwork: SocialNetwork,
  ) => {
    e.stopPropagation();
    dispatchDelete(currentSocialNetwork.id);
  };

  return (
    <>
      <DialogContent>
        {socialNetworks.length > 0 ? (
          socialNetworks.map((socialNetwork) => (
            <ListItem
              key={socialNetwork.id}
              title={socialNetwork.name}
              icon={<SocialNetworkIcon name={socialNetwork.name} size="15x" />}
              description={socialNetwork.value}
              onClick={() => onItemClick(socialNetwork)}
              appendRight={
                <>
                  <Button
                    schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                    iconLeft="icon-bin"
                    onClick={(e) => handleDelete(e, socialNetwork)}
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
              <Icon name="icon-user-network" size="3x" />
            </div>
            <p style={{ margin: '0.5rem', opacity: 0.3 }}>
              No Social Networks yet.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
              }}
            >
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-user-network"
                onClick={onAddClick}
              >
                Add social network
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
      {socialNetworks.length > 0 && (
        <DialogActions
          showDoneButton={socialNetworks.length > 0}
          onClose={onClose}
        >
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            iconLeft="icon-user-network"
            onClick={onAddClick}
            disabled={socialNetworks.length >= 5}
          >
            Add social network
          </Button>
        </DialogActions>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  deleteStatus: selectDeleteSocialStatus(state),
});

const mapDispatchToProps = {
  dispatchDelete: SettingsActions.deleteSocial,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(SocialNetworkList) as React.ElementType;
