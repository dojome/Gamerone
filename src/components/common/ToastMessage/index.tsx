import React, { useState, useEffect } from 'react';
import Icon, { IconName } from '../Icon';
import cn from 'classnames';
import './style.scss';

export interface ToastMessageProps {
  type?: 'success' | 'info' | 'warning' | 'error' | 'inline';
  text?: string;
  icon?: IconName;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  type,
  text,
  icon,
}: ToastMessageProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const toastClasses = cn('toast-message', {
    [`toast-message--${type}`]: !!type,
    [`is-active`]: isActive,
  });

  useEffect(() => {
    setTimeout(function () {
      setIsActive(true);
    }, 500);
    setTimeout(function () {
      setIsActive(false);
    }, 5000);
  }, []);

  const closeToast = () => {
    setIsActive(false);
  };

  return (
    <div className={toastClasses}>
      <i className={`icon icon-15x ${icon} toast-message__icon`} />

      <span className="text">{text}</span>

      <button
        onClick={closeToast}
        className="button button--small button--square button--subtle button--subtle-reveal close"
      >
        <Icon name="icon-remove" />
      </button>
    </div>
  );
};

export default ToastMessage;
