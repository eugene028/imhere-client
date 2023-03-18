import axios from "axios";
import {getHeadersWithToken, getToken} from "./util/AuthFunctions";

const protocol = `http`
const host = `localhost:8080`

export const generateVerificationNumber = async email => {
  return await axios.post(`${protocol}://${host}/member/verification/${email}`)
    .then(response => {
      if (response.status === 200) {
        return true;
      }
      return false;
    }).catch(error => {
      console.error('generateVerificationNumber error : ' + error)
      return false;
    });
}

// TODO
export const verifyValidateNumber = async (email, verificationCode) => {
  return await axios.get(`${protocol}://${host}/member/verification/${email}/${verificationCode}`)
    .then(response => {
      console.log(response.data);
      if (response.data === true) {
        return true;
      }
      return false;
    }).catch(error => {
      console.error('generateVerificationNumber error : ' + error)
      return false;
    });
}

export const signUpNewMember = async (univId, name, password) => {
  const payload = {
    "univId": `${univId}`,
    "name": `${name}`,
    "password": `${password}`
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  return await axios.post(`${protocol}://${host}/member/new`, payload, { headers: headers })
    .then(response => {
      console.log('signUpNewMember : ' + response);
      if (response.status === 200) {
        return true;
      }
      return false;
    }).catch(error => {
      console.error('signUpNewMember error : ' + error)
      return false;
    });
}


export const requestSignIn = async (univId, password) => {
  const payload = {
    "univId": univId,
    "password": password
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  return await axios.post(`${protocol}://${host}/login`, payload, { headers: headers })
    .then(response => {
      console.log('token : ' + response.headers['authorization']);
      if (response && response.headers['authorization']) {
        console.log("login success");
        return response.headers['authorization'];
      }
      return null;
    }).catch(error => {
      alert('올바른 id와 비밀번호를 입력해주세요')
    });
}


// lecturer
// <Button type='button' className='own-lecture-button'> 내가 만든 강의 불러오기 </Button>
// <Button type='button' className='enrollment-approve-button'> 수강 학생 승인하기 </Button>
// <Button type='button' className='lecture-create-button'> 새 강의 만들기 </Button>

export const getStudentsLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/students/lectures`, { headers })
        .then(response => {
            if (response && response.data) {
                return response.data
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const getAllStudentsLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/students/all-lectures`, { headers })
        .then(response => {
            console.log(response.data)
            if (response && response.data) {
                return response.data
            }

            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const getLecturersLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/lectures`, { headers })
        .then(response => {
            console.log(response.data)
            if (response && response.data) {
                return response.data
            }

            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}