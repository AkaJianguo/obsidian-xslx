const fs = require('fs');
const path = require('path');
const data = require('./payload.json');

// 生成菜单
function generateMenu(data) {
  const result = [];
  if (!Array.isArray(data)) return result;
  
  data.forEach((item) => {
    // 跳过无效数据
    if (!item) return;
    
    const { name, identifier, menuType, id, pid, url } = item;
    const menuObj = {
      name,
      identifier,
      menuType,
      id,
      pid,
      url,
      children: [] // 初始化为空数组
    };
    
    // 只有当children存在且为数组时才递归处理
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      menuObj.children = generateMenu(item.children);
    }
    
    result.push(menuObj);
  });

  return result;
}

// 使用try-catch捕获可能的错误
try {
  const resultMenu = generateMenu(data);
  console.log("菜单生成成功，共有", resultMenu.length, "个顶级菜单项");
  
  // 生成json文件
  const jsonData = JSON.stringify(resultMenu, null, 2);
  fs.writeFileSync(path.resolve(__dirname, 'menu.json'), jsonData);
  console.log("menu.json文件生成成功");
} catch (error) {
  console.error("生成菜单时出错:", error);
}

