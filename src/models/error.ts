import { FieldError } from 'react-hook-form';

export type ErrorType =
  | 'required'
  | 'duplicated'
  | 'pattern'
  | 'minLength'
  | 'maxLength'
  | 'validate';

export enum ErrorTypeEnum {
  Required = 'required',
  Duplicated = 'duplicated',
  Pattern = 'pattern',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Validate = 'validate',
}

/**
 * Error message object used within forms.
 */
export type InputError = FieldError;
