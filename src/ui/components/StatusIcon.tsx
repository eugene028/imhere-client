import { KeyOfColor } from "..";
import styled from "styled-components";
import { Text } from "@ui/components";
import { FlexBox } from "@ui/layout";

export interface StatusIconProps extends React.ComponentProps<'div'> {
    status: StatusType;
}

type Props = Partial<StatusIconProps>;
type StatusType = LectureState;

type StatusColor = {
    [key in StatusType] : KeyOfColor;
}

const STATUS_COLOR : StatusColor = {
    'OPEN': 'main_blue',
    'CLOSED': 'black_100',
    'TERMINATED': 'main_red',
}

export const StatusIcon = ({
    status='OPEN',
}: Props) => {
    return (
        <FlexBox direction={'column'} gap={1}>
            <Text typo={'Text_15'} color={STATUS_COLOR[status]}>{status}</Text>
            <StatusCircle status = {status}></StatusCircle>
        </FlexBox>
    )
}

const StatusCircle = styled.div<{
    status: StatusType
}>`
    background-color: ${({theme, status}) => theme.palette[STATUS_COLOR[status]]};
    width:25px;
    height:25px;
    border-radius: 50px;
`;
