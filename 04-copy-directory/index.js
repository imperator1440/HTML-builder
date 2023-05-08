const fs = require('fs');
const path = require('path');

const newDirPath = path.join(__dirname, 'files-copy');
const sourceDir = path.join(__dirname, 'files');

fs.access(newDirPath, (err) => {
  if (err) {
    fs.mkdir(newDirPath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return
      }
    });
  }
});

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(newDirPath, file);

    fs.copyFile(sourcePath, destPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

  fs.readdir(newDirPath, (err, newDirFiles) => {
    if (err) {
      console.error(err);
      return;
    }

    newDirFiles.forEach((file) => {
      const filePath = path.join(__dirname, 'files-copy', file)
      if (!files.includes(file)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  });
});
