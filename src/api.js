import axios from "axios";

export const generateVerificationNumber = async email => {
  return await axios.post(`http://localhost:8080/member/verification/${email}`)
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
  return await axios.post(`http://localhost:8080/member/verification/${email}/${verificationCode}`)
    .then(response => {
      console.log(response.data);
      console.log(response);
      if (response.data === 'ture') {
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
    univId: univId,
    name: name,
    password: password
  }

  return await axios.post(`http://localhost:8080/member/new`, payload)
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        return true;
      }
      return false;
    }).catch(error => {
      console.error('generateVerificationNumber error : ' + error)
      return false;
    });
} 