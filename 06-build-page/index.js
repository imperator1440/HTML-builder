const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');
const distDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDir, 'index.html');

fs.access(distDir, (err) => {
  if (err) {
    fs.mkdir(distDir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return
      }
    });
  }
});

fs.readFile(templateFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const regex = /{{\w+}}/g;
  const matches = data.match(regex);
  let newData = data;
  
  for (let i = 0; i < matches.length; i++) {
    const componentName = matches[i].slice(2, -2);;
    const componentFile = path.join(componentsDir, `${componentName}.html`);

    fs.readFile(componentFile, 'utf8', (err, componentData) => {
      if (err) {
        console.error(err);
        return;
      }

      newData = newData.replace(matches[i], componentData);
  
      
      fs.writeFile(outputFile, newData, 'utf-8', (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
});


/* -----STYLES----- */

const sourceDir = path.join(__dirname, 'styles');
const targetFile = path.join(__dirname, 'project-dist', 'style.css');

const targetFileWriteStream = fs.createWriteStream(targetFile);

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(__dirname, 'styles', file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      if (path.extname(filePath) === '.css') {
        const readFileStream = fs.createReadStream(filePath);
        readFileStream.pipe(targetFileWriteStream);
      }
    });
  });
});

/* -----Copy----- */

const newDirPath = path.join(__dirname, 'project-dist', 'assets');
const assetsDir = path.join(__dirname, 'assets');

async function copyFolder(src, dest) {
  try {
    // Создаем папку назначения, если она не существует
    await fs.promises.mkdir(dest, { recursive: true });
    
    // Получаем список файлов и папок в исходной папке
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    // Перебираем все элементы в папке
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        // Если текущий элемент является папкой, рекурсивно копируем ее содержимое
        await copyFolder(srcPath, destPath);
      } else {
        // Если текущий элемент является файлом, просто копируем его
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying folder: ${err}`);
  }
}

copyFolder(assetsDir, newDirPath);