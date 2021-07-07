import React from 'react';
import './style.scss';

export interface InputLoadingProps {
  id?: string;
  show?: boolean;
  floatRight?: boolean;
}

const InputLoading: React.FC<InputLoadingProps> = ({
  id,
  show = false,
}: InputLoadingProps): JSX.Element => {
  return show ? (
    <div id={id} className={'inputloading'} data-testid="input-loading">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  ) : (
    <></>
  );
};

export default InputLoading;
