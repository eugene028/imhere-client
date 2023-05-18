import { FlexBox } from "@ui/layout"
import { Tag } from "@ui/components";
import { useResponsive } from "@lib/hooks/useResponsive";
import { Spacing } from "@ui/components";
import { useState } from "react";
import { TagType } from "@ui/components";


export const EnrollMentTags = ({setState} : {setState : (cate : EnrollmentState) => void}) => {
    const { isPC } = useResponsive();
    const [toggleButton1, setToggle1] = useState<TagType>('selected');
    const [toggleButton2, setToggle2] = useState<TagType>('nonselected');
    const onClickNonSelected = () => {
        alert("해당 기능은 아직 개발중입니다.")
    }

    const onClickToggle = () => {
        if(toggleButton1 === 'selected'){
                setToggle1('nonselected');
                setToggle2('selected');
        }
        if(toggleButton1 === 'nonselected'){
            setToggle2('nonselected');
            setToggle1('selected')

        }
    }
    
    return (
        <>
            <FlexBox direction = {'row'} gap = {6} justify={'flex-start'} fullWidth ={true}>
                <Tag size={isPC ? 'PC' : 'mobile'} onClick ={() => {setState('APPROVAL'); onClickToggle();}} tagtype={`${toggleButton1}`} >수강중</Tag>
                <Tag size = {isPC ? 'PC' : 'mobile'} onClick ={() => {setState('AWAIT'); onClickToggle();}} tagtype ={`${toggleButton2}`}>신청대기</Tag>
            </FlexBox>
            <Spacing size = {17}/>
        </>
    )
    
}