import XLSX from 'xlsx';
import moment from 'moment';
const { utils, writeFile } = XLSX;

export const convertJsonToXlsx = (data, lectureName) => {
    if (!data && data.length > 1) {
        alert('출석 인원이 없습니다.');
        return;
    }

    const today = moment(new Date(data[0].timestamp)).format("YYYY-MM-DD");

    const studentData = [];
    for (let i in data) {
        const date = new Date(data[i].timestamp);
        const timeString = date.getHours() + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : ('0' + date.getMinutes()));

        studentData.push({
            name: data[i].name,
            id: data[i].univId,
            distance: Math.round(Number(data[i].distance)).toFixed(0),
            timeString: timeString
        })
    }

    const tableHead = [["이름", "id", "거리 (m)", "출석 시간"]];
    const book = utils.book_new();
    const sheet = utils.json_to_sheet([]);
    utils.sheet_add_aoa(sheet, tableHead);

    utils.sheet_add_json(sheet, studentData, {origin: "A2", skipHeader: true});
    utils.book_append_sheet(book, sheet, `${today}'s Attdandance List`);
    writeFile(book, `${today} ${lectureName ? lectureName : ''} 출석 학생 목록.xlsx`);
}