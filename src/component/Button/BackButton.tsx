import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <AiOutlineArrowLeft size={'1.5rem'} onClick = {() => navigate(-1)}/>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    margin-right: auto;
    width: 20px;
`