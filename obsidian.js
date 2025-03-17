// 读取 menu.json
const fs = require('fs');
const path = require('path');
const data = require('./role.json'); // 这里改成了role.json

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
		const { name, identifier, menuType, id, pid, url, children, operations } = item;

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
			const readmePath = path.join(dirPath, `README.md`);
			if (!fs.existsSync(readmePath)) {
				fs.writeFileSync(
					readmePath,
					`# ${name}\n\n## 简介\n\n${identifier || '无标识符'}\n`
				);
				console.log(`创建目录说明文件: ${readmePath}`);
			}

			// 处理子项
			if (children && Array.isArray(children) && children.length > 0) {
				generateFiles(children, dirPath);
			}
		} else if (menuType === 'MENU' || menuType === 'VIRTUAL') {
			// 创建 Markdown 文件
			const filePath = path.join(currentPath, `${safeName}.md`);

			// 构建基本内容
			let content = [
				// `# ${name}`,
				'',
				`## 基本信息`,
				'',
				`- 标识符: ${identifier || '无'}`,
				`- 标识符缩写: ${identifier ? identifier.split('.').pop() : '无'}`,
				`- 类型: ${menuType === 'MENU' ? '菜单' : '虚拟菜单'}`,
				`- 路径: ${url || '无'}`,
				'',
				`## 页面功能描述：`,
				'',
				'',
				'',
				'',
				''
			];

			// 添加操作按钮信息
			if (operations && Array.isArray(operations) && operations.length > 0) {
				content.push('## 按钮列表:',  '', '');

				operations.forEach(op => {
					if (op && op.name) {
						// 添加按钮信息作为二级标题
						content.push(`### ${op.name}`, '', '', '', );
						// content.push(`- 标识符: ${op.identifier || '无'}`, '');

						// 如果有需要，可以在这里添加更多按钮相关信息
						// if (op.frontType !== undefined) content.push(`- 前端类型: ${op.frontType}`, '');
						// if (op.pageId) content.push(`- 页面ID: ${op.pageId}`, '');
						// if (op.enabled !== undefined) content.push(`- 启用状态: ${op.enabled}`, '');
						// if (op.menuId) content.push(`- 菜单ID: ${op.menuId}`, '');
						// content.push('');
					}
				});
			}

			// 写入文件
			if (!fs.existsSync(filePath)) {
				fs.writeFileSync(filePath, content.join('\n'));
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
	const rootDir = path.resolve(__dirname, 'root'); // 修改输出目录避免与之前冲突
	ensureDirExists(rootDir);

	// 生成文件和文件夹
	generateFiles(data, rootDir);
	console.log('所有文件生成完成');
} catch (error) {
	console.error('生成文件时出错:', error);
}
