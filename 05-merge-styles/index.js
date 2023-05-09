const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "project-dist"), {recursive: true}, () => {})

const addFileCss = fs.WriteStream(path.join(__dirname, "project-dist" , "bundle.css"));

function readAndWriteFile (fileName) {
    const readingFile = new fs.ReadStream(path.join(__dirname, "styles" , `${fileName}`), {encoding: "utf8"});
 
    readingFile.on('readable', function(){
        const text = readingFile.read();
        if(text != null)addFileCss.write(text);
    });
}

fs.readdir(path.join(__dirname, "styles"), {withFileTypes: true}, (err, files) => {

    files.forEach((file) => {
        if (path.extname(file.name) === ".css" && file.isFile()) {
            readAndWriteFile(file.name);
        }
    })
})
