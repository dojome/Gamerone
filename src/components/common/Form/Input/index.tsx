import React, { Ref, ReactNode, useState, useEffect, useMemo } from 'react';
import { InputError } from 'models/error';
import cn from 'classnames';
import InputHint from 'components/common/Form/InputHint';
import './style.scss';
import Icon from 'components/common/Icon';

type SelectOptionType = SelectOption;

export interface SelectOption {
  value?: string | number;
  label?: string;
  description?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > {
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
  name: string;
  label?: string;
  onChange?(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  placeholder?: string;
  value?: string;
  hint?: string;
  error?: InputError;
  inputRef?: Ref<HTMLInputElement>;
  textareaRef?: Ref<HTMLTextAreaElement>;

  appendLeft?: ReactNode;
  appendRight?: ReactNode;

  selectRef?: Ref<HTMLSelectElement>;
  selectOptions?: SelectOptionType[];
  selectEmptyOption?: boolean;
  selectInitValue?: string | number;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  label,
  onChange,
  placeholder,
  value,
  hint,
  error,
  inputRef,
  textareaRef,

  appendLeft,
  appendRight,

  selectRef,
  selectOptions,
  selectInitValue,

  ...props
}: InputProps): JSX.Element => {
  const { disabled } = props;

  const [hasContent, setHasContent] = useState(false);

  // Start Select specific functions
  const [description, setDescription] = useState<string | undefined>(undefined);

  // Add empty option
  const generalSelectOptions = useMemo(() => {
    if (selectOptions === undefined) return [];
    const emptyValue = selectOptions.find((opt) => opt.value === '');
    if (emptyValue === undefined)
      return [
        {
          value: '',
          label: '',
        } as SelectOption,
        ...selectOptions,
      ];
    return selectOptions;
  }, [selectOptions]);

  // Wrapper so the hint is updated on change
  const handleSelectOnChange = (e: any) => {
    // call the passed in onChange event
    onChange && onChange(e);
    // update the selected/hint
    const selectedOption = generalSelectOptions.find(
      (opt: SelectOption) => opt.value === e.target.value,
    );
    setHasContent(true);
    setDescription(selectedOption?.description);
  };

  useEffect(() => {
    if (selectInitValue !== undefined) {
      setDescription(
        generalSelectOptions.find(
          (opt: SelectOption) => opt.value === selectInitValue,
        )?.description,
      );
    }
  }, [generalSelectOptions, selectInitValue]);
  // End Select

  const wrapperClass = cn('input-wrapper', {
    'input-wrapper--select': type === 'select',
    'has-content': hasContent,
    'is-error': error,
    'is-disabled': disabled,
  });

  const inputClass = cn('input', {
    'has-content': hasContent,
    'is-error': error,
    'is-disabled': disabled,
  });

  const handleOnChange = (e: any) => {
    onChange && onChange(e);
    setHasContent(e.target.value.length > 0);
  };

  return (
    <div className={wrapperClass}>
      {appendLeft && <div className="input-append-left">{appendLeft}</div>}
      {appendRight && type !== 'select' && (
        <div className="input-append-right">{appendRight}</div>
      )}

      {label && (
        <label className="input-label" data-testid={name + '-label'}>
          {label}
        </label>
      )}

      {/* {placeholder && (
        <label className="input-label" data-testid={name + '-label'}>
          {label ? (
            <>{hasContent ? label : placeholder}</>
          ) : (
            placeholder
          )}
        </label>
      )} */}

      {type === 'textarea' && (
        <textarea
          name={name}
          disabled={disabled}
          className={inputClass}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          ref={textareaRef}
          data-testid={name}
          {...props}
        />
      )}
      {type === 'select' && (
        <>
          <div className="input-append-right">
            <Icon name="icon-arrow-down-1" style={{ marginRight: '1rem' }} />
          </div>
          <select
            name={name}
            disabled={disabled}
            className={inputClass}
            onChange={handleSelectOnChange}
            aria-label={name}
            value={value}
            ref={(e: any) => {
              if (e && e.value) setHasContent(e.value.length > 0);
              if (typeof selectRef === typeof Function) {
                (selectRef as Function)(e);
              } else if (selectRef) {
                selectRef = e;
              }
            }}
            data-testid={name}
            autoComplete="off"
          >
            {generalSelectOptions.map(
              (opt: SelectOptionType, index: number) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ),
            )}
          </select>
        </>
      )}
      {type !== 'select' && type !== 'textarea' && (
        <input
          type={type}
          name={name}
          disabled={disabled}
          className={inputClass}
          onChange={handleOnChange}
          aria-label={name}
          value={value}
          ref={(e: any) => {
            if (e && e.value) setHasContent(e.value.length > 0);
            if (typeof inputRef === typeof Function) {
              (inputRef as Function)(e);
            } else if (inputRef) {
              inputRef = e;
            }
          }}
          data-testid={name}
          {...props}
        />
      )}

      {(description || hint || error) && (
        <InputHint
          type="input"
          hint={description ? description : hint}
          error={error}
          data-testid={error ? name + '-error' : name + '-hint'}
        />
      )}
    </div>
  );
};

export default React.memo(Input);
