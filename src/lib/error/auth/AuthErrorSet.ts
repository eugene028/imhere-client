import { DomainErrorSetType } from '@lib/error/common/DomainErrorSetType';
import auth409 from './auth409';

const AuthErrorSet: DomainErrorSetType = {
  400: null,
  401: null,
  403: null,
  404: null,
  409: auth409,
  500: null,
};

export default AuthErrorSet;
