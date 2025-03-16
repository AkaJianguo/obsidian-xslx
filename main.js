// 读取xlsx 文件  转 json 文件
// const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
// // 读取xlsx文件
// const workbook = XLSX.readFile(path.resolve(__dirname, 'DATA.xlsx'));
// const sheetNames = workbook.SheetNames;
// const worksheet = workbook.Sheets[sheetNames[0]];
// const data = XLSX.utils.sheet_to_json(worksheet);
// const jsonData = JSON.stringify(data, null, 2);
// // 写入json文件
// fs.writeFileSync(path.resolve(__dirname, 'DATA1.json'), jsonData);
// 读取json文件
const data = require("./payload.json");

/* 
    'name': '物料代码申请维护',
    'identifier': 'menu.po.PCMA01',
    "父级标识": "menu.po.PCMA02",
    '菜单类型': '虚拟菜单' || '菜单'|| '目录',
    '菜单类型': 2 || 1 || 0 ,
    "menuType": 'VIRTUAL' || 'MENU'|| 'DIRECTORY', // 菜单类型
     "id": "1763807653479346178",
    "pid": "1763807209608736769",
    children: []



*/

// 生成菜单
const menu = [];
data.forEach((item) => {
  const obj = {
    name: item.name,
    identifier: item.identifier,
    menuType: item.menuType,
    id: item.id,
    pid: item.pid,
    children: [
    ]
  };
  menu.push(obj);
});
function generateMenu(data) {
  data.forEach((item) => {
    menu.forEach((menu) => {
        console.log("🚀 ~ menu.forEach ~ menu.id === item.pid:", menu.id === item.pid)
        console.log("🚀 ~ menu.forEach ~ item.pid:", item.pid)
        console.log("🚀 ~ menu.forEach ~ menu.id:", menu.id)
        
      if (menu.id === item.pid) {
        menu.children.push({
          name: item.name,
          identifier: item.identifier,
          menuType: item.menuType,
          id: item.id,
          pid: item.pid,
          children: []
        });
      }
    });
  });
}
generateMenu(data);
// 生成json文件
const jsonData = JSON.stringify(menu, null, 2);
fs.writeFileSync(path.resolve(__dirname, 'menu.json'), jsonData);

