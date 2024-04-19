const path = require('node:path');

const notes = 'file/notes.txt';

console.log(path.dirname(notes));
console.log(path.basename(notes));
console.log(path.extname(notes));


const fs = require('node:fs');

fs.readFile('file/notes.txt', 'utf8', (err, data) => {
    if (err){
        console.error(err);
        return;
    }
    console.log();
    console.log(data);
})

const content = 'Some content! supsuppppppppp';

fs.writeFile('file/test.txt', content, err => {
    if(err) {
        console.error(err);
    } else {
    }
})

const chalk = require('chalk');

console.log(chalk.blue('hi!'));


fs.readFile('file/test.txt', 'utf8', (err, data) => {
    if (err){
        console.error(err);
        return;
    }
    console.log();
    console.log(chalk.blue(data));
})