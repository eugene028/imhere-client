import { LogoutButton } from "@page/LogoutButton"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
const AuthLayout = () => {
  return (
      <Wrapper>
          <LogoutButton/>
          <Outlet/>
      </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`;

export default AuthLayout