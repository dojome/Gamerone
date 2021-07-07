import { Nullable } from 'interfaces';

export class RequestStatus {
  action = '';
  isFetching = false;
  error: Nullable<Error> = null;

  constructor(init?: Partial<RequestStatus>) {
    Object.assign(this, init);
  }

  setAction(action: string) {
    this.action = action;
    return this;
  }

  setFetching(fetching: boolean) {
    this.isFetching = fetching;
    return this;
  }

  setError(error: Nullable<Error>) {
    this.error = error;
    return this;
  }

  startFetch(action: string) {
    this.action = action;
    this.isFetching = true;
    this.error = null;
  }

  endFetch(error: Nullable<Error>) {
    this.isFetching = false;
    this.error = error;
  }

  get isError() {
    return this.error !== null;
  }

  get isSuccess() {
    return !this.isFetching && !this.isError;
  }
}
