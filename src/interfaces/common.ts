import { LoginResponse } from './loginResponse';
import { ModelError } from './modelError';
import { ValidationError } from './validationError';

export interface StatusResponse {
  status: string;
}

// TODO: Do not put this into common interfaces
export interface FollowStatus {
  followCount?: number;
  followerCount?: number;
  isFollowing?: boolean;
  isBlocking?: boolean;
}

export type SignupResponse = LoginResponse;

export type Nullable<T> = T | null;

export type G1Error = Error | ModelError | ValidationError;
