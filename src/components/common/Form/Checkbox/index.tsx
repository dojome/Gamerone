import React, { Ref } from 'react';
import Icon, { IconName } from 'components/common/Icon';
import cn from 'classnames';
import './style.scss';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  iconLeft?: IconName;
  // hint?: string;
  // error?: InputError;
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  iconLeft,
  onChange,
  value,
  checked,
  // hint,
  // error,
  disabled,
  inputRef,
}: CheckboxProps): JSX.Element => {
  // const { disabled } = props;
  // const wrapperClass = cn('checkbox-wrapper', {
  //   'is-error': error,
  //   'is-disabled': disabled,
  // });

  const checkboxClass = cn('checkbox', {
    // 'is-error': error,
    'is-disabled': disabled,
  });

  return (
    <label htmlFor={name} className={checkboxClass}>
      {iconLeft && <Icon name={iconLeft} size="125x" />}
      <span className="text">{label}</span>

      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        aria-label={name}
        ref={inputRef}
        value={value}
        checked={checked}
        data-testid={name}
        onChange={onChange}
      />

      <div className="toggle">
        <div className="toggle__box"></div>
        <i className="icon icon-remove unchecked" />
        <i className="icon icon-check-1 checked" />
      </div>
    </label>
    // <div style={{ display: 'flex', width: '100%' }}>
    //   {label && (
    //     <label
    //       htmlFor={name}
    //       className="checkbox-label"
    //       data-testid={name + '-label'}
    //     >
    //       {label}
    //     </label>
    //   )}
    //   <div className={wrapperClass}>
    //     <input
    //       type="checkbox"
    //       id={name}
    //       name={name}
    //       disabled={disabled}
    //       className={checkboxClass}
    //       aria-label={name}
    //       ref={inputRef}
    //       data-testid={name}
    //       {...props}
    //     />
    //     {(hint || error) && (
    //       <InputHint type="checkbox" hint={hint} error={error} />
    //     )}
    //   </div>
    // </div>
  );
};

export default Checkbox;
