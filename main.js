// 读取xlsx 文件  转 json 文件
// const XLSX = require('xlsx');
// const fs = require('fs');
// const path = require('path');
// const workbook = XLSX.readFile(path.resolve(__dirname, 'test.xlsx'));
// const sheetNames = workbook.SheetNames;
// const worksheet = workbook.Sheets[sheetNames[0]];
// const data = XLSX.utils.sheet_to_json(worksheet);
// const jsonData = JSON.stringify(data, null, 2);
// fs.writeFileSync(path.resolve(__dirname, 'data.json'), jsonData);
// 读取json文件 
const data = require('./data.json');
console.log(data);

/* 
    '菜单名称': '未更新至A物料代码清单',
    '菜单标识': 'menu.po.PCLT19A',
    '菜单类型': '虚拟菜单' || '菜单'|| '目录',
*/

// 生成菜单
const menu = [];



