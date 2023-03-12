import axios from "axios";

export const generateVerificationNumber = async (email) => {
  console.log(`http://localhost:8080/member/verification/${email}`);
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