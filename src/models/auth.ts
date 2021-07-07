import { LoginRequest, SignupRequest, AcceptedEnum } from 'interfaces';

export class LoginActionPayload {
  prevPath = '/';
  request: LoginRequest = {
    email: '',
    password: '',
  };

  fromRequest = (request: LoginRequest, from?: { pathname: string }): this => {
    this.request = request;
    this.prevPath = from ? from.pathname : '/';
    return this;
  };
}

export class SignupActionPayload implements SignupRequest {
  email = '';
  password = '';
  username = '';
  firstName = '';
  lastName = '';
  accepted = AcceptedEnum.NUMBER_0;

  fromRequest = (request: SignupRequest, accepted: boolean): this => {
    Object.assign(this, request);
    if (accepted) {
      this.accepted = AcceptedEnum.NUMBER_1;
    } else {
      this.accepted = AcceptedEnum.NUMBER_0;
    }
    return this;
  };
}
