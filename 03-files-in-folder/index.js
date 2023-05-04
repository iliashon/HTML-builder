const fs = require('fs');
const path = require("path");

fs.readdir(path.join(__dirname, "secret-folder"), {withFileTypes: true}, (err, files) => {

    files.forEach((file) => {
        if (file.isFile()) {
            const ext = path.extname(file.name);
            const name = path.basename(file.name, ext);

            fs.stat(path.join(__dirname, "secret-folder", file.name), (er, result) => {
                console.log(`${name} - ${ext.slice(1, ext.length)} - ${result.size / 1024}kb`);
            })
        }
    })
})