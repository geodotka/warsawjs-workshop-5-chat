const connection = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');
// moduł readline będzie nam zarządzał wiadomościami, czytał linie, czyścił itp.
const rl = readline.createInterface({
    input: process.stdin, // process jest zmienną globalną w nodzie
    output: process.stdout
});
const util = require('util');
const EOL = require('os').EOL;


function writeLine(line, ...args) {
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   process.stdout.write(util.format(line, ...args) + EOL);
   rl.prompt(true);
}

connection.on('message', function({ body }){    // { body } jest wypakowanie obiektu zgodnie z ES6
    writeLine('* Server says: %s', body);
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line){
    connection.emit('message', { body: line});
    rl.prompt();
});
