import { StatusIcon } from "@ui/index"
import { FlexBox } from "@ui/layout"
import { useEffect, useState } from "react"

export const LectureStatus = () => {
    const [classStatus, setclassStatus] = useState('open');
    useEffect(() => {
        console.log("체크")
    }) 
    return (
        <FlexBox>
            <StatusIcon status = {'open'}></StatusIcon>
        </FlexBox>
    )
}