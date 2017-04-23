const connection = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');
// moduł readline będzie nam zarządzał wiadomościami, czytał linie, czyścił itp.
const rl = readline.createInterface({
    input: process.stdin, // process jest zmienną globalną w nodzie
    output: process.stdout
});
const util = require('util');
const EOL = require('os').EOL;


// ### Utility functions ###

function writeLine(line, ...args) {
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   process.stdout.write(util.format(line, ...args) + EOL);
   rl.prompt(true);
}

// ### Message handler ###

connection.on('message', function({ from, body }){    // { body } jest wypakowanie obiektu zgodnie z ES6
    writeLine('* %s: %s', from, body);
});

connection.on('login', function({ result }){
    if (result === true) {
        writeLine('* Succesfully logged in!')
    } else {
        writeLine('* Failed to log in!')
    }
});

connection.emit('login', {
    login: 'user-' + parseInt(Math.random() * 100),
    password: ''
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line){
    connection.emit('message', { body: line});
    rl.prompt();
});
