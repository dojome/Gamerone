import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import DebouncedInput from 'components/common/DebouncedInput';

import GameListItem from '../GameListItem';
import useSearchApi from 'lib/useSearchApi';

// api
import * as GameApi from 'api/game';

import './style.scss';
import Error from 'components/common/Message/Error';
import { Game } from 'interfaces';

export interface SerachGameProps {
  navigate?: boolean;
  multiple?: boolean;
  clearInput?: boolean;
  initLoad?: boolean;
  onAdd?: (id: Game) => void;
  onRemove?: (id: Game) => void;
  limit?: number;
  initGames?: Game[];
}

function SearchGame({
  navigate = true,
  multiple = false,
  clearInput = true,
  initLoad = false,
  onAdd,
  onRemove,
  limit,
  initGames = [],
  ...rest
}: SerachGameProps & React.HTMLProps<HTMLDivElement>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const [query, setQuery] = useState<string | null | undefined>(
    initLoad ? '' : null,
  );
  const [dropdownHidden, setDropdownHidden] = useState(!initLoad);
  const [{ results: games, isSearching, isError }, doFetch] = useSearchApi<
    Game
  >(GameApi.searchGame, initLoad ? '' : null, []);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);

  useEffect(() => {
    doFetch(query);
    if (query === null) setQuery(undefined);
  }, [query, doFetch]);

  useEffect(() => {
    setSelectedGames(initGames);
  }, [initGames]);

  useLayoutEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, [searchRef]);

  const handleInputChange = useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    [setQuery],
  );

  const handleEscKey = useCallback((e) => {
    if (e.keyCode === 27) {
      setDropdownHidden(true);
      if (searchRef.current) searchRef.current.blur();
    }
  }, []);

  const handleDocumentMousedown = useCallback((e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      searchRef.current &&
      searchRef.current !== e.target
    ) {
      setDropdownHidden(true);
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    setDropdownHidden(false);
  }, []);

  const handleItemSelect = useCallback(
    (game: Game) => {
      if (!navigate) {
        if (onAdd) onAdd(game);

        // unless it surpasses the limit
        if (!limit || selectedGames.length < limit)
          setSelectedGames([...selectedGames, game]);

        // selecting one-item list should hide the dropdown
        if (games.length === 1 && games[0].id === game.id)
          setDropdownHidden(true);
      } else if (navigate) {
        history.push('/' + game.name);
      }

      if (clearInput) {
        setQuery(null);
        setDropdownHidden(true);
        if (searchRef.current) searchRef.current.blur();
      } else if (multiple) {
        if (searchRef.current) searchRef.current.focus();
      } else {
        setDropdownHidden(true);
      }
    },
    [
      games,
      navigate,
      multiple,
      clearInput,
      selectedGames,
      onAdd,
      limit,
      history,
    ],
  );

  const handleItemUnselect = useCallback(
    (game: Game) => {
      setSelectedGames(selectedGames.filter((g) => g.id !== game.id));
      if (onRemove) onRemove(game);
    },
    [selectedGames, onRemove],
  );

  const isBlocked = useCallback(
    (id) => {
      return (
        initGames.findIndex((g) => g.id === id) !== -1 ||
        selectedGames.findIndex((p) => id === p.id) !== -1
      );
    },
    [initGames, selectedGames],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey, false);
    document.addEventListener('mousedown', handleDocumentMousedown);
    return () => {
      document.removeEventListener('keydown', handleEscKey, false);
      document.removeEventListener('mousedown', handleDocumentMousedown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div {...rest}>
      <form className="form-inline" aria-label="search-form">
        <DebouncedInput
          inputMode="text"
          value={query}
          className="input debounced-input"
          placeholder="Search Game"
          aria-label="search-games"
          ref={searchRef}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          isLoading={isSearching}
        />
      </form>

      {isError && <Error />}

      {!dropdownHidden && games && (
        <div
          className="search-game-dropdown"
          ref={dropdownRef}
          aria-label="search-dropdown"
        >
          {games.map((game: Game) => (
            <GameListItem
              game={game}
              key={game.id}
              handleClick={handleItemSelect}
              blocked={isBlocked(game.id)}
            />
          ))}
        </div>
      )}

      {selectedGames && (
        <div aria-label="selected-games-list">
          {selectedGames.map((game: Game) => (
            <GameListItem
              key={game.id}
              game={game}
              chosen
              handleItemRemove={handleItemUnselect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(SearchGame);
