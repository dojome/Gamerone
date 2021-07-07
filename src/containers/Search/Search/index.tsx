import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Loader from 'components/common/Loader';
import Icon from 'components/common/Icon';
import useSearchApi from 'lib/useSearchApi';
import debounce from 'lib/debounce';
import { searchProfile } from 'api/profile';
import { User } from 'interfaces';
import useOutsideClick from 'lib/useOutsideClick';
import Logo from 'components/common/Logo';
import Avatar from 'components/common/Avatar';

const Search: React.FC = (): JSX.Element => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [{ results, isSearching }, doSearch, setSearchState] = useSearchApi<
    User
  >(searchProfile, null, []);

  const handleInputFocus = useCallback(() => {
    // clearInterval(blurInput);
    setSearchIsOpen(true);
    setInputHasFocus(true);
  }, []);

  const closeSearch = useCallback(() => {
    // Timeout on setting inputhasfocus so that clearInput can detect focus
    // blurInput = setTimeout(() => {
    //   setInputHasFocus(false);
    // }, 200);

    if (searchValue.length <= 0) {
      setSearchIsOpen(false);
      // setIsLoading(false);
    }
  }, [searchValue]);

  const debouncedSearch = useMemo(
    () => debounce((value) => doSearch(value), 800),
    [doSearch],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);

      if (e.target.value.length < 3) return;

      e.persist(); // https://fb.me/react-event-pooling
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  const clearInput = useCallback(() => {
    setSearchValue('');
    setSearchIsOpen(false);
    setInputHasFocus(false);
  }, []);

  const clearResults = useCallback(() => {
    setSearchState({ results: [], isError: false, isSearching: false });
  }, [setSearchState]);

  useOutsideClick([searchRef], clearInput);

  const renderItem = (item: User) => (
    <Link
      to={'/' + item.username}
      className="search-result__item"
      onClick={() => {
        clearInput();
        clearResults();
      }}
      key={item.id}
    >
      <Avatar
        src={item.avatar}
        alt={item.username}
        title={item.username}
        size="tiny"
      />
      <h4 className="title">
        <span className="at">@</span>
        {item.username}
      </h4>
      <label className="descr">User</label>
      <Icon name={'icon-arrow-right-1'} />
    </Link>
  );

  return (
    <div className={`search ${searchIsOpen ? 'is-open' : ''}`} ref={searchRef}>
      <div className="search-bar">
        <Link to={'/'} className="search-logo">
          {isSearching ? <Loader /> : <Logo />}
        </Link>

        <input
          type="text"
          className={`search-input${inputHasFocus ? ' has-focus' : ''}`}
          ref={(e) => {
            searchInputRef.current = e;
            // if (register && e) register(e, validateOptions);
          }}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          data-testid={'header-search'}
          onBlur={closeSearch}
          placeholder="Search..."
        />

        {searchValue.length > 0 && (
          <span onClick={clearInput} className="search-close">
            <Icon name={'icon-remove'} />
          </span>
        )}
      </div>

      <div
        className={`search-result${
          !isSearching && searchValue.length > 0 ? ' has-results' : ''
        }`}
      >
        <>
          {isSearching ? (
            <div className="loading-message">Getting results...</div>
          ) : !isSearching && results.length === 0 && searchValue.length > 0 ? (
            <div className="loading-message">No search results...</div>
          ) : (
            results.map((item) => renderItem(item))
          )}
        </>
      </div>
    </div>
  );
};

export default Search;
