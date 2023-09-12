import useToastify from "@lib/hooks/useToastify"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
const NoAuthLayout = () => {
  const { Toast } = useToastify();
  return (
      <Wrapper>
          <Outlet/>
          <Toast/>
      </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`;

export default NoAuthLayout