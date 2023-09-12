import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toast = () => {
  return (
    <CustomToast
      position="bottom-center" // default : top-right
      autoClose={3500} // default : 5000
      closeButton={false}
      newestOnTop
      limit={5}
      toastStyle={{
        borderRadius: '12px',
        backgroundColor: 'white',
        margin: '6px',
      }}
      bodyStyle={{ color: 'ccc', lineHeight: 1.5 }}
    />
  );
};

export default Toast;

// css custom : https://fkhadra.github.io/react-toastify/how-to-style

const CustomToast = styled(ToastContainer)``;
