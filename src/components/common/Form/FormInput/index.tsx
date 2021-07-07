import React, { Ref, ReactNode, useState, useEffect, useMemo } from 'react';
import { useFormContext, ValidationRules } from 'react-hook-form';
import cn from 'classnames';
import InputHint from 'components/common/Form/InputHint';
import '../Input/style.scss';
import Icon from 'components/common/Icon';

type SelectOptionType = SelectOption;

export interface SelectOption {
  value?: string | number;
  label?: string;
  description?: string;
}

export interface FormInputProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > {
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'date';
  name: string;
  hint?: string;
  label?: string;
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  validationRules?: ValidationRules;

  appendLeft?: ReactNode;
  appendRight?: ReactNode;

  selectOptions?: SelectOptionType[];
  selectEmptyOption?: boolean;

  dateMin?: string;
  dateMax?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  name,
  label,
  disabled,
  hint,
  validationRules,

  appendLeft,
  appendRight,

  selectOptions,
  selectEmptyOption = true,

  dateMin,
  dateMax,
  ...restProps
}: FormInputProps): JSX.Element => {
  const { register, errors, watch } = useFormContext();
  const [hasContent, setHasContent] = useState(false);
  const error = name ? errors[name] : undefined;
  const inputValue = watch(name);

  // Select - description state
  const [description, setDescription] = useState<string | undefined>(undefined);

  // Select - add empty option
  const generalSelectOptions = useMemo(() => {
    if (selectOptions === undefined) return [];
    if (!selectEmptyOption) return selectOptions;
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
  }, [selectEmptyOption, selectOptions]);

  useEffect(() => {
    setHasContent(!!inputValue);

    // Select
    if (generalSelectOptions.length > 0) {
      const selectedOption = generalSelectOptions.find(
        (opt: SelectOption) => opt.value === inputValue,
      );
      setDescription(selectedOption?.description);
    }
  }, [inputValue, generalSelectOptions]);

  const wrapperClass = cn('input-wrapper', {
    'input-wrapper--select': type === 'select',
    'input-wrapper--date': type === 'date',
    'has-content': hasContent,
    'is-error': error,
    'is-disabled': disabled,
  });

  const inputClass = cn('input', {
    'has-content': hasContent,
    'is-error': error,
    'is-disabled': disabled,
  });

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
        <label className="input-label">
          {label ? <>{hasContent ? label : placeholder}</> : placeholder}
        </label>
      )} */}

      {type === 'textarea' && (
        <textarea
          name={name}
          rows={3}
          disabled={disabled}
          className={inputClass}
          ref={validationRules ? register(validationRules) : register}
          data-testid={name}
          {...restProps}
        />
      )}
      {type === 'select' && (
        <>
          <div className="input-append-right">
            <Icon name="icon-arrow-down-1" style={{ marginRight: '1rem' }} />
          </div>
          <select
            id={name}
            name={name}
            disabled={disabled}
            className={inputClass}
            aria-label={name}
            ref={validationRules ? register(validationRules) : register}
            data-testid={name}
            {...restProps}
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
          type={type === 'date' ? 'date' : 'text'}
          name={name}
          className={inputClass}
          aria-label={name}
          ref={validationRules ? register(validationRules) : register}
          data-testid={name}
          min={dateMin}
          max={dateMax}
          {...restProps}
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

export default React.memo(FormInput);
