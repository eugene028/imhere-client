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
    const [toggleButton3, setToggle3] = useState<TagType>('nonselected');


    const onClickToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.className.includes('Approval')){
            setToggle1('selected');
            setToggle2('nonselected');
            setToggle3('nonselected');
        }
        if (target.className.includes('Await')){
            setToggle1('nonselected');
            setToggle2('selected');
            setToggle3('nonselected');
        }
        if (target.className.includes('Rejection')){
            setToggle1('nonselected');
            setToggle2('nonselected');
            setToggle3('selected');
        }
    }
    
    return (
        <>
            <FlexBox direction = {'row'} gap = {6} justify={'flex-start'} fullWidth ={true}>
                <Tag className ={'Approval'} size={isPC ? 'PC' : 'mobile'} onClick ={(e) => {setState('APPROVAL'); onClickToggle(e);}} tagtype={`${toggleButton1}`} >수강중</Tag>
                <Tag className ={'Await'} size = {isPC ? 'PC' : 'mobile'} onClick ={(e) => {setState('AWAIT'); onClickToggle(e);}} tagtype ={`${toggleButton2}`}>신청대기</Tag>
                <Tag  className ={'Rejection'} size = {isPC ? 'PC' : 'mobile'} onClick ={(e) => {setState('REJECTION'); onClickToggle(e);}} tagtype ={`${toggleButton3}`}>신청거절</Tag>
            </FlexBox>
            <Spacing size = {17}/>
        </>
    )
    
}