const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'styles');
const targetFile = path.join(__dirname, 'project-dist', 'bundle.css');

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