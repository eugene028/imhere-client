import { StatusIcon } from "@ui/index"
import { FlexBox } from "@ui/layout"

interface LectureStatusProps {
    status : LectureState;
}

export const LectureStatus = ({status} : LectureStatusProps) => {

    return (
        <FlexBox>
            <StatusIcon status = {status}></StatusIcon>
        </FlexBox>
    )
}