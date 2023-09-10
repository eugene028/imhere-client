# Imhere
GDSC의 수강신청 및 출석체크 관리 서비스 Imhere입니다. 

## About this Project 📚
GDSC Hongik은 교내 최대 규모의 개발 커뮤니티로, 초심자들이 개발에 관심을 가지고 입문할 수 있도록 기초 학술 프로그램을 운영합니다.
오프라인으로 진행되는 정규 스터디를 운영하면서, 80명이 넘는 오프라인 출석자들을 관리하기 어려웠습니다.
이에 따라 출석체크를 빠르게 진행하고, 출석자 명단을 쉽게 관리할 수 있는 서비스 Imhere을 개발하게 되었습니다.

## Service Description 🎶
서비스 링크 🔗 : https://imhere.im/
### 학생 페이지 🧑‍🎓

![student](https://github.com/eugene028/imhere-client/assets/67894159/f8dc0713-df68-4b4c-98c3-e00487f4a94d)
학생이 회원가입 하게 된다면, 현재 운영중인 강의를 확인하고 자신이 듣는 강의에 수강신청을 할 수 있습니다. 

![student-1](https://github.com/eugene028/imhere-client/assets/67894159/1b2d5704-4e9c-4876-8792-108761393c13)
수강신청이 완료된 이후에 강사/멘토가 수강승인을 할 경우, '내 강의' 탭에서 수강중인 강의 목록을 확인할 수 있습니다.
'출석하기' 탭을 통하여 현재 강사/멘토가 출석 오픈을 한 강의에 출석체크를 할 수 있습니다.
이 때, 출석체크를 진행할 때 위치정보를 수집하여 현재 학생의 위치를 파악할 수 있으며, 강사가 제공해 준 출석코드를 정상적으로 입력하여야 출석체크가 완료됩니다.

### 강사/멘토 페이지 🧑‍🏫
강사/멘토 페이지는 `PC 환경`에서 사용하는 것을 권장합니다.

![admin-1](https://github.com/eugene028/imhere-client/assets/67894159/3040b1c6-60a8-450c-ac55-54437da547cf)
강사/멘토가 로그인하였을 때 등장하는 메인화면입니다. 새로운 강의를 만들 수 있고, 현재 진행하고 있는 강의를 관리할 수 있습니다.
![admin-2](https://github.com/eugene028/imhere-client/assets/67894159/e9950556-d72f-41c9-913a-ec3de4601156)
'내 강의'페이지를 통하여 출석 상태를 오픈할 수 있고, 닫을 수 있습니다. 출석을 오픈하면 출석 인증 코드를 안내하며, 10분간 출석체크를 진행할 수 있습니다. 
학생들은 강사가 받은 출석 인증 코드와 동일한 코드를 입력해야 출석을 정상적으로 진행할 수 있습니다. 
![admin-3](https://github.com/eugene028/imhere-client/assets/67894159/d276195f-69a7-4556-97ad-14c86b52961d)
`출석부 확인하기` 버튼을 통하여 출석 학생 명단을 관리할 수 있습니다. 강의실 (홍익대학교 4공학관) 기준으로 학생이 얼마나 멀리 떨어져 있는지를 확인하여
부정출석을 하는 학생을 파악할 수 있습니다. 또한, 출석 시간을 확인하여 지각한 학생의 명단을 확인할 수 있습니다.
생성된 출석 명단은 csv 파일로 다운받아 엑셀에서 확인 가능합니다.
![admin](https://github.com/eugene028/imhere-client/assets/67894159/27d9a728-a040-4846-abbf-a68d906274d9)
수강신청한 학생 명단을 확인하고, 수강 승인, 수강 거부, 수강 학생 제거를 할 수 있습니다.

## Tech stack 🛠️
- React
- Typescript
- Emotion
- Framer-motion

## 학습 기록 📝
- [모바일 환경에서의 UI 최적화를 해보자 📱](https://velog.io/@gene028/Imhere-개발일지-1-모바일-환경에서의-UI-최적화를-해보자)
- [S3-무중단-배포-cloudfront-버전관리 자동화](https://velog.io/@gene028/Imhere-개발일지-2-S3-무중단-배포-cloudfront-버전관리)
- (추후 추가 예정)

## Team Member 🏠
<table>
    <tr align="center">
        <td><B>이진호<B></td>
        <td><B>김유진<B></td>
        <td><B>김지민<B></td>
    </tr>
    <tr align="center">
        <td>프론트 세팅, v1 기본기능 구현</td>
        <td>디자인시스템 생성, v2 리팩토링, 기능개발</td>
        <td>Typescript 마이그레이션</td>
    </tr>
    <tr align="center">
        <td>
            <img src="https://github.com/binary-ho.png?size=100">
            <br>
            <a href="https://github.com/binary-ho"><I>binary-ho</I></a>
        </td>
        <td>
            <img src="https://github.com/eugene028.png?size=100" width="100">
            <br>
            <a href="https://github.com/eugene028"><I>eugene028</I></a>
        </td>
        <td>
            <img src="https://github.com/developomp.png?size=100" width="100">
            <br>
            <a href="https://github.com/developomp"><I>developomp</I></a>
        </td>
    </tr>
</table>
