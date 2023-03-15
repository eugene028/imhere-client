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
  return await axios.get(`http://localhost:8080/member/verification/${email}/${verificationCode}`)
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

  return await axios.post(`http://localhost:8080/member/new`, payload, { headers: headers })
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