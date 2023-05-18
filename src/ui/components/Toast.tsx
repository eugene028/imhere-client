import { palette } from "@ui/theme/palette";
import { ToastContainer } from "react-toastify"
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

export const Toast = () =>{
    return (
        <CustomToast
            position = "top-center"
            newestOnTop
            limit = {5}
            hideProgressBar
            toastStyle={{
                borderRadius : '12px',
                backgroundColor: palette.white,
                margin: '6px',
            }}
            bodyStyle={{ color: palette.background_100, lineHeight: 1 }}
            />
    );
}

const CustomToast = styled(ToastContainer)``;