import React, { ReactNode, useRef } from 'react';
import useOutsideClick from 'lib/useOutsideClick';
import cn from 'classnames';
import Icon from '../Icon';
import useSmoothOpen from 'lib/useSmoothOpen';
import Button from '../Button';
import { ImageCarousel } from '../ImageCarousel';
import './style.scss';

export type DialogType = '' | 'media' | 'narrow';

export interface DialogProps {
  type?: DialogType;
  testid: string;
  show?: boolean;
  title?: string;
  images?: any[];
  disableOutlineClick?: boolean;

  onClose?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

interface DefaultProp {
  children?: ReactNode;
}

interface DialogHeaderProps {
  title: string;
  onClose?: () => void;
}
interface DefaultActionsProps {
  showDoneButton?: boolean;
  alignRight?: boolean;
  onClose?: () => void;
}

export const DialogHeader = ({
  title,
  onClose,
}: DefaultProp & DialogHeaderProps) => (
  <div className="dialog__header" data-testid="dialog-header">
    <h4>{title}</h4>
    {onClose && (
      <span onClick={onClose} data-testid="dialog-close" className="close">
        <Icon name={'icon-remove'} size="125x" />
      </span>
    )}
  </div>
);

export const DialogContent = ({ children }: DefaultProp) => (
  <div className="dialog__content" data-testid="dialog-content">
    {children}
  </div>
);

export const DialogActions = ({
  showDoneButton = false,
  alignRight = false,
  onClose,
  children,
}: DefaultActionsProps & DefaultProp) => (
  <div className="dialog__actions" data-testid="dialog-actions">
    {alignRight ? (
      <div
        style={{
          display: 'flex',
          flex: '1',
          justifyContent: 'flex-end',
        }}
      >
        {children}
        {showDoneButton && (
          <span className="last" onClick={onClose}>
            <Button>Done</Button>
          </span>
        )}
      </div>
    ) : (
      <>
        {children}
        {showDoneButton && (
          <span className="last" onClick={onClose}>
            <Button>Done</Button>
          </span>
        )}
      </>
    )}
  </div>
);

function Dialog({
  testid,
  type,
  show = false,
  title,
  images,
  disableOutlineClick = false,
  children,
  onClose,
  onSubmit,
}: DialogProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick([wrapperRef], !disableOutlineClick ? onClose : undefined);

  const [isOpen, render] = useSmoothOpen(show);

  const dialogWrapperClasses = cn('dialog-wrapper', {
    [`is-open`]: isOpen,
    [`dialog-wrapper--${type}`]: !!type,
  });

  const dialogClasses = cn('dialog', {
    [`dialog--${type}`]: !!type,
  });

  return render ? (
    <div className={dialogWrapperClasses}>
      {type !== 'media' ? (
        <div className="dialog-container">
          <div
            className={dialogClasses}
            ref={wrapperRef}
            data-testid={testid + '-dialog'}
          >
            {title && <DialogHeader title={title} onClose={onClose} />}
            {onSubmit && (
              <form onSubmit={onSubmit} data-testid="form">
                {children}
              </form>
            )}
            {!onSubmit && <>{children}</>}
          </div>
        </div>
      ) : (
        <>
          <div className="dialog-wrapper__close">
            <button
              className="button button--square button--very-small button--subtle prev"
              onClick={onClose}
            >
              <Icon name="icon-remove" size="125x" />
            </button>
          </div>

          {images ? (
            <div ref={wrapperRef} className="carousel-wrapper">
              <ImageCarousel>{images}</ImageCarousel>
            </div>
          ) : (
            <div ref={wrapperRef}>{children}</div>
          )}
        </>
      )}
    </div>
  ) : (
    <></>
  );
}

export default Dialog;
