const xlsx = require('xlsx');

// 读取 xlsx 
const workbook = xlsx.readFile('./role.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// 生成 roles.json  
