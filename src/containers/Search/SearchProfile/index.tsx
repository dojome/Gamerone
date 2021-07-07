import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import DebouncedInput from 'components/common/DebouncedInput';

import ProfileListItem from '../ProfileListItem';
import useSearchApi from 'lib/useSearchApi';

// api
import * as ProfileApi from 'api/profile';

import './style.scss';
import Error from 'components/common/Message/Error';
import { User } from 'interfaces';

export interface SerachProfileProps {
  navigate?: boolean;
  multiple?: boolean;
  clearInput?: boolean;
  initLoad?: boolean;
  onAdd?: (id: number) => void;
  onRemove?: (id: number) => void;
  limit?: number;
  blockedIds?: number[];
}

function SearchProfile({
  navigate = true,
  multiple = false,
  clearInput = true,
  initLoad = false,
  onAdd,
  onRemove,
  limit,
  blockedIds = [],
  ...rest
}: SerachProfileProps & React.HTMLProps<HTMLDivElement>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const [query, setQuery] = useState<string | null | undefined>(
    initLoad ? '' : null,
  );
  const [dropdownHidden, setDropdownHidden] = useState(!initLoad);
  const [{ results: profiles, isSearching, isError }, doFetch] = useSearchApi<
    User
  >(ProfileApi.searchProfile, initLoad ? '' : null, []);
  const [selectedProfiles, setSelectedProfiles] = useState<User[]>([]);

  useEffect(() => {
    doFetch(query);
    if (query === null) setQuery(undefined);
  }, [query, doFetch]);

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
    (profile: User) => {
      if (!navigate) {
        if (onAdd) onAdd(profile.id);

        // unless it surpasses the limit
        if (!limit || selectedProfiles.length < limit)
          setSelectedProfiles([...selectedProfiles, profile]);

        // selecting one-item list should hide the dropdown
        if (profiles.length === 1 && profiles[0].id === profile.id)
          setDropdownHidden(true);
      } else if (navigate) {
        history.push('/' + profile.username);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      profiles,
      selectedProfiles,
      navigate,
      history,
      multiple,
      clearInput,
      limit,
    ],
  );

  const handleItemUnselect = useCallback(
    (id: number) => {
      setSelectedProfiles(
        selectedProfiles.filter((profile) => profile.id !== id),
      );
      if (onRemove) onRemove(id);
    },
    [selectedProfiles, onRemove],
  );

  const isBlocked = useCallback(
    (id) => {
      return (
        blockedIds.findIndex((b) => b === id) !== -1 ||
        selectedProfiles.findIndex((p) => id === p.id) !== -1
      );
    },
    [blockedIds, selectedProfiles],
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
      <form aria-label="search-form">
        <DebouncedInput
          inputMode="text"
          value={query}
          className="input debounced-input"
          placeholder="Profile Search ..."
          aria-label="search-profiles"
          ref={searchRef}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          isLoading={isSearching}
        />
      </form>

      {isError && <Error />}

      {!dropdownHidden && profiles && (
        <div
          className="search-profile-dropdown"
          ref={dropdownRef}
          aria-label="search-dropdown"
        >
          {profiles.map((profile: User) => (
            <ProfileListItem
              profile={profile}
              key={profile.id}
              handleClick={handleItemSelect}
              blocked={isBlocked(profile.id)}
            />
          ))}
        </div>
      )}

      {selectedProfiles && (
        <div aria-label="selected-profiles-list">
          {selectedProfiles.map((profile: User) => (
            <ProfileListItem
              key={profile.id}
              profile={profile}
              chosen
              handleItemRemove={handleItemUnselect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(SearchProfile);
