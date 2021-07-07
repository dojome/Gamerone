import React, { ReactNode } from 'react';
import cn from 'classnames';
import './style.scss';
import { IconName } from '../Icon';
import Loader from '../Loader';

export type ButtonScheme =
  | 'primary'
  | 'subtle'
  | 'reveal'
  | 'square'
  | 'inset'
  | 'subtle-reveal'
  | 'square-on-mobile'
  | null;
export type ButtonSize = 'very-small' | 'small' | 'large';

export enum ButtonSchemeEnum {
  PRIMARY = 'primary',
  SUBTLE = 'subtle',
  REVEAL = 'reveal',
  SQUARE = 'square',
  INSET = 'inset',
  SUBTLE_REVEAL = 'subtle-reveal',
  SQUARE_ON_MOBILE = 'square-on-mobile',
}

export enum ButtonSizeEnum {
  VERY_SMALL = 'very-small',
  SMALL = 'small',
  LARGE = 'large',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: ButtonScheme;
  schemes?: ButtonScheme[];
  submitting?: boolean;
  text?: string;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
  onClick?: (e?: any) => void;
}

const Button = ({
  type = 'button',
  submitting = false,
  scheme,
  schemes,
  size,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  const { disabled } = props;

  const btnClassName = cn('button', className, {
    [`button--${scheme}`]: !!scheme,
    [`button--${size}`]: !!size,
    'is-disabled': disabled,
  });

  const additionalSchemes = schemes
    ?.map((s: ButtonScheme) => ` button--${s}`)
    .join(' ');

  return submitting ? (
    <button
      type={type}
      className={btnClassName + (additionalSchemes ? additionalSchemes : '')}
      {...props}
      disabled
    >
      <Loader />
    </button>
  ) : (
    <button
      type={type}
      className={btnClassName + (additionalSchemes ? additionalSchemes : '')}
      {...props}
    >
      {iconLeft && <i className={`icon icon--left ${iconLeft}`}></i>}

      <span className="text">{children}</span>

      {iconRight && <i className={`icon icon--right ${iconRight}`}></i>}
    </button>
  );
};

export default Button;
