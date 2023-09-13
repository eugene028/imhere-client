import { AxiosError } from "axios";
import ErrorSet from "@lib/error/common/ErrorSet";
import { DomainErrorSetTypeKey } from "@lib/error/common/DomainErrorSetType";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'info' | 'success' | 'warning' | 'error';
export interface CustomErrorResponse {
  errorCode: number;
  errorMessage: string;
}

const ErrorSort = [
  'AUTH'
]

const setToast = ({
  type = 'error',
  comment,
  ...props
}: {
  type?: ToastType;
  comment: string;
}) => {
  toast(comment, {
    type: type, 
    ...props });
};

const handleApiError = (axiosError: AxiosError) => {
  const status = axiosError.response?.status
  const errorResponse = axiosError.response?.data as CustomErrorResponse;
  const errorSort = filterErrorCode(errorResponse)
  const { errorCode } = errorResponse
  console.log(axiosError)
  if(errorSort === ""){
    setToast({ comment: "GDSC 운영진에게 문의하세요", type: 'error' });
    return
  }
  if (ErrorSort.includes(errorSort)) {
    const comments = ErrorSet[errorSort][status as DomainErrorSetTypeKey];
    let comment = '관리자에게 문의해주세요';
    if (comments) {
      comment = comments[errorCode];
    }
    switch (status) {
    // BadRequestException | ValidationError
      case 400:
      case 404:
      case 500:
        setToast({ comment: comment, type: 'error' });
        break;
    // authentication error
      case 401:
      case 403:
        break;
      default:
        setToast({ comment: comment, type: 'error' });
        break;
    }
  } else {
    setToast({ comment: '예상치 못한 서버 오류가 발생했어요. 오류가 반복되면 종료 후 다시 실행해주세요.', type: 'error' });
    }
}


export default handleApiError

const filterErrorCode = (errorResponse: CustomErrorResponse) => {
  const { errorCode } = errorResponse
  if(errorCode >= 1000 && errorCode < 2000){
    const errorSort = 'AUTH'
    return errorSort
  }
  return ''
}