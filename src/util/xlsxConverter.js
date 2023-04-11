import XLSX from 'xlsx';
import moment from 'moment';
const { utils, writeFile } = XLSX;

export const convertJsonToXlsx = (data, lectureName) => {
    if (!data && data.length > 1) {
        alert('출석 인원이 없습니다.');
        return;
    }

    const tableHead = [["id", "이름", "거리", "정확도", "출석 시간"]];
    const book = utils.book_new();
    const sheet = utils.json_to_sheet([]);
    utils.sheet_add_aoa(sheet, tableHead);

    utils.sheet_add_json(sheet, data, {origin: "A2", skipHeader: true});
    const today = moment(new Date()).format("YYYY-MM-DD");
    utils.book_append_sheet(book, sheet, `${today}'s Attdandance List`);
    writeFile(book, `${today} ${lectureName ? lectureName : ''} 출석 학생 목록.xlsx`);
}