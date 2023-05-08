const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf8');

readStream.pipe(process.stdout);

readStream.on('end', () => {
  console.log('End Of File');
});

readStream.on('error', (err) => {
  console.error(err);
});