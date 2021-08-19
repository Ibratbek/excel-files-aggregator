const xlsx = require('xlsx');

// Bu kompyuterda mavjud file
const workBook1 = xlsx.readFile('./files/data.xlsx',{cellDates:true});
const workSheet1 = workBook1.Sheets["Список товаров"]; 
const data1 = xlsx.utils.sheet_to_json(workSheet1);

// Bu esa saytdan yuklab olingan file
const workBook2 = xlsx.readFile('./files/Файл для загрузки в магазин.xlsx',{cellDates:true});
const workSheet2 = workBook2.Sheets["Список товаров"]; 
const data2 = xlsx.utils.sheet_to_json(workSheet2);

// Ikkita filedagi ma'lumotlarni qo'shyapti
function createNewFile(firstFile, secondfile){
    for (let i = 1; i < firstFile.length - 1; i++) {
        for (let j = 1; j < secondfile.length - 1; j++) {
            firstFile["Остаток"] = firstFile["Остаток"]  + secondfile["Остаток"]; 
            firstFile["НДС"] = firstFile["НДС"]  + secondfile["НДС"]; 
        };
    };
    return firstFile;
}

var newData = createNewFile(data1,data2);

var newWorkBook = xlsx.utils.book_new();
var newWorkSheet = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWorkBook,newWorkSheet,"New Data");

// Ikkita filedagi ma'lumotni qo'shgandan keyin yangi nom bilan create qilyapti. Faqat rangsiz holatda.
xlsx.writeFile(newWorkBook,"new file.xlsx");


