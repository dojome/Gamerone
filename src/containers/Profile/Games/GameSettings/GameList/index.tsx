import React from 'react';
import { UserGame } from 'interfaces';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { DialogActions, DialogContent } from 'components/common/Dialog';
import ListItem from 'components/common/ListItem';
import { selectDeleteGameStatus } from 'redux/request-status/selectors';
import { RootState } from 'redux/types';
import SettingsActions from 'redux/settings/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Icon from 'components/common/Icon';

interface GameListProps {
  games: UserGame[];
  onAddClick: () => void;
  onItemClick: (userGame: UserGame) => void;
  onClose: () => void;
}

const GameList: React.FC<GameListProps & MappedProps> = ({
  games,
  onAddClick,
  onItemClick,
  onClose,
  deleteStatus,
  dispatchDelete,
}: GameListProps & MappedProps): JSX.Element => {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentUserGame: UserGame,
  ) => {
    e.stopPropagation();
    dispatchDelete(currentUserGame.id);
  };

  return (
    <>
      <DialogContent>
        {games.length > 0 ? (
          games.map((userGame) => (
            <ListItem
              key={userGame.id}
              title={userGame.game.name}
              image={userGame.game.cover}
              onClick={() => onItemClick(userGame)}
              appendRight={
                <>
                  <Button
                    schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                    iconLeft="icon-bin"
                    onClick={(e) => handleDelete(e, userGame)}
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
              <Icon name="icon-video-game-pacman" size="3x" />
            </div>
            <p style={{ margin: '0.5rem', opacity: 0.3 }}>No Games yet.</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
              }}
            >
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-video-game-pacman"
                onClick={onAddClick}
              >
                Add game
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
      {games.length > 0 && (
        <DialogActions showDoneButton={games.length > 0} onClose={onClose}>
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            iconLeft="icon-video-game-pacman"
            onClick={onAddClick}
          >
            Add game
          </Button>
        </DialogActions>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  deleteStatus: selectDeleteGameStatus(state),
});

const mapDispatchToProps = {
  dispatchDelete: SettingsActions.deleteUserGame,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(GameList) as React.ElementType;
