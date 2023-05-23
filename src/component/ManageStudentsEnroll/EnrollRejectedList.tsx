import { ListElement, SpecialButton } from "@ui/components";
import { FlexBox, Padding } from "@ui/layout";
import { ManageEnrollVariant } from "@components/LectureLists/ManageEnrollment";
import { useResponsive } from "@lib/hooks/useResponsive";

interface EnrollListProps {
    enroll: EnrollmentInfo;
    setEnrollType: React.Dispatch<React.SetStateAction<ManageEnrollVariant>>
    onClickToggleHandler: () => void;
    setCurrentStudent: React.Dispatch<React.SetStateAction<StudentInfo|null>>
}

export const EnrollRejectedList = ({enroll, setEnrollType, setCurrentStudent, onClickToggleHandler}:EnrollListProps) => {
    const { isPC } = useResponsive();
    return (
       <div style={{width: '100%'}}>
        {Object.values(enroll.studentInfos).filter(student => student.enrollmentState === 'REJECTION').map((student, index) => {
            return (
                <FlexBox key ={index} direction="row" gap = {20} justify="center" align="baseline" style={{marginBottom: '10px'}}>
                    <ListElement  count = {4} 
                    key = {index} 
                    variant={isPC ? 'PC' : 'mobile'} 
                    elements = {student}
                    style={{marginBottom: '20px'}}/>
                    <Padding size ={[0, 50]}>
                        <SpecialButton 
                            variant= "inform"
                            style={{height:'38px'}}
                            onClick ={() =>{
                                setEnrollType('approve');
                                setCurrentStudent(student);
                                onClickToggleHandler();
                            }}
                            >신청수락</SpecialButton>
                    </Padding>
                </FlexBox>
            )
            })} 
       </div>
    );
};

export default EnrollRejectedList;