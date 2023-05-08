const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');


fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(__dirname, 'secret-folder', file);

    fs.stat(filePath, (err, stats) => {
      if(err) {
        console.log(err);
        return;
      }
      
      if (stats.isFile()) {
        const extension = path.extname(filePath);
        const size = stats.size;
    
        console.log(`${file.split('.')[0]} - ${extension} - ${size}`);
        console.log('------------------------');
      } else {
        console.log(`${file} is not a file\n------------------------`);
      }
    });
  });
});