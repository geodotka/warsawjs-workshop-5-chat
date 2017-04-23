const connection = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');

connection.on('message', function({ body }){    // { body } jest wypakowanie obiektu zgodnie z ES6
    console.log('* Server says: %s', body)
});


// moduł readline będzie nam zarządzał wiadomościami, czytał linie, czyścił itp.
const rl = readline.createInterface({
    input: process.stdin, // process jest zmienną globalną w nodzie
    output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line){
    connection.emit('message', { body: line});
    rl.prompt();
});
