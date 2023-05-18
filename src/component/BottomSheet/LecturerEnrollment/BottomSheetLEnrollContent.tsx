
import styled from "styled-components"
import { Text } from "@ui/components";
export const BottomSheetLEnrollContent = ({description} : {description: string | undefined}) => {


    return (
        <Wrapper>
            <Text typo ={'Text_20'}>{description}</Text>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    padding-left: 10px;
`