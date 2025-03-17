// 读取 menu.json
const fs = require('fs');
const path = require('path');
const data = require('./payload.json');

// 确保目录存在
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

// 根据 data menuType 生成对应的文件  DIRECTORY 文件夹  MENU 为 .md文档
function generateFiles(items, currentPath) {
  if (!Array.isArray(items)) return;
  
  items.forEach(item => {
    if (!item) return;
    const { name, identifier, menuType, id, pid, url, children } = item;
    
    // 替换文件名中的非法字符
    const safeName = name.replace(/[\\/:*?"<>|]/g, '_');
    
    if (menuType === 'DIRECTORY') {
      // 创建文件夹
      const dirPath = path.join(currentPath, safeName);
      const created = ensureDirExists(dirPath);
      if (created) {
        console.log(`文件夹创建成功: ${dirPath}`);
      } else {
        console.log(`文件夹已存在: ${dirPath}`);
      }
      
      // 在目录中创建 README.md
      const readmePath = path.join(dirPath, `${name}.md`);
      if (!fs.existsSync(readmePath)) {
        fs.writeFileSync(readmePath, `# ${name}\n\n## 简介\n\n${identifier || '无标识符'}\n`);
        console.log(`创建目录说明文件: ${readmePath}`);
      }
      
      // 处理子项
      if (children && Array.isArray(children) && children.length > 0) {
        generateFiles(children, dirPath);
      }
    } else if (menuType === 'MENU' || menuType === 'VIRTUAL') {
      // 创建 Markdown 文件
      const filePath = path.join(currentPath, `${safeName}.md`);
      if (!fs.existsSync(filePath)) {
        const content = [
          `# ${name}`,
          '',
          `## 基本信息`,
          '',
        //   identifier 正则匹配 menu.po.PIYL67A
          `- 标识符: ${identifier ? identifier.match(/menu\.po\.(\w+)/)[1] : '无'}`,
          `- 标识符: ${identifier || '无'}`,
          `- 类型: ${menuType === 'MENU' ? '菜单' : '虚拟菜单'}`,
          `- 路径: ${url || '无'}`,
          ''
        ].join('\n');
        
        fs.writeFileSync(filePath, content);
        console.log(`文件创建成功: ${filePath}`);
      } else {
        console.log(`文件已存在: ${filePath}`);
      }
      
      // 如果菜单项有子项，则为其创建子目录
      if (children && Array.isArray(children) && children.length > 0) {
        const subDirPath = path.join(currentPath, safeName);
        ensureDirExists(subDirPath);
        generateFiles(children, subDirPath);
      }
    }
  });
}

try {
  // 确保根目录存在
  const rootDir = path.resolve(__dirname, 'root');
  ensureDirExists(rootDir);
  
  // 生成文件和文件夹
  generateFiles(data, rootDir);
  console.log("所有文件生成完成");
} catch (error) {
  console.error("生成文件时出错:", error);
}