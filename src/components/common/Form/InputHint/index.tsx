import React from 'react';
import { InputError, ErrorTypeEnum } from 'models/error';
import './style.scss';

interface InputHintProps {
  type: 'input' | 'select' | 'checkbox' | 'input-search' | 'datepicker';
  hint?: string;
  error?: InputError;
}

const InputHint: React.FC<InputHintProps> = ({
  type,
  hint,
  error,
  ...props
}: InputHintProps): JSX.Element => {
  let message = hint ? hint : '';

  if (error) {
    const defaultErrorMessage = (type: string) => {
      switch (type) {
        case ErrorTypeEnum.Required:
          message = 'Required';
          break;
        case ErrorTypeEnum.Pattern:
          message = 'Invalid format';
          break;
        case ErrorTypeEnum.MinLength:
          message = 'Too short';
          break;
        case ErrorTypeEnum.MaxLength:
          message = 'Too long';
          break;
        case ErrorTypeEnum.Duplicated:
          message = 'Duplicate';
          break;
        // case ErrorTypeEnum.Validate:
        //   message = (error.message as string) || '';
        //   break;
        default:
      }
    };

    error.message
      ? (message = error.message as string)
      : defaultErrorMessage(error && error.type);
  }

  return (
    <>
      {message && (
        <div className={type + '-hint'} {...props}>
          {message}
        </div>
      )}
    </>
  );
};

export default InputHint;
