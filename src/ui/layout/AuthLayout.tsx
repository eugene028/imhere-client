import { LogoutButton } from "@page/LogoutButton"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import useToastify from "@lib/hooks/useToastify"
const AuthLayout = () => {
  const { Toast } = useToastify();
  return (
    <>
      <LogoutButton/>
      <Wrapper>
          <Outlet/>
          <Toast/>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
`;

export default AuthLayout