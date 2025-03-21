// 读取 baoguo.xslx 文件,并根据 baoguo.xslx 文件的标签,生成对应的 xlsx 文件

const xlsx = require('xlsx');
const workbook = xlsx.readFile('./baoguo.xlsx');
const sheet_name_list = workbook.SheetNames;
console.log("🚀 ~ sheet_name_list:", sheet_name_list)
// 循环 sheet_name_list 创建对应的 xlsx 文件
sheet_name_list.forEach(sheet_name => {
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);
  const new_workbook = xlsx.utils.book_new();
  const new_worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(new_workbook, new_worksheet, sheet_name);
  xlsx.writeFile(new_workbook, `./${sheet_name}.xlsx`);
})

