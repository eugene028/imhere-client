import { StatusIcon } from "@ui/index"
import { FlexBox } from "@ui/layout"

export const LectureStatus = ({status} : {status: LectureState}) => {

    return (
        <FlexBox>
            <StatusIcon status = {status}></StatusIcon>
        </FlexBox>
    )
}