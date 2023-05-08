const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = process.stdin;
const writeStream = fs.createWriteStream(filePath);

readStream.on('data', (data) =>{
  const input = data.toString().trim();

  if (input === 'exit') {
    readStream.end();
    writeStream.end();
    console.log('---Goodbye!---');
    process.exit();
  } else {
    writeStream.write(data);
  }
});

process.on('SIGINT', () => {
  readStream.end();
  writeStream.end();
  console.log('---Goodbye!---');
  process.exit();
});

readStream.on('error', (err) => {
  console.error(err);
});

writeStream.on('error', (err) => {
  console.error(err);
});

console.log('Enter text please: ');