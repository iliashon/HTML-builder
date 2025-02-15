const fs = require("fs");
const path = require("path");
const { COPYFILE_EXCL } = fs.constants;

function copyDir () {
    fs.rm(path.join(__dirname, "files-copy"), {recursive: true, force: true}, (err) => {
        fs.mkdir(path.join(__dirname, "files-copy"), {recursive: true}, () => {
            fs.readdir(path.join(__dirname, "files"), {withFileTypes: true}, (err, files) => {
        
                files.forEach((file) => {
        
                    fs.copyFile(path.join(__dirname, "files", `${file.name}`), path.join(__dirname, "files-copy", `${file.name}`), COPYFILE_EXCL, () => {})
                })
                console.log("files copied");
            })
        })
    })
}
copyDir();