const fs = require('fs');
const { readdir } = require("fs/promises");
const path = require("path");

const files = await readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
for (const file of files) console.log(file);