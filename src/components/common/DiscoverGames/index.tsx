import React, { useState, useCallback } from 'react';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import SearchGame from 'containers/Search/SearchGame';

import { Game } from 'interfaces';
import Dialog, { DialogContent, DialogActions } from '../Dialog';

interface DiscoverGamesProps {
  discoverLimit?: number;
  initGames: Game[];
  show: boolean;
  onFinish: (games: Game[]) => void;
  onCancel: () => void;
}
function DiscoverGames({
  show = false,
  onCancel,
  onFinish,
  initGames,
  discoverLimit = 3,
}: DiscoverGamesProps) {
  const [selectedGames, setSelectedGames] = useState<Game[]>(initGames);
  const [message, setMessage] = useState<string | null>(null); // TODO: Figure out the needs to limit the number of taggable games

  const handleFinish = () => {
    if (discoverLimit && selectedGames.length > discoverLimit) return;

    onFinish(selectedGames);
  };

  const handleGameAdded = useCallback(
    (game: Game) => {
      if (!discoverLimit || selectedGames.length < discoverLimit)
        setSelectedGames([...selectedGames, game]);
      else if (discoverLimit && selectedGames.length >= discoverLimit) {
        setMessage(`You can tag up to ${discoverLimit} games.`);
      }
    },
    [selectedGames, discoverLimit],
  );

  const handleGameRemoved = useCallback(
    (game: Game) => {
      setSelectedGames(selectedGames.filter((g) => g.id !== game.id));
      if (message) {
        setMessage(null);
      }
    },
    [selectedGames, message],
  );

  return (
    <Dialog
      type="narrow"
      show={show}
      onClose={onCancel}
      title="Discover Games"
      testid="discover-games"
    >
      <DialogContent>
        <SearchGame
          multiple
          navigate={false}
          clearInput={false}
          className="discover-block"
          onAdd={handleGameAdded}
          onRemove={handleGameRemoved}
          limit={discoverLimit}
          initGames={initGames}
        />
        {message && <span>{message}</span>}
      </DialogContent>
      <DialogActions>
        <Button scheme={ButtonSchemeEnum.PRIMARY} onClick={handleFinish}>
          Finish
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(DiscoverGames);
