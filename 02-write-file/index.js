const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const addFile = fs.WriteStream(path.join(__dirname, "text.txt"));

console.log('Hi, what you name?')

stdin.on('data', data => {
    if (data.toString().trim() === "exit") {
        process.exit();
    }
    addFile.write(data)
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', code => {
    console.log('Goodbye');
});