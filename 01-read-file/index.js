const fs = require('fs');
const path = require('path');

const reading = new fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding: "utf8"});
 
reading.on('readable', function(){
    const text = reading.read();
    if(text != null)console.log(text);
});