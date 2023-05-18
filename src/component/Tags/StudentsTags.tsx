import { FlexBox } from "@ui/layout"
import { Tag } from "@ui/components";
import { useResponsive } from "@lib/hooks/useResponsive";
import { Spacing } from "@ui/components";

export const StudentsTags = () => {
    const { isPC } = useResponsive();
    const onClickNonSelected = () => {
        alert("해당 기능은 아직 개발중입니다.")
    }
    return (
        <>
            <FlexBox direction = {'row'} gap = {6} justify={'flex-start'} fullWidth ={true}>
                <Tag size={isPC ? 'PC' : 'mobile'} tagtype="selected" >전체 목록</Tag>
                <Tag size = {isPC ? 'PC' : 'mobile'} onClick ={onClickNonSelected} tagtype ="nonselected">수강중</Tag>
                <Tag size = {isPC ? 'PC' : 'mobile'} onClick ={onClickNonSelected} tagtype ="nonselected">신청대기</Tag>
            </FlexBox>
            <Spacing size = {17}/>
        </>
    )
    
}