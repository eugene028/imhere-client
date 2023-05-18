import { Padding } from "@ui/layout";
import { Spacing, Text} from "@ui/components";
import styled from "styled-components";
import { theme } from "@ui/theme";

export const BottomSheetAttendanceHeader = ({header} : {header: string | undefined}) => {
    return (
        <div>
            <Wrapper>
            <LoadBarWrapper>
                <LoadBar/>
            </LoadBarWrapper>
            <Spacing size ={20}/>
            <Padding size ={[0,10]}>
                <Text typo = {'Header_30'}>{header}</Text>
            </Padding>
        </Wrapper>
        </div>
    );
};

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


