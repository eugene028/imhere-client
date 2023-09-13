import { DomainErrorSetType } from '@lib/error/common/DomainErrorSetType';
import auth409 from './auth409';
import auth404 from './auth404'
import auth400 from './auth400'

const AuthErrorSet: DomainErrorSetType = {
  400: auth400,
  401: null,
  403: null,
  404: auth404,
  409: auth409,
  500: null,
};

export default AuthErrorSet;
