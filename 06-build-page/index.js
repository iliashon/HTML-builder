const fs = require("fs");
const path = require("path");
const { COPYFILE_EXCL } = fs.constants;

let objComponents = {};

fs.mkdir(path.join(__dirname, "project-dist", "assets"), {recursive: true}, () => {})

function copyFileInFolder (fold) {
    fs.readdir(path.join(__dirname, "assets", fold), {withFileTypes: true}, (err, files) => {
    
        files.forEach((file) => {

            fs.copyFile(path.join(__dirname, "assets", fold, `${file.name}`), path.join(__dirname, "project-dist", "assets", fold, `${file.name}`), COPYFILE_EXCL, () => {})
        })
    })
}

function copyDir () {
        fs.readdir(path.join(__dirname, "assets"), {withFileTypes: true}, (err, files) => {
    
            files.forEach((file) => {

                fs.mkdir(path.join(__dirname, "project-dist", "assets", `${file.name}`), {recursive: true}, () => {
                    copyFileInFolder(file.name)
                })
            })
        })
}
copyDir();

function readAndWriteFile (fileName, addFileCss) {
    const readingFile = new fs.ReadStream(path.join(__dirname, "styles" , `${fileName}`), {encoding: "utf8"});
 
    readingFile.on('readable', function(){
        const text = readingFile.read();
        if(text != null)addFileCss.write(text);
    });
}

fs.readdir(path.join(__dirname, "styles"), {withFileTypes: true}, (err, files) => {
    const addFileCss = fs.WriteStream(path.join(__dirname, "project-dist" , "style.css"));

    files.forEach((file) => {
        if (path.extname(file.name) === ".css" && file.isFile()) {
            readAndWriteFile(file.name, addFileCss);
        }
    })
})

fs.readFile(path.join(__dirname, "template.html"), {encoding: "utf8"}, (err, template) => {
    const addFileHtml = fs.WriteStream(path.join(__dirname, "project-dist" , "index.html"));
    fs.readdir(path.join(__dirname, "components"), {withFileTypes: true}, (err, components) => {
    let num = 0;
        components.forEach((component) => {
            if (component.isFile() && path.extname(component.name) === ".html") {
                fs.readFile(path.join(__dirname, "components", component.name), {encoding: "utf8"}, (err, componentContent) => {
                    const regx = new RegExp(`{{${path.basename(component.name, path.extname(component.name))}}}`, 'g');
                    template = template.replaceAll(regx, componentContent);
                    if (num === components.length - 1) {
                        addFileHtml.write(template);
                        console.log("Project assembled")
                    }
                    num++;
                })
            }
        })
    })
});
