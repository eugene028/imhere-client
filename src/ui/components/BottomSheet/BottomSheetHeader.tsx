import { FC } from "react"
import styled from "styled-components";
import { theme } from "@ui/theme";
import { Text } from "../Text";
import { Spacing } from "../Spacing";
import { Padding } from "@ui/layout";

export const BottomSheetHeader =({header} : {header: string | undefined}) => {
    return (
        <Wrapper>
            <LoadBarWrapper>
                <LoadBar/>
            </LoadBarWrapper>
            <Spacing size ={20}/>
            <Padding size ={[0,10]}>
                <Text typo = {'Header_30'}>{header}</Text>
            </Padding>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-bottom: 10px;
`
const LoadBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
`

const LoadBar = styled.div`
    width : 100px;
    border-radius: 20px;
    border : 3px solid ${theme.palette.black_100};

`
