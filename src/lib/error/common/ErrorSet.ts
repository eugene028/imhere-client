import AuthErrorSet from "@lib/error/auth/AuthErrorSet";
import { DomainErrorSetType } from "@lib/error/common/DomainErrorSetType";
export type ErrorSetTypeKey = 
| 'AUTH'

export type ErrorSetType = {
  [key in ErrorSetTypeKey]: DomainErrorSetType;
};

const ErrorSet: ErrorSetType = {
  AUTH: AuthErrorSet
}


export default ErrorSet