const { stdin, stdout } = process;
const fs = require('fs');

const addFile = fs.WriteStream('text.txt');

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