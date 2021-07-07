import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useForm, ValidationRules } from 'react-hook-form';
import cn from 'classnames';
import { InputError } from 'models/error';
import InputHint from 'components/common/Form/InputHint';
import useSearchApi, { SearchApi } from 'lib/useSearchApi';
import { Game, User, Club, Gear } from 'interfaces';
import useOutsideClick from 'lib/useOutsideClick';
import debounce from 'lib/debounce';
import Icon from 'components/common/Icon';
import Loader from 'components/common/Loader';
import '../Input/style.scss';
import './style.scss';

export interface InputSearchProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: InputError;
  register?: ReturnType<typeof useForm>['register'];
  validationRules?: ValidationRules;
  appendLeft?: (item: T) => React.ReactElement;

  api: SearchApi;
  initItem?: T;
  renderItem: (item: T, hideResults: (it: T) => void) => React.ReactElement;
  onSearchFinish?: (results: T[]) => void;
}

export type SearchData = Game | User | Club | Gear;

function InputSearch<T extends SearchData>({
  name,
  label,
  hint,
  error,
  register,
  validationRules,
  initItem,
  api,
  renderItem,
  onSearchFinish,
  appendLeft,
  ...props
}: InputSearchProps<T>) {
  const { disabled, onChange, onClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(initItem);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [{ results, isSearching }, doSearch] = useSearchApi<T>(api, null, []);
  const [hasContent, setHasContent] = useState(false);

  const wrapperClass = cn('input-wrapper input-search', {
    'is-open': isOpen,
    'has-content': hasContent,
    'is-error': error,
    'is-disabled': disabled,
  });

  const inputClass = cn('input', {
    'has-content': hasContent,
    'is-error': error,
    'is-disabled': disabled,
  });

  const handleInputFocus = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  const debouncedSearch = useMemo(
    () => debounce((value) => doSearch(value), 800),
    [doSearch],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }

      e.persist(); // https://fb.me/react-event-pooling
      e.target.value.length > 0 && debouncedSearch(e.target.value);
      setHasContent(e.target.value.length > 0);
      setIsOpen(e.target.value.length > 0);
    },
    [onChange, debouncedSearch],
  );

  const hideResults = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSearchResultClick = useCallback((item: T) => {
    setSelectedItem(item);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // send search results
    if (!isSearching && onSearchFinish) onSearchFinish(results);

    return () => {
      !onSearchFinish || onSearchFinish([]);
    };
  }, [isSearching, results, onSearchFinish]);

  useOutsideClick([searchResultsRef, searchInputRef], hideResults);

  return (
    <div className={wrapperClass} data-testid={name + '-wrapper'}>
      <div className="input-search-bar">
        {appendLeft && selectedItem && (
          <div className="input-append-left">{appendLeft(selectedItem)}</div>
        )}
        <div className="input-append-right">
          {isSearching ? (
            <Loader />
          ) : (
            <Icon name="icon-arrow-down-1" style={{ marginRight: '1rem' }} />
          )}
        </div>
        {label && (
          <label
            htmlFor={name}
            className="input-label"
            data-testid={name + '-label'}
          >
            {label}
          </label>
        )}
        <input
          type="select"
          name={name}
          disabled={disabled}
          className={inputClass}
          aria-label={name}
          ref={(e) => {
            if (e && e.value) setHasContent(e.value.length > 0);
            searchInputRef.current = e;
            if (register && e) register(e, validationRules);
          }}
          {...props}
          onChange={handleInputChange}
          onClick={handleInputFocus}
          data-testid={name}
          autoComplete="off"
        />
      </div>
      {(hint || error) && (
        <InputHint
          type="input"
          hint={hint}
          error={error}
          data-testid={error ? name + '-error' : name + '-hint'}
        />
      )}
      <div
        className={`input-search-result${
          !isSearching && hasContent ? ' has-results' : ''
        }`}
        ref={searchResultsRef}
      >
        {isSearching && hasContent ? (
          <div className="loading-message">Getting results...</div>
        ) : !isSearching && results.length === 0 && hasContent ? (
          <div className="loading-message">No search results...</div>
        ) : (
          results.map((item: T) => renderItem(item, handleSearchResultClick))
        )}
      </div>
    </div>
  );
}

export default InputSearch;
